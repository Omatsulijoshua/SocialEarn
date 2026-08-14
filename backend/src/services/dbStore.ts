import { 
  UserRole, AccountStatus, PlatformCategory, ActionCategory, CampaignStatus, 
  PaymentMethod, PaymentStatus, TaskAttemptStatus, WatchSessionStatus, 
  PointTransactionType, CashTransactionType, ExternalReviewStatus, WithdrawalStatus, 
  AuditAction 
} from '@socialearn/types';
import { APP_CONFIG } from '@socialearn/config';

export interface DBUser {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  fullName: string;
  country: string;
  role: UserRole;
  status: AccountStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DBUserProfile {
  id: string;
  userId: string;
  avatarUrl?: string;
  bio?: string;
  level: number;
  xp: number;
  tasksCompleted: number;
  campaignsCreated: number;
  watchMinutes: number;
}

export interface DBPointWallet {
  id: string;
  userId: string;
  availablePoints: number;
  pendingPoints: number;
  totalEarned: number;
  totalSpent: number;
}

export interface DBCashWallet {
  id: string;
  userId: string;
  availableBalance: number;
  pendingBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  currency: string;
}

export interface DBPointTransaction {
  id: string;
  userId: string;
  type: PointTransactionType;
  amount: number;
  source: string;
  referenceId?: string;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  status: string;
  createdAt: string;
}

export interface DBCashTransaction {
  id: string;
  userId: string;
  type: CashTransactionType;
  amount: number;
  source: string;
  referenceId?: string;
  balanceBefore: number;
  balanceAfter: number;
  currency: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface DBCampaign {
  id: string;
  title: string;
  description?: string;
  userId: string;
  platform: PlatformCategory;
  action: ActionCategory;
  targetUrl: string;
  targetQuantity: number;
  completedQuantity: number;
  remainingQuantity: number;
  rewardPerTask: number;
  totalCostMoney: number;
  totalCostPoints: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: CampaignStatus;
  instructions?: string;
  customPlatformName?: string;
  watchDurationMin?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DBTaskAttempt {
  id: string;
  userId: string;
  campaignId: string;
  status: TaskAttemptStatus;
  proofUrl?: string;
  proofText?: string;
  rejectionReason?: string;
  startedAt: string;
  submittedAt?: string;
  verifiedAt?: string;
  rewardAmountPoints: number;
}

export interface DBTaskParticipant {
  id: string;
  userId: string;
  campaignId: string;
  actionType: ActionCategory;
  status: string;
  rewardedAt: string;
}

export interface DBWatchSession {
  id: string;
  userId: string;
  campaignId: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  status: WatchSessionStatus;
  verificationStatus: string;
  rewardPoints: number;
  riskScore: number;
}

export interface DBExternalLinkReview {
  id: string;
  campaignId: string;
  submittedById: string;
  url: string;
  platformName: string;
  taskType: ActionCategory;
  status: ExternalReviewStatus;
  reviewerId?: string;
  reviewReason?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface DBAuditLog {
  id: string;
  adminUserId: string;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

export interface DBWithdrawal {
  id: string;
  userId: string;
  amountCash: number;
  feeCash: number;
  netAmountCash: number;
  currency: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: WithdrawalStatus;
  rejectionReason?: string;
  requestedAt: string;
  processedAt?: string;
}

export interface DBRiskScore {
  userId: string;
  score: number;
  status: 'NORMAL' | 'REVIEW_REQUIRED' | 'HIGH_RISK';
  lastEvaluatedAt: string;
  suspiciousDeviceCount: number;
  suspiciousIPCount: number;
}

class InMemoryDB {
  public users: DBUser[] = [];
  public profiles: DBUserProfile[] = [];
  public pointWallets: DBPointWallet[] = [];
  public cashWallets: DBCashWallet[] = [];
  public pointTransactions: DBPointTransaction[] = [];
  public cashTransactions: DBCashTransaction[] = [];
  public campaigns: DBCampaign[] = [];
  public taskAttempts: DBTaskAttempt[] = [];
  public taskParticipants: DBTaskParticipant[] = [];
  public watchSessions: DBWatchSession[] = [];
  public externalReviews: DBExternalLinkReview[] = [];
  public auditLogs: DBAuditLog[] = [];
  public withdrawals: DBWithdrawal[] = [];
  public riskScores: DBRiskScore[] = [];

  constructor() {
    this.seedDefaultData();
  }

  private seedDefaultData() {
    // Seed initial demo admin
    const adminUser: DBUser = {
      id: 'admin-1',
      email: 'admin@socialearn.app',
      username: 'superadmin',
      passwordHash: '$2a$10$X8u7bZg5jQ5eZ.Rk2K3L5.0qM5h7K7tG6j8l9m0n1p2q3r4s5t6u', // password: AdminPassword123!
      fullName: 'Platform Super Admin',
      country: 'Nigeria',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      twoFactorEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(adminUser);
    this.profiles.push({
      id: 'prof-admin-1',
      userId: 'admin-1',
      level: 10,
      xp: 50000,
      tasksCompleted: 100,
      campaignsCreated: 50,
      watchMinutes: 1200
    });
    this.pointWallets.push({
      id: 'pw-admin-1',
      userId: 'admin-1',
      availablePoints: 500000,
      pendingPoints: 0,
      totalEarned: 500000,
      totalSpent: 0
    });
    this.cashWallets.push({
      id: 'cw-admin-1',
      userId: 'admin-1',
      availableBalance: 250000,
      pendingBalance: 0,
      totalEarned: 250000,
      totalWithdrawn: 0,
      currency: 'NGN'
    });

    // Seed Demo User A (Campaign Creator)
    const userA: DBUser = {
      id: 'user-a',
      email: 'creator@example.com',
      username: 'campaign_king',
      passwordHash: '$2a$10$X8u7bZg5jQ5eZ.Rk2K3L5.0qM5h7K7tG6j8l9m0n1p2q3r4s5t6u',
      fullName: 'Joshua Creator',
      country: 'Nigeria',
      role: 'USER',
      status: 'ACTIVE',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(userA);
    this.profiles.push({
      id: 'prof-user-a',
      userId: 'user-a',
      level: 5,
      xp: 12000,
      tasksCompleted: 45,
      campaignsCreated: 12,
      watchMinutes: 450
    });
    this.pointWallets.push({
      id: 'pw-user-a',
      userId: 'user-a',
      availablePoints: 50000,
      pendingPoints: 1200,
      totalEarned: 85000,
      totalSpent: 35000
    });
    this.cashWallets.push({
      id: 'cw-user-a',
      userId: 'user-a',
      availableBalance: 12500,
      pendingBalance: 2500,
      totalEarned: 25000,
      totalWithdrawn: 10000,
      currency: 'NGN'
    });

    // Seed Demo User B (Task Performer)
    const userB: DBUser = {
      id: 'user-b',
      email: 'earner@example.com',
      username: 'task_hunter',
      passwordHash: '$2a$10$X8u7bZg5jQ5eZ.Rk2K3L5.0qM5h7K7tG6j8l9m0n1p2q3r4s5t6u',
      fullName: 'Sarah Earner',
      country: 'Nigeria',
      role: 'USER',
      status: 'ACTIVE',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(userB);
    this.profiles.push({
      id: 'prof-user-b',
      userId: 'user-b',
      level: 3,
      xp: 6500,
      tasksCompleted: 180,
      campaignsCreated: 1,
      watchMinutes: 320
    });
    this.pointWallets.push({
      id: 'pw-user-b',
      userId: 'user-b',
      availablePoints: 24580,
      pendingPoints: 450,
      totalEarned: 35000,
      totalSpent: 10000
    });
    this.cashWallets.push({
      id: 'cw-user-b',
      userId: 'user-b',
      availableBalance: 12500,
      pendingBalance: 0,
      totalEarned: 15000,
      totalWithdrawn: 2500,
      currency: 'NGN'
    });

    // Seed initial active campaigns
    const campaign1: DBCampaign = {
      id: 'cmp-001',
      title: 'Follow @SocialEarn Official',
      description: 'Follow our official Instagram handle for instant rewards!',
      userId: 'user-a',
      platform: 'INSTAGRAM',
      action: 'FOLLOW',
      targetUrl: 'https://instagram.com/socialearn_app',
      targetQuantity: 4500,
      completedQuantity: 385,
      remainingQuantity: 4115,
      rewardPerTask: 10,
      totalCostMoney: 45000,
      totalCostPoints: 0,
      paymentMethod: 'MONEY',
      paymentStatus: 'COMPLETED',
      status: 'ACTIVE',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const campaign2: DBCampaign = {
      id: 'cmp-002',
      title: 'YouTube Watch & Engage',
      description: 'Watch full video and subscribe to creator channel.',
      userId: 'user-a',
      platform: 'YOUTUBE',
      action: 'WATCH',
      targetUrl: 'https://youtube.com/watch?v=demo12345',
      targetQuantity: 1000,
      completedQuantity: 142,
      remainingQuantity: 858,
      rewardPerTask: 220,
      totalCostMoney: 0,
      totalCostPoints: 220000,
      paymentMethod: 'POINTS',
      paymentStatus: 'COMPLETED',
      status: 'ACTIVE',
      watchDurationMin: 10,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.campaigns.push(campaign1, campaign2);
  }

  // --- LEDGER OPERATIONS ---
  public adjustPoints(userId: string, amount: number, type: PointTransactionType, source: string, description: string, referenceId?: string): DBPointTransaction {
    let wallet = this.pointWallets.find(w => w.userId === userId);
    if (!wallet) {
      wallet = {
        id: `pw-${Date.now()}-${Math.random()}`,
        userId,
        availablePoints: 0,
        pendingPoints: 0,
        totalEarned: 0,
        totalSpent: 0
      };
      this.pointWallets.push(wallet);
    }

    const balanceBefore = wallet.availablePoints;
    if (amount < 0 && balanceBefore + amount < 0) {
      throw new Error('Insufficient point balance');
    }

    wallet.availablePoints += amount;
    if (amount > 0) {
      wallet.totalEarned += amount;
    } else {
      wallet.totalSpent += Math.abs(amount);
    }

    const transaction: DBPointTransaction = {
      id: `ptx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      type,
      amount,
      source,
      referenceId,
      balanceBefore,
      balanceAfter: wallet.availablePoints,
      description,
      status: 'COMPLETED',
      createdAt: new Date().toISOString()
    };

    this.pointTransactions.unshift(transaction);
    return transaction;
  }

  public adjustCash(userId: string, amount: number, type: CashTransactionType, source: string, description: string, referenceId?: string): DBCashTransaction {
    let wallet = this.cashWallets.find(w => w.userId === userId);
    if (!wallet) {
      wallet = {
        id: `cw-${Date.now()}-${Math.random()}`,
        userId,
        availableBalance: 0,
        pendingBalance: 0,
        totalEarned: 0,
        totalWithdrawn: 0,
        currency: 'NGN'
      };
      this.cashWallets.push(wallet);
    }

    const balanceBefore = wallet.availableBalance;
    if (amount < 0 && balanceBefore + amount < 0) {
      throw new Error('Insufficient cash balance');
    }

    wallet.availableBalance += amount;
    if (amount > 0) {
      wallet.totalEarned += amount;
    } else {
      wallet.totalWithdrawn += Math.abs(amount);
    }

    const transaction: DBCashTransaction = {
      id: `ctx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      type,
      amount,
      source,
      referenceId,
      balanceBefore,
      balanceAfter: wallet.availableBalance,
      currency: wallet.currency,
      description,
      status: 'COMPLETED',
      createdAt: new Date().toISOString()
    };

    this.cashTransactions.unshift(transaction);
    return transaction;
  }

  // --- ATOMIC CAMPAIGN TARGET UPDATE ---
  public incrementCampaignProgress(campaignId: string): { success: boolean; completedQuantity: number; status: CampaignStatus } {
    const campaign = this.campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.completedQuantity >= campaign.targetQuantity) {
      campaign.status = 'COMPLETED';
      return { success: false, completedQuantity: campaign.completedQuantity, status: 'COMPLETED' };
    }

    campaign.completedQuantity += 1;
    campaign.remainingQuantity = Math.max(0, campaign.targetQuantity - campaign.completedQuantity);

    if (campaign.completedQuantity >= campaign.targetQuantity) {
      campaign.status = 'COMPLETED';
    }

    campaign.updatedAt = new Date().toISOString();
    return { success: true, completedQuantity: campaign.completedQuantity, status: campaign.status };
  }
}

export const dbStore = new InMemoryDB();
