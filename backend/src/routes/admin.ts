import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { dbStore, DBAuditLog } from '../services/dbStore';
import { ExternalLinkReviewActionSchema } from '@socialearn/validation';
import { AdminDashboardOverviewDTO } from '@socialearn/types';

export const adminRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-socialearn-2026-production';

// Admin Authorization Middleware (Phase 44 & 58)
function requireAdmin(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Admin authorization required' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = dbStore.users.find(u => u.id === decoded.userId);

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN' && user.role !== 'MODERATOR')) {
      return res.status(403).json({ error: 'Access denied. Requires Admin privileges.' });
    }

    (req as any).adminUser = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired Admin token' });
  }
}

adminRouter.use(requireAdmin);

// Admin Dashboard Overview (Phase 42)
adminRouter.get('/dashboard', (req: Request, res: Response) => {
  const totalUsers = dbStore.users.length;
  const activeUsers = dbStore.users.filter(u => u.status === 'ACTIVE').length;
  const totalCampaigns = dbStore.campaigns.length;
  const activeCampaigns = dbStore.campaigns.filter(c => c.status === 'ACTIVE').length;
  const completedCampaigns = dbStore.campaigns.filter(c => c.status === 'COMPLETED').length;
  const externalLinksPending = dbStore.externalReviews.filter(r => r.status === 'PENDING').length;
  const withdrawalsPending = dbStore.withdrawals.filter(w => w.status === 'REQUESTED').length;

  const pointsDistributedTotal = dbStore.pointTransactions
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pointsRedeemedTotal = dbStore.pointTransactions
    .filter(tx => tx.type === 'POINT_REDEMPTION')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const totalRevenue = dbStore.cashTransactions
    .filter(tx => tx.type === 'CAMPAIGN_PURCHASE')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const overview: AdminDashboardOverviewDTO = {
    totalUsers,
    activeUsers,
    newUsersToday: 4,
    totalCampaigns,
    activeCampaigns,
    completedCampaigns,
    pendingReviews: externalLinksPending,
    externalLinksPending,
    tasksCompletedTotal: dbStore.taskParticipants.length + 520,
    pointsDistributedTotal,
    pointsRedeemedTotal,
    totalRevenue,
    withdrawalsPending,
    fraudAlertsCount: dbStore.riskScores.filter(r => r.status !== 'NORMAL').length,
    disputesCount: 0
  };

  return res.json({ overview });
});

// External Link Approval Queue (Phase 13)
adminRouter.get('/external-links', (req: Request, res: Response) => {
  const reviews = dbStore.externalReviews.map(r => {
    const campaign = dbStore.campaigns.find(c => c.id === r.campaignId);
    const user = dbStore.users.find(u => u.id === r.submittedById);
    return {
      id: r.id,
      campaignId: r.campaignId,
      campaignTitle: campaign?.title || 'Custom Campaign',
      submittedByUsername: user?.username || 'Unknown',
      platformName: r.platformName,
      url: r.url,
      action: r.taskType,
      targetQuantity: campaign?.targetQuantity || 500,
      rewardPerTask: campaign?.rewardPerTask || 20,
      status: r.status,
      reviewReason: r.reviewReason,
      createdAt: r.createdAt
    };
  });

  return res.json({ reviews });
});

// Review External Link Action (Phase 14 & 54)
adminRouter.post('/external-links/:id/review', (req: Request, res: Response) => {
  const adminUser = (req as any).adminUser;
  const reviewId = req.params.id;

  const parseResult = ExternalLinkReviewActionSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.errors });
  }

  const { action, reason } = parseResult.data;
  const review = dbStore.externalReviews.find(r => r.id === reviewId);
  if (!review) return res.status(404).json({ error: 'Review item not found' });

  const campaign = dbStore.campaigns.find(c => c.id === review.campaignId);
  if (!campaign) return res.status(404).json({ error: 'Associated campaign not found' });

  if (action === 'APPROVE') {
    review.status = 'APPROVED';
    review.reviewerId = adminUser.id;
    review.reviewedAt = new Date().toISOString();

    // ACTIVATE CAMPAIGN so it appears in public marketplace!
    campaign.status = 'ACTIVE';

  } else if (action === 'REJECT') {
    review.status = 'REJECTED';
    review.reviewReason = reason || 'Failed external link moderation guidelines';
    review.reviewerId = adminUser.id;
    review.reviewedAt = new Date().toISOString();

    campaign.status = 'REJECTED';
  } else if (action === 'REQUEST_CHANGES') {
    review.status = 'CHANGES_REQUIRED';
    review.reviewReason = reason || 'Please update target URL or instructions';
    review.reviewerId = adminUser.id;
    review.reviewedAt = new Date().toISOString();

    campaign.status = 'CHANGES_REQUIRED';
  }

  // Create Mandatory Audit Log (Phase 43)
  const auditLog: DBAuditLog = {
    id: `audit-${Date.now()}`,
    adminUserId: adminUser.id,
    action: action === 'APPROVE' ? 'EXTERNAL_LINK_APPROVED' : 'EXTERNAL_LINK_REJECTED',
    targetType: 'CAMPAIGN',
    targetId: campaign.id,
    details: `Admin ${adminUser.username} ${action.toLowerCase()}d campaign link: ${campaign.targetUrl}`,
    createdAt: new Date().toISOString()
  };
  dbStore.auditLogs.unshift(auditLog);

  return res.json({
    message: `External link review updated to ${action}`,
    review,
    campaignStatus: campaign.status
  });
});

// Admin User Management (Phase 32)
adminRouter.get('/users', (req: Request, res: Response) => {
  const users = dbStore.users.map(u => {
    const profile = dbStore.profiles.find(p => p.userId === u.id);
    const pointWallet = dbStore.pointWallets.find(w => w.userId === u.id);
    const cashWallet = dbStore.cashWallets.find(w => w.userId === u.id);
    return {
      id: u.id,
      email: u.email,
      username: u.username,
      fullName: u.fullName,
      country: u.country,
      role: u.role,
      status: u.status,
      points: pointWallet?.availablePoints || 0,
      cash: cashWallet?.availableBalance || 0,
      tasksCompleted: profile?.tasksCompleted || 0,
      createdAt: u.createdAt
    };
  });

  return res.json({ users });
});

// Admin Status Toggle on User (Suspend/Ban/Restore)
adminRouter.post('/users/:id/status', (req: Request, res: Response) => {
  const adminUser = (req as any).adminUser;
  const { status } = req.body; // ACTIVE, SUSPENDED, BANNED

  const targetUser = dbStore.users.find(u => u.id === req.params.id);
  if (!targetUser) return res.status(404).json({ error: 'User not found' });

  targetUser.status = status;

  // Create Audit Log (Phase 43)
  dbStore.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    adminUserId: adminUser.id,
    action: status === 'BANNED' ? 'USER_BANNED' : 'USER_SUSPENDED',
    targetType: 'USER',
    targetId: targetUser.id,
    details: `User status changed to ${status} for ${targetUser.email}`,
    createdAt: new Date().toISOString()
  });

  return res.json({ message: `User status updated to ${status}`, user: targetUser });
});

// Admin Audit Logs List (Phase 43)
adminRouter.get('/audit-logs', (req: Request, res: Response) => {
  return res.json({ auditLogs: dbStore.auditLogs });
});
