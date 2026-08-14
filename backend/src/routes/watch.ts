import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { dbStore, DBWatchSession } from '../services/dbStore';
import { APP_CONFIG } from '@socialearn/config';

export const watchRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-socialearn-2026-production';

function getUserIdFromReq(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.userId;
  } catch {
    return null;
  }
}

// Start Watch Session (Phase 21 & 22)
watchRouter.post('/start', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { campaignId } = req.body;
  const campaign = dbStore.campaigns.find(c => c.id === campaignId);

  if (!campaign || campaign.status !== 'ACTIVE') {
    return res.status(400).json({ error: 'Campaign is not active or available' });
  }

  // Calculate user's accumulated watch time for this campaign
  const userSessions = dbStore.watchSessions.filter(s => s.userId === userId && s.campaignId === campaignId);
  const totalWatchedSeconds = userSessions
    .filter(s => s.status === 'VERIFIED')
    .reduce((sum, s) => sum + s.durationSeconds, 0);

  const totalWatchedMinutes = totalWatchedSeconds / 60;
  const maxMinutes = APP_CONFIG.watchLimits.maxContributionMinutesPerUser; // 30 mins
  const maxSessions = APP_CONFIG.watchLimits.maxSessionsPerUser; // 3 sessions

  // MANDATORY CHECK (Phase 21 & 53): Check user limits
  if (totalWatchedMinutes >= maxMinutes) {
    return res.status(400).json({
      error: `You have reached your maximum contribution limit (${maxMinutes} minutes) for this watch campaign.`,
      limitReached: true,
      totalWatchedMinutes,
      maxMinutes
    });
  }

  if (userSessions.length >= maxSessions) {
    return res.status(400).json({
      error: `You have reached your maximum session count (${maxSessions} sessions) for this watch campaign.`,
      limitReached: true,
      sessionCount: userSessions.length,
      maxSessions
    });
  }

  const session: DBWatchSession = {
    id: `wsession-${Date.now()}`,
    userId,
    campaignId,
    startedAt: new Date().toISOString(),
    durationSeconds: 0,
    status: 'ACTIVE',
    verificationStatus: 'PENDING',
    rewardPoints: 0,
    riskScore: 0
  };

  dbStore.watchSessions.unshift(session);

  return res.status(201).json({
    message: 'Watch session started',
    session,
    userContribution: {
      totalWatchedMinutes,
      maxMinutes,
      sessionsCompleted: userSessions.length,
      maxSessions
    }
  });
});

// Complete Watch Session & Verification (Phase 22 & 23)
watchRouter.post('/complete', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { sessionId, durationSeconds } = req.body;
  const session = dbStore.watchSessions.find(s => s.id === sessionId && s.userId === userId);

  if (!session) return res.status(404).json({ error: 'Watch session not found' });
  if (session.status === 'VERIFIED') {
    return res.status(400).json({ error: 'Session already completed and verified' });
  }

  const campaign = dbStore.campaigns.find(c => c.id === session.campaignId);
  if (!campaign) return res.status(404).json({ error: 'Associated campaign not found' });

  const watchedMinutes = Math.min(60, Math.floor(durationSeconds / 60));
  // Standard rate: 22 points per minute
  const rewardPoints = watchedMinutes * 22;

  session.durationSeconds = durationSeconds;
  session.endedAt = new Date().toISOString();
  session.status = 'VERIFIED';
  session.verificationStatus = 'VERIFIED';
  session.rewardPoints = rewardPoints;

  // Record profile watch minutes
  const profile = dbStore.profiles.find(p => p.userId === userId);
  if (profile) {
    profile.watchMinutes += watchedMinutes;
    profile.tasksCompleted += 1;
  }

  // Award Points via Immutable Ledger Entry (Phase 24)
  const ptx = dbStore.adjustPoints(
    userId,
    rewardPoints,
    'TASK_REWARD',
    'WATCH_TIME_ENGINE',
    `Watch reward for ${watchedMinutes} minutes on "${campaign.title}"`,
    campaign.id
  );

  return res.json({
    message: 'Watch session verified and points awarded!',
    rewardPoints,
    newBalance: ptx.balanceAfter,
    session
  });
});
