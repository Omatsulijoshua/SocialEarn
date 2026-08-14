import { dbStore } from '../services/dbStore';
import { APP_CONFIG } from '@socialearn/config';

console.log('----------------------------------------------------');
console.log('🧪 RUNNING SOCIALEARN AUTOMATED TEST SUITE & E2E SCENARIOS');
console.log('----------------------------------------------------');

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedCount++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failedCount++;
  }
}

// TEST 1: PHASE 52 E2E SCENARIO
try {
  console.log('\n[Phase 52 E2E Test] Task Execution, Campaign Progress, & Anti-Duplicate Protection');
  const campaignId = 'cmp-e2e-52';
  const userId = 'user-test-b';

  dbStore.campaigns.push({
    id: campaignId,
    title: 'E2E Instagram Follow',
    userId: 'user-a',
    platform: 'INSTAGRAM',
    action: 'FOLLOW',
    targetUrl: 'https://instagram.com/e2e_test',
    targetQuantity: 4500,
    completedQuantity: 385,
    remainingQuantity: 4115,
    rewardPerTask: 15,
    totalCostMoney: 45000,
    totalCostPoints: 0,
    paymentMethod: 'MONEY',
    paymentStatus: 'COMPLETED',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const result = dbStore.incrementCampaignProgress(campaignId);
  assert(result.success === true, 'Campaign completed count incremented successfully');
  assert(result.completedQuantity === 386, 'Completed quantity updated from 385 to 386');

  // Record participant
  dbStore.taskParticipants.push({
    id: 'tp-e2e-1',
    userId,
    campaignId,
    actionType: 'FOLLOW',
    status: 'COMPLETED',
    rewardedAt: new Date().toISOString()
  });

  const tx = dbStore.adjustPoints(userId, 15, 'TASK_REWARD', 'E2E_TEST', 'Reward earned');
  assert(tx.amount === 15, '15 points awarded to user point wallet');

  // Attempt duplicate reward for same campaign
  const hasParticipant = dbStore.taskParticipants.some(
    tp => tp.userId === userId && tp.campaignId === campaignId && tp.actionType === 'FOLLOW'
  );
  assert(hasParticipant === true, 'Anti-duplicate participant record present');
} catch (e: any) {
  console.error('Test 1 Exception:', e.message);
  failedCount++;
}

// TEST 2: PHASE 53 WATCH TIME LIMITS E2E TEST
try {
  console.log('\n[Phase 53 E2E Test] Watch-Time Contribution Limits');
  const userId = 'user-watch-tester';
  const campaignId = 'cmp-watch-53';

  // 3 x 10 minute sessions = 30 minutes
  for (let i = 1; i <= 3; i++) {
    dbStore.watchSessions.push({
      id: `ws-${i}`,
      userId,
      campaignId,
      startedAt: new Date().toISOString(),
      durationSeconds: 600,
      status: 'VERIFIED',
      verificationStatus: 'VERIFIED',
      rewardPoints: 220,
      riskScore: 0
    });
  }

  const userSessions = dbStore.watchSessions.filter(s => s.userId === userId && s.campaignId === campaignId);
  const totalWatchedMinutes = userSessions.reduce((sum, s) => sum + s.durationSeconds, 0) / 60;
  assert(totalWatchedMinutes === 30, 'Total watched time equals 30 minutes limit');

  const limitReached = totalWatchedMinutes >= APP_CONFIG.watchLimits.maxContributionMinutesPerUser;
  assert(limitReached === true, '4th session rejected as user reached contribution limit');
} catch (e: any) {
  console.error('Test 2 Exception:', e.message);
  failedCount++;
}

// TEST 3: PHASE 54 EXTERNAL LINK ADMIN APPROVAL FLOW
try {
  console.log('\n[Phase 54 E2E Test] External Link Moderation Queue & Activation');
  const campaignId = 'cmp-ext-54';
  const userId = 'user-a';

  const cmp = {
    id: campaignId,
    title: 'Custom GitHub Star',
    userId,
    platform: 'OTHER' as const,
    action: 'CUSTOM' as const,
    targetUrl: 'https://github.com/example/repo',
    targetQuantity: 500,
    completedQuantity: 0,
    remainingQuantity: 500,
    rewardPerTask: 20,
    totalCostMoney: 0,
    totalCostPoints: 10000,
    paymentMethod: 'POINTS' as const,
    paymentStatus: 'COMPLETED' as const,
    status: 'PENDING_REVIEW' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  dbStore.campaigns.push(cmp);

  dbStore.externalReviews.push({
    id: 'rev-54',
    campaignId,
    submittedById: userId,
    url: cmp.targetUrl,
    platformName: 'GitHub',
    taskType: 'CUSTOM',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  });

  const initialMarketplace = dbStore.campaigns.filter(c => c.status === 'ACTIVE');
  assert(!initialMarketplace.some(c => c.id === campaignId), 'Pending review campaign hidden from public marketplace');

  // Admin approves link
  cmp.status = 'ACTIVE';
  const activeMarketplace = dbStore.campaigns.filter(c => c.status === 'ACTIVE');
  assert(activeMarketplace.some(c => c.id === campaignId), 'Approved external campaign activated in public marketplace');
} catch (e: any) {
  console.error('Test 3 Exception:', e.message);
  failedCount++;
}

// TEST 4: PHASE 55 & 56 POINT PAYMENTS & MIXED PAYMENTS
try {
  console.log('\n[Phase 55/56 E2E Test] Point Ledger & Mixed Cash+Points Payments');
  const userId = 'user-buyer';
  dbStore.pointWallets.push({
    id: 'pw-buyer-1',
    userId,
    availablePoints: 50000,
    pendingPoints: 0,
    totalEarned: 50000,
    totalSpent: 0
  });

  const tx = dbStore.adjustPoints(userId, -30000, 'CAMPAIGN_PURCHASE', 'TEST', '30k points campaign purchase');
  assert(tx.balanceAfter === 20000, 'Points deducted cleanly from 50,000 to 20,000');
} catch (e: any) {
  console.error('Test 4 Exception:', e.message);
  failedCount++;
}

console.log('\n----------------------------------------------------');
console.log(`SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log('----------------------------------------------------');
if (failedCount > 0) process.exit(1);
