import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { dbStore, DBCampaign, DBExternalLinkReview } from '../services/dbStore';
import { CreateCampaignSchema } from '@socialearn/validation';
import { APP_CONFIG } from '@socialearn/config';

export const campaignsRouter = Router();

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

// Create Campaign
campaignsRouter.post('/', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const parseResult = CreateCampaignSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.errors });
  }

  const {
    platform, action, title, targetUrl, targetQuantity, 
    paymentMethod, pointsToSpend = 0, customPlatformName, instructions, watchDurationMin
  } = parseResult.data;

  // Calculate reward rate per task
  let rewardPerTask = 15;
  if (platform === 'YOUTUBE' && action === 'WATCH') {
    rewardPerTask = (watchDurationMin || 10) * 22; // 22 points per minute
  } else if (action === 'COMMENT' || action === 'SUBSCRIBE') {
    rewardPerTask = 25;
  }

  const totalRewardPointsRequired = targetQuantity * rewardPerTask;
  // Conversion: 1000 points = 500 NGN
  const totalCostMoney = (totalRewardPointsRequired / 1000) * 500;
  const totalCostPoints = totalRewardPointsRequired;

  let finalMoneyPaid = 0;
  let finalPointsPaid = 0;

  // Verify and process payments (Phase 25 & 26)
  if (paymentMethod === 'POINTS') {
    const pointWallet = dbStore.pointWallets.find(w => w.userId === userId);
    if (!pointWallet || pointWallet.availablePoints < totalCostPoints) {
      return res.status(400).json({ 
        error: `Insufficient points. You need ${totalCostPoints.toLocaleString()} points, but have ${pointWallet?.availablePoints.toLocaleString() || 0}.` 
      });
    }

    dbStore.adjustPoints(
      userId,
      -totalCostPoints,
      'CAMPAIGN_PURCHASE',
      'CAMPAIGN_CREATION',
      `Campaign creation payment for "${title}"`,
      `cmp-pending`
    );
    finalPointsPaid = totalCostPoints;

  } else if (paymentMethod === 'MONEY') {
    const cashWallet = dbStore.cashWallets.find(w => w.userId === userId);
    if (!cashWallet || cashWallet.availableBalance < totalCostMoney) {
      // Simulate direct funding/cash payment fallback for demo
      dbStore.adjustCash(userId, totalCostMoney, 'DEPOSIT', 'PAYMENT_GATEWAY', `Deposit for campaign "${title}"`);
    }

    dbStore.adjustCash(
      userId,
      -totalCostMoney,
      'CAMPAIGN_PURCHASE',
      'CAMPAIGN_CREATION',
      `Campaign creation cash payment for "${title}"`
    );
    finalMoneyPaid = totalCostMoney;

  } else if (paymentMethod === 'MONEY_AND_POINTS') {
    const pointWallet = dbStore.pointWallets.find(w => w.userId === userId);
    const availablePts = pointWallet?.availablePoints || 0;
    const actualPointsToSpend = Math.min(availablePts, pointsToSpend || totalCostPoints / 2);
    
    // Remaining balance in cash
    const pointsValueInMoney = (actualPointsToSpend / 1000) * 500;
    const remainingMoneyNeeded = Math.max(0, totalCostMoney - pointsValueInMoney);

    if (actualPointsToSpend > 0) {
      dbStore.adjustPoints(userId, -actualPointsToSpend, 'CAMPAIGN_PURCHASE', 'CAMPAIGN_CREATION', `Points split payment for "${title}"`);
      finalPointsPaid = actualPointsToSpend;
    }

    if (remainingMoneyNeeded > 0) {
      const cashWallet = dbStore.cashWallets.find(w => w.userId === userId);
      if (!cashWallet || cashWallet.availableBalance < remainingMoneyNeeded) {
        dbStore.adjustCash(userId, remainingMoneyNeeded, 'DEPOSIT', 'PAYMENT_GATEWAY', `Split deposit for "${title}"`);
      }
      dbStore.adjustCash(userId, -remainingMoneyNeeded, 'CAMPAIGN_PURCHASE', 'CAMPAIGN_CREATION', `Cash split payment for "${title}"`);
      finalMoneyPaid = remainingMoneyNeeded;
    }
  }

  // Determine initial campaign status (Phase 11 & 12 mandatory rules)
  // Other / Custom Platform MUST enter PENDING_REVIEW
  const requiresAdminReview = platform === 'OTHER' || !!customPlatformName;
  const initialStatus = requiresAdminReview ? 'PENDING_REVIEW' : 'ACTIVE';

  const newCampaign: DBCampaign = {
    id: `cmp-${Date.now()}`,
    title,
    description: instructions || `Complete ${action} action on ${platform}`,
    userId,
    platform,
    action,
    targetUrl,
    targetQuantity,
    completedQuantity: 0,
    remainingQuantity: targetQuantity,
    rewardPerTask,
    totalCostMoney: finalMoneyPaid,
    totalCostPoints: finalPointsPaid,
    paymentMethod,
    paymentStatus: 'COMPLETED',
    status: initialStatus,
    instructions,
    customPlatformName,
    watchDurationMin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dbStore.campaigns.unshift(newCampaign);

  // Update profile created count
  const profile = dbStore.profiles.find(p => p.userId === userId);
  if (profile) profile.campaignsCreated += 1;

  // Create External Link Review entry if custom platform (Phase 12)
  if (requiresAdminReview) {
    const review: DBExternalLinkReview = {
      id: `rev-${Date.now()}`,
      campaignId: newCampaign.id,
      submittedById: userId,
      url: targetUrl,
      platformName: customPlatformName || 'Other Platform',
      taskType: action,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    dbStore.externalReviews.unshift(review);
  }

  return res.status(201).json({
    message: requiresAdminReview 
      ? 'Campaign submitted! Your external link is awaiting Admin review before publication.' 
      : 'Campaign created and activated successfully!',
    campaign: newCampaign,
    requiresAdminReview
  });
});

// List User Campaigns (Phase 28 & 29)
campaignsRouter.get('/history', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const userCampaigns = dbStore.campaigns.filter(c => c.userId === userId);
  const formatted = userCampaigns.map(c => {
    const progressPercentage = Math.min(100, Number(((c.completedQuantity / c.targetQuantity) * 100).toFixed(2)));
    return {
      ...c,
      progressPercentage
    };
  });

  return res.json({ campaigns: formatted });
});

// Campaign Detail & Live Progress Metrics (Phase 30 & 31)
campaignsRouter.get('/:id', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const campaign = dbStore.campaigns.find(c => c.id === req.params.id && c.userId === userId);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

  const participants = dbStore.taskParticipants.filter(tp => tp.campaignId === campaign.id);
  const totalVerified = participants.length;
  const attempts = dbStore.taskAttempts.filter(ta => ta.campaignId === campaign.id);
  const totalRejected = attempts.filter(ta => ta.status === 'REJECTED').length;
  const totalPending = attempts.filter(ta => ta.status === 'STARTED' || ta.status === 'SUBMITTED').length;

  return res.json({
    campaign,
    analytics: {
      totalParticipants: new Set(participants.map(p => p.userId)).size,
      verifiedCount: totalVerified,
      rejectedCount: totalRejected,
      pendingCount: totalPending,
      progressPercentage: Math.min(100, Number(((campaign.completedQuantity / campaign.targetQuantity) * 100).toFixed(2)))
    }
  });
});
