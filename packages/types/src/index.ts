export type UserRole = 
  | 'USER' 
  | 'ADMIN' 
  | 'SUPER_ADMIN' 
  | 'MODERATOR' 
  | 'FINANCE' 
  | 'SUPPORT' 
  | 'FRAUD_ANALYST';

export type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'RESTRICTED' | 'BANNED' | 'PENDING_VERIFICATION';

export type PlatformCategory = 
  | 'INSTAGRAM' 
  | 'TIKTOK' 
  | 'YOUTUBE' 
  | 'FACEBOOK' 
  | 'X' 
  | 'LINKEDIN' 
  | 'TELEGRAM' 
  | 'DISCORD' 
  | 'PINTEREST' 
  | 'OTHER';

export type ActionCategory = 
  | 'FOLLOW' 
  | 'LIKE' 
  | 'COMMENT' 
  | 'SUBSCRIBE' 
  | 'SHARE_REPOST' 
  | 'JOIN' 
  | 'VISIT' 
  | 'WATCH' 
  | 'CUSTOM';

export type CampaignStatus = 
  | 'DRAFT' 
  | 'PENDING_PAYMENT' 
  | 'PENDING_REVIEW' 
  | 'CHANGES_REQUIRED' 
  | 'APPROVED' 
  | 'ACTIVE' 
  | 'PAUSED' 
  | 'COMPLETED' 
  | 'REJECTED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export type PaymentMethod = 'MONEY' | 'POINTS' | 'MONEY_AND_POINTS';

export type TaskAttemptStatus = 'STARTED' | 'SUBMITTED' | 'VERIFYING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';

export type PointTransactionType = 
  | 'TASK_REWARD' 
  | 'CAMPAIGN_PURCHASE' 
  | 'REFERRAL_REWARD' 
  | 'POINT_REDEMPTION' 
  | 'ADMIN_ADJUSTMENT' 
  | 'BONUS' 
  | 'REFUND';

export type CashTransactionType = 
  | 'DEPOSIT' 
  | 'WITHDRAWAL' 
  | 'CAMPAIGN_PURCHASE' 
  | 'POINT_REDEMPTION_PAYOUT' 
  | 'ADMIN_ADJUSTMENT' 
  | 'REFUND';

export type ExternalReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUIRED';

export interface UserDTO {
  id: string;
  email: string;
  username: string;
  fullName: string;
  country: string;
  role: UserRole;
  status: AccountStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export interface WalletDTO {
  availablePoints: number;
  pendingPoints: number;
  availableCash: number;
  pendingCash: number;
  currency: string;
}

export interface CampaignDTO {
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
  progressPercentage: number;
  rewardPerTask: number;
  totalCostMoney: number;
  totalCostPoints: number;
  paymentMethod: PaymentMethod;
  status: CampaignStatus;
  instructions?: string;
  customPlatformName?: string;
  watchDurationMin?: number;
  createdAt: string;
}

export interface TaskCardDTO {
  id: string;
  campaignId: string;
  platform: PlatformCategory;
  action: ActionCategory;
  title: string;
  targetUrl: string;
  rewardPoints: number;
  completedQuantity: number;
  targetQuantity: number;
  remainingQuantity: number;
  progressPercentage: number;
  estimatedDifficulty: 'Easy' | 'Medium' | 'Hard';
  status: string;
}

export interface PointTransactionDTO {
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

export interface ExternalLinkReviewDTO {
  id: string;
  campaignId: string;
  submittedByUsername: string;
  platformName: string;
  url: string;
  action: ActionCategory;
  targetQuantity: number;
  rewardPerTask: number;
  status: ExternalReviewStatus;
  reviewReason?: string;
  createdAt: string;
}

export interface AdminDashboardOverviewDTO {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  pendingReviews: number;
  externalLinksPending: number;
  tasksCompletedTotal: number;
  pointsDistributedTotal: number;
  pointsRedeemedTotal: number;
  totalRevenue: number;
  withdrawalsPending: number;
  fraudAlertsCount: number;
  disputesCount: number;
}
