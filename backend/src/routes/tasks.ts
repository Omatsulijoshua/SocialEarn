import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { dbStore, DBTaskAttempt, DBTaskParticipant } from '../services/dbStore';
import { TaskCardDTO } from '@socialearn/types';

export const tasksRouter = Router();

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

// Public Task Marketplace Endpoint
tasksRouter.get('/', (req: Request, res: Response) => {
  const currentUserId = getUserIdFromReq(req);
  const { platform, search } = req.query;

  // Filter active approved campaigns
  let activeCampaigns = dbStore.campaigns.filter(c => c.status === 'ACTIVE' && c.remainingQuantity > 0);

  if (platform && platform !== 'ALL') {
    activeCampaigns = activeCampaigns.filter(c => c.platform === (platform as string).toUpperCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    activeCampaigns = activeCampaigns.filter(c => c.title.toLowerCase().includes(q) || c.targetUrl.toLowerCase().includes(q));
  }

  // Filter out campaigns already completed by the user
  if (currentUserId) {
    const completedCampaignIds = new Set(
      dbStore.taskParticipants.filter(tp => tp.userId === currentUserId).map(tp => tp.campaignId)
    );
    activeCampaigns = activeCampaigns.filter(c => !completedCampaignIds.has(c.id));
  }

  const taskCards: TaskCardDTO[] = activeCampaigns.map(c => {
    const progressPercentage = Math.min(100, Number(((c.completedQuantity / c.targetQuantity) * 100).toFixed(2)));
    const difficulty: 'Easy' | 'Medium' | 'Hard' = c.action === 'WATCH' ? 'Medium' : c.action === 'COMMENT' ? 'Medium' : 'Easy';

    return {
      id: c.id,
      campaignId: c.id,
      platform: c.platform,
      action: c.action,
      title: c.title,
      targetUrl: c.targetUrl,
      rewardPoints: c.rewardPerTask,
      completedQuantity: c.completedQuantity,
      targetQuantity: c.targetQuantity,
      remainingQuantity: c.remainingQuantity,
      progressPercentage,
      estimatedDifficulty: difficulty,
      status: c.status
    };
  });

  return res.json({ tasks: taskCards, total: taskCards.length });
});

// Start Task Attempt
tasksRouter.post('/:id/start', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const campaignId = req.params.id;
  const campaign = dbStore.campaigns.find(c => c.id === campaignId);

  if (!campaign || campaign.status !== 'ACTIVE' || campaign.remainingQuantity <= 0) {
    return res.status(400).json({ error: 'Campaign is no longer available or active' });
  }

  // ANTI-DUPLICATE PARTICIPATION CHECK (Mandatory Rule Phase 19/20)
  const existingParticipant = dbStore.taskParticipants.find(
    tp => tp.userId === userId && tp.campaignId === campaignId && tp.actionType === campaign.action
  );
  if (existingParticipant) {
    return res.status(400).json({ error: 'You have already completed and received a reward for this campaign' });
  }

  // Check ongoing attempt
  let attempt = dbStore.taskAttempts.find(a => a.userId === userId && a.campaignId === campaignId && a.status === 'STARTED');
  if (!attempt) {
    attempt = {
      id: `attempt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      campaignId,
      status: 'STARTED',
      startedAt: new Date().toISOString(),
      rewardAmountPoints: campaign.rewardPerTask
    };
    dbStore.taskAttempts.unshift(attempt);
  }

  return res.json({ message: 'Task attempt started', attempt, campaign });
});

// Submit Task Verification Proof & Claim Reward
tasksRouter.post('/:id/submit', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const campaignId = req.params.id;
  const { proofUrl, proofText } = req.body;

  const campaign = dbStore.campaigns.find(c => c.id === campaignId);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  // STRICT ANTI-DUPLICATE CHECK (Phase 19 & 20)
  const existingParticipant = dbStore.taskParticipants.find(
    tp => tp.userId === userId && tp.campaignId === campaignId && tp.actionType === campaign.action
  );
  if (existingParticipant) {
    return res.status(400).json({ error: 'You have already received a reward for this campaign. Duplicate rewards are forbidden.' });
  }

  // CONCURRENCY SAFE TARGET INCREMENT (Phase 8 & 48)
  const result = dbStore.incrementCampaignProgress(campaignId);
  if (!result.success) {
    return res.status(400).json({ error: 'Campaign has reached its maximum target quantity.' });
  }

  // Record Immutable Task Participant Entry
  const participant: DBTaskParticipant = {
    id: `tp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    campaignId,
    actionType: campaign.action,
    status: 'COMPLETED',
    rewardedAt: new Date().toISOString()
  };
  dbStore.taskParticipants.push(participant);

  // Update Attempt Record
  let attempt = dbStore.taskAttempts.find(a => a.userId === userId && a.campaignId === campaignId && a.status === 'STARTED');
  if (!attempt) {
    attempt = {
      id: `attempt-${Date.now()}`,
      userId,
      campaignId,
      status: 'VERIFIED',
      proofUrl,
      proofText,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      rewardAmountPoints: campaign.rewardPerTask
    };
    dbStore.taskAttempts.unshift(attempt);
  } else {
    attempt.status = 'VERIFIED';
    attempt.proofUrl = proofUrl;
    attempt.proofText = proofText;
    attempt.submittedAt = new Date().toISOString();
    attempt.verifiedAt = new Date().toISOString();
  }

  // Update User Profile Stats
  const profile = dbStore.profiles.find(p => p.userId === userId);
  if (profile) {
    profile.tasksCompleted += 1;
    profile.xp += 50;
  }

  // DISPATCH IMMUTABLE POINT LEDGER ENTRY (Phase 3 & 24)
  const pointTx = dbStore.adjustPoints(
    userId,
    campaign.rewardPerTask,
    'TASK_REWARD',
    'TASK_EXECUTION',
    `Reward earned for task: ${campaign.title}`,
    campaign.id
  );

  return res.json({
    message: 'Task submitted and verified successfully!',
    rewardEarned: campaign.rewardPerTask,
    newBalance: pointTx.balanceAfter,
    completedQuantity: result.completedQuantity,
    campaignStatus: result.status
  });
});

// User Task Performance History (Phase 17)
tasksRouter.get('/history', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const history = dbStore.taskAttempts
    .filter(a => a.userId === userId)
    .map(a => {
      const campaign = dbStore.campaigns.find(c => c.id === a.campaignId);
      return {
        id: a.id,
        campaignTitle: campaign?.title || 'Social Task',
        platform: campaign?.platform || 'OTHER',
        action: campaign?.action || 'CUSTOM',
        startedAt: a.startedAt,
        submittedAt: a.submittedAt,
        verifiedAt: a.verifiedAt,
        status: a.status,
        rewardPoints: a.rewardAmountPoints,
        rejectionReason: a.rejectionReason
      };
    });

  return res.json({ history });
});

// My Active Tasks (Phase 18)
tasksRouter.get('/active', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const activeAttempts = dbStore.taskAttempts
    .filter(a => a.userId === userId && a.status === 'STARTED')
    .map(a => {
      const campaign = dbStore.campaigns.find(c => c.id === a.campaignId);
      return {
        attemptId: a.id,
        campaignId: a.campaignId,
        title: campaign?.title,
        platform: campaign?.platform,
        action: campaign?.action,
        targetUrl: campaign?.targetUrl,
        startedAt: a.startedAt,
        rewardPoints: a.rewardAmountPoints
      };
    });

  return res.json({ activeTasks: activeAttempts });
});
