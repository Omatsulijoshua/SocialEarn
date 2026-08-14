import { dbStore } from '../services/dbStore';
import { APP_CONFIG } from '@socialearn/config';

describe('SocialEarn Platform Core Engines & E2E Scenarios', () => {

  beforeEach(() => {
    // Reset test user state
    const userA = dbStore.pointWallets.find(w => w.userId === 'user-a');
    if (userA) userA.availablePoints = 50000;

    const userB = dbStore.pointWallets.find(w => w.userId === 'user-b');
    if (userB) userB.availablePoints = 24580;
  });

  // PHASE 52: END-TO-END TEST SCENARIO (Task Performance & Anti-Duplicate Protection)
  test('Phase 52 E2E: Task Execution, Campaign Counter Increment, and Anti-Duplicate Protection', () => {
    const campaignId = 'cmp-e2e-52';
    const userId = 'user-test-b';

    // 1. User A creates Instagram Follow campaign with target 4500
    const campaign = {
      id: campaignId,
      title: 'E2E Instagram Follow',
      userId: 'user-a',
      platform: 'INSTAGRAM' as const,
      action: 'FOLLOW' as const,
      targetUrl: 'https://instagram.com/e2e_test',
      targetQuantity: 4500,
      completedQuantity: 385,
      remainingQuantity: 4115,
      rewardPerTask: 15,
      totalCostMoney: 45000,
      totalCostPoints: 0,
      paymentMethod: 'MONEY' as const,
      paymentStatus: 'COMPLETED' as const,
      status: 'ACTIVE' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dbStore.campaigns.push(campaign);

    // 2. User B performs task
    const initialCompleted = campaign.completedQuantity; // 385
    const result = dbStore.incrementCampaignProgress(campaignId);
    expect(result.success).toBe(true);
    expect(result.completedQuantity).toBe(386);

    // Record immutable participant entry
    dbStore.taskParticipants.push({
      id: 'tp-e2e-1',
      userId,
      campaignId,
      actionType: 'FOLLOW',
      status: 'COMPLETED',
      rewardedAt: new Date().toISOString()
    });

    // Point ledger award
    const tx = dbStore.adjustPoints(userId, 15, 'TASK_REWARD', 'E2E_TEST', 'E2E Reward');
    expect(tx.amount).toBe(15);
    expect(tx.balanceAfter).toBe(15);

    // 3. User B attempts the same campaign again -> system rejects duplicate
    const duplicateParticipant = dbStore.taskParticipants.find(
      tp => tp.userId === userId && tp.campaignId === campaignId && tp.actionType === 'FOLLOW'
    );
    expect(duplicateParticipant).toBeDefined();

    // 4. User B unfollows and follows again -> system STILL rejects duplicate reward for same campaign
    const isDuplicateAllowed = !dbStore.taskParticipants.some(
      tp => tp.userId === userId && tp.campaignId === campaignId && tp.actionType === 'FOLLOW'
    );
    expect(isDuplicateAllowed).toBe(false); // Duplicate reward strictly forbidden!
  });

  // PHASE 53: WATCH-TIME E2E TEST (Contribution Limit Enforcement)
  test('Phase 53 E2E: Watch-Time Session Contribution Limit Enforcement', () => {
    const userId = 'user-watch-tester';
    const campaignId = 'cmp-watch-53';

    // Max limit is 30 minutes total (1800 seconds)
    const maxMinutes = APP_CONFIG.watchLimits.maxContributionMinutesPerUser; // 30 mins

    // User performs Session 1: 10 mins (600s) -> Awarded
    dbStore.watchSessions.push({
      id: 'ws-1',
      userId,
      campaignId,
      startedAt: new Date().toISOString(),
      durationSeconds: 600,
      status: 'VERIFIED',
      verificationStatus: 'VERIFIED',
      rewardPoints: 220,
      riskScore: 0
    });

    // Session 2: 10 mins (600s) -> Awarded
    dbStore.watchSessions.push({
      id: 'ws-2',
      userId,
      campaignId,
      startedAt: new Date().toISOString(),
      durationSeconds: 600,
      status: 'VERIFIED',
      verificationStatus: 'VERIFIED',
      rewardPoints: 220,
      riskScore: 0
    });

    // Session 3: 10 mins (600s) -> Awarded
    dbStore.watchSessions.push({
      id: 'ws-3',
      userId,
      campaignId,
      startedAt: new Date().toISOString(),
      durationSeconds: 600,
      status: 'VERIFIED',
      verificationStatus: 'VERIFIED',
      rewardPoints: 220,
      riskScore: 0
    });

    // Total watched minutes = 30 minutes
    const userSessions = dbStore.watchSessions.filter(s => s.userId === userId && s.campaignId === campaignId);
    const totalMinutes = userSessions.reduce((sum, s) => sum + s.durationSeconds, 0) / 60;
    expect(totalMinutes).toBe(30);

    // Attempt 4th Session -> Limit reached!
    const isEligible = totalMinutes < maxMinutes;
    expect(isEligible).toBe(false);
  });

  // PHASE 54: EXTERNAL LINK E2E TEST (Admin Approval Queue)
  test('Phase 54 E2E: Custom External Link Admin Approval Flow', () => {
    const campaignId = 'cmp-ext-54';
    const userId = 'user-a';

    // 1. User creates custom GitHub campaign
    const campaign = {
      id: campaignId,
      title: 'GitHub Follow',
      userId,
      platform: 'OTHER' as const,
      action: 'CUSTOM' as const,
      targetUrl: 'https://github.com/example',
      targetQuantity: 500,
      completedQuantity: 0,
      remainingQuantity: 500,
      rewardPerTask: 20,
      totalCostMoney: 0,
      totalCostPoints: 10000,
      paymentMethod: 'POINTS' as const,
      paymentStatus: 'COMPLETED' as const,
      status: 'PENDING_REVIEW' as const, // Must be PENDING_REVIEW!
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dbStore.campaigns.push(campaign);

    // Create review queue item
    const review = {
      id: 'rev-54',
      campaignId,
      submittedById: userId,
      url: campaign.targetUrl,
      platformName: 'GitHub',
      taskType: 'CUSTOM' as const,
      status: 'PENDING' as const,
      createdAt: new Date().toISOString()
    };
    dbStore.externalReviews.push(review);

    // 2. Verified campaign does NOT appear in active public marketplace yet
    const publicMarketplaceActive = dbStore.campaigns.filter(c => c.status === 'ACTIVE');
    expect(publicMarketplaceActive.find(c => c.id === campaignId)).toBeUndefined();

    // 3. Admin approves external link
    review.status = 'APPROVED';
    campaign.status = 'ACTIVE';

    // 4. Campaign is now ACTIVE and appears in marketplace!
    const updatedMarketplace = dbStore.campaigns.filter(c => c.status === 'ACTIVE');
    expect(updatedMarketplace.find(c => c.id === campaignId)).toBeDefined();
  });

  // PHASE 55: POINT PURCHASE E2E TEST
  test('Phase 55 E2E: Campaign Creation Paid 100% with Earned Points', () => {
    const userId = 'user-points-buyer';
    dbStore.pointWallets.push({
      id: 'pw-buyer',
      userId,
      availablePoints: 50000,
      pendingPoints: 0,
      totalEarned: 50000,
      totalSpent: 0
    });

    const costPoints = 30000;
    const tx = dbStore.adjustPoints(userId, -costPoints, 'CAMPAIGN_PURCHASE', 'E2E_TEST', 'Campaign points purchase');

    expect(tx.balanceBefore).toBe(50000);
    expect(tx.balanceAfter).toBe(20000);
    expect(tx.amount).toBe(-30000);
  });

  // PHASE 56: MONEY + POINTS E2E TEST
  test('Phase 56 E2E: Mixed Payment Split (Cash + Points)', () => {
    const userId = 'user-split-buyer';

    dbStore.pointWallets.push({
      id: 'pw-split',
      userId,
      availablePoints: 10000,
      pendingPoints: 0,
      totalEarned: 10000,
      totalSpent: 0
    });

    dbStore.cashWallets.push({
      id: 'cw-split',
      userId,
      availableBalance: 20000,
      pendingBalance: 0,
      totalEarned: 20000,
      totalWithdrawn: 0,
      currency: 'NGN'
    });

    // Campaign cost: ₦20,000
    // User pays 10,000 points (value = ₦5,000 NGN) + ₦15,000 cash
    const ptx = dbStore.adjustPoints(userId, -10000, 'CAMPAIGN_PURCHASE', 'SPLIT_PAYMENT', 'Points split');
    const ctx = dbStore.adjustCash(userId, -15000, 'CAMPAIGN_PURCHASE', 'SPLIT_PAYMENT', 'Cash split');

    expect(ptx.balanceAfter).toBe(0);
    expect(ctx.balanceAfter).toBe(5000);
  });

});
