import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { dbStore, DBWithdrawal } from '../services/dbStore';
import { RedeemPointsSchema, WithdrawalRequestSchema } from '@socialearn/validation';
import { APP_CONFIG } from '@socialearn/config';

export const walletRouter = Router();

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

// Get User Wallet Overview & Ledgers (Phase 27)
walletRouter.get('/', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const pointWallet = dbStore.pointWallets.find(w => w.userId === userId);
  const cashWallet = dbStore.cashWallets.find(w => w.userId === userId);

  const pointTxList = dbStore.pointTransactions.filter(tx => tx.userId === userId);
  const cashTxList = dbStore.cashTransactions.filter(tx => tx.userId === userId);
  const userWithdrawals = dbStore.withdrawals.filter(w => w.userId === userId);

  return res.json({
    wallet: {
      availablePoints: pointWallet?.availablePoints || 0,
      pendingPoints: pointWallet?.pendingPoints || 0,
      totalEarnedPoints: pointWallet?.totalEarned || 0,
      totalSpentPoints: pointWallet?.totalSpent || 0,
      availableCash: cashWallet?.availableBalance || 0,
      pendingCash: cashWallet?.pendingBalance || 0,
      totalEarnedCash: cashWallet?.totalEarned || 0,
      totalWithdrawnCash: cashWallet?.totalWithdrawn || 0,
      currency: cashWallet?.currency || 'NGN'
    },
    pointTransactions: pointTxList,
    cashTransactions: cashTxList,
    withdrawals: userWithdrawals
  });
});

// Redeem Points for Cash Balance (Phase 26)
walletRouter.post('/redeem', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const parseResult = RedeemPointsSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.errors });
  }

  const { pointsAmount } = parseResult.data;

  const pointWallet = dbStore.pointWallets.find(w => w.userId === userId);
  if (!pointWallet || pointWallet.availablePoints < pointsAmount) {
    return res.status(400).json({ error: 'Insufficient point balance' });
  }

  // Conversion formula: 1,000 points = 500 NGN
  const cashEquivalent = (pointsAmount / 1000) * 500;

  // Deduct points via immutable ledger
  const ptx = dbStore.adjustPoints(
    userId,
    -pointsAmount,
    'POINT_REDEMPTION',
    'REDEMPTION_ENGINE',
    `Redeemed ${pointsAmount.toLocaleString()} points for ${cashEquivalent.toLocaleString()} NGN cash balance`
  );

  // Credit cash wallet via immutable ledger
  const ctx = dbStore.adjustCash(
    userId,
    cashEquivalent,
    'POINT_REDEMPTION_PAYOUT',
    'REDEMPTION_ENGINE',
    `Cash payout from redeeming ${pointsAmount.toLocaleString()} points`
  );

  return res.json({
    message: 'Points redeemed successfully!',
    redeemedPoints: pointsAmount,
    cashCredited: cashEquivalent,
    newPointsBalance: ptx.balanceAfter,
    newCashBalance: ctx.balanceAfter
  });
});

// Request Cash Withdrawal (Phase 37)
walletRouter.post('/withdraw', (req: Request, res: Response) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const parseResult = WithdrawalRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.errors });
  }

  const { amountCash, bankName, accountNumber, accountName } = parseResult.data;

  const cashWallet = dbStore.cashWallets.find(w => w.userId === userId);
  if (!cashWallet || cashWallet.availableBalance < amountCash) {
    return res.status(400).json({ error: 'Insufficient cash balance for withdrawal' });
  }

  const feeCash = (amountCash * APP_CONFIG.withdrawalFeePercent) / 100;
  const netAmountCash = amountCash - feeCash;

  // Deduct cash balance via immutable ledger
  dbStore.adjustCash(
    userId,
    -amountCash,
    'WITHDRAWAL',
    'WITHDRAWAL_REQUEST',
    `Withdrawal request of ${amountCash.toLocaleString()} NGN to ${bankName} (${accountNumber})`
  );

  const withdrawal: DBWithdrawal = {
    id: `wd-${Date.now()}`,
    userId,
    amountCash,
    feeCash,
    netAmountCash,
    currency: cashWallet.currency,
    bankName,
    accountNumber,
    accountName,
    status: 'REQUESTED',
    requestedAt: new Date().toISOString()
  };

  dbStore.withdrawals.unshift(withdrawal);

  return res.status(201).json({
    message: 'Withdrawal request submitted! It will be reviewed by Finance.',
    withdrawal
  });
});
