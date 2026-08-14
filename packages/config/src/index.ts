export const APP_CONFIG = {
  appName: 'SocialEarn',
  tagline: 'Engage. Earn. Grow.',
  description: 'The premier social task, engagement, and rewards marketplace.',
  defaultCurrency: 'NGN',
  
  // Point economy defaults
  defaultPointsToCashRate: 0.5, // 1000 points = 500 NGN
  defaultPointsToCreditRate: 0.5, // 1000 points = 500 NGN campaign credit
  minRedemptionPoints: 1000,
  maxRedemptionPoints: 100000,
  minWithdrawalCash: 1000,
  withdrawalFeePercent: 1.5,
  
  // Task rewards default rates (in Points)
  baseRewards: {
    INSTAGRAM: { FOLLOW: 15, LIKE: 10, COMMENT: 25, SHARE_REPOST: 20 },
    TIKTOK: { FOLLOW: 15, LIKE: 10, COMMENT: 25, SHARE_REPOST: 20 },
    YOUTUBE: { SUBSCRIBE: 25, LIKE: 15, COMMENT: 30, WATCH: 220 }, // 10 min watch = 220 pts
    FACEBOOK: { FOLLOW: 15, LIKE: 10, COMMENT: 25, SHARE_REPOST: 20 },
    X: { FOLLOW: 15, LIKE: 10, COMMENT: 25, SHARE_REPOST: 20 },
    LINKEDIN: { FOLLOW: 20, LIKE: 15, COMMENT: 30, SHARE_REPOST: 25 },
    TELEGRAM: { JOIN: 20 },
    DISCORD: { JOIN: 20 },
    PINTEREST: { FOLLOW: 15, LIKE: 10 },
    OTHER: { CUSTOM: 20 }
  },
  
  // Watch limits default configuration
  watchLimits: {
    maxContributionMinutesPerUser: 30,
    maxSessionsPerUser: 3,
    minSessionDurationMinutes: 5,
    maxDailyContributionMinutes: 60,
    cooldownMinutes: 15
  }
};
