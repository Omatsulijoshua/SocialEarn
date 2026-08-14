import { z } from 'zod';

export const RegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  country: z.string().min(2, 'Country is required')
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const CreateCampaignSchema = z.object({
  platform: z.enum([
    'INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'FACEBOOK', 'X', 'LINKEDIN', 
    'TELEGRAM', 'DISCORD', 'PINTEREST', 'OTHER'
  ]),
  action: z.enum([
    'FOLLOW', 'LIKE', 'COMMENT', 'SUBSCRIBE', 'SHARE_REPOST', 
    'JOIN', 'VISIT', 'WATCH', 'CUSTOM'
  ]),
  title: z.string().min(5, 'Campaign title must be at least 5 characters'),
  targetUrl: z.string().url('Target URL must be a valid URL'),
  targetQuantity: z.number().int().min(10, 'Minimum target quantity is 10').max(100000, 'Maximum target quantity is 100,000'),
  paymentMethod: z.enum(['MONEY', 'POINTS', 'MONEY_AND_POINTS']),
  pointsToSpend: z.number().min(0).optional(),
  customPlatformName: z.string().optional(),
  instructions: z.string().optional(),
  watchDurationMin: z.number().int().min(1).max(60).optional()
});

export const ExternalLinkReviewActionSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT', 'REQUEST_CHANGES']),
  reason: z.string().optional()
});

export const RedeemPointsSchema = z.object({
  pointsAmount: z.number().min(1000, 'Minimum redemption is 1,000 points'),
  destination: z.enum(['CASH_WALLET', 'CAMPAIGN_CREDIT'])
});

export const WithdrawalRequestSchema = z.object({
  amountCash: z.number().min(1000, 'Minimum withdrawal is 1,000 NGN'),
  bankName: z.string().min(2, 'Bank name is required'),
  accountNumber: z.string().min(10, 'Account number must be at least 10 digits'),
  accountName: z.string().min(2, 'Account holder name is required')
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;
export type ExternalLinkReviewActionInput = z.infer<typeof ExternalLinkReviewActionSchema>;
export type RedeemPointsInput = z.infer<typeof RedeemPointsSchema>;
export type WithdrawalRequestInput = z.infer<typeof WithdrawalRequestSchema>;
