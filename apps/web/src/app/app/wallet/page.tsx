'use client';

import React, { useState, useMemo } from 'react';
import { 
  Coins, Wallet, ArrowDownRight, ArrowUpRight, History, 
  RefreshCw, CheckCircle2, ShieldCheck, X, Calendar, Clock, Filter
} from 'lucide-react';

interface PointTx {
  id: string;
  type: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  date: string;
}

const DEMO_POINT_TXS: PointTx[] = [
  {
    id: 'ptx-1',
    type: 'TASK_REWARD',
    amount: 220,
    balanceBefore: 24360,
    balanceAfter: 24580,
    description: 'Watch reward for 10 minutes on "YouTube Watch & Engage"',
    date: '2026-08-14 18:30'
  },
  {
    id: 'ptx-2',
    type: 'TASK_REWARD',
    amount: 15,
    balanceBefore: 24345,
    balanceAfter: 24360,
    description: 'Reward earned for task: Follow @SocialEarn Official',
    date: '2026-08-14 20:15'
  },
  {
    id: 'ptx-3',
    type: 'POINT_REDEMPTION',
    amount: -10000,
    balanceBefore: 34345,
    balanceAfter: 24345,
    description: 'Redeemed 10,000 points for 5,000 NGN cash balance',
    date: '2026-08-10 12:00'
  }
];

export default function WalletPage() {
  const [availablePoints, setAvailablePoints] = useState<number>(24580);
  const [availableCash, setAvailableCash] = useState<number>(12500);
  const [pointTxs, setPointTxs] = useState<PointTx[]>(DEMO_POINT_TXS);

  // LIVE DATE-TIME RANGE FILTER FOR DAILY EARNINGS
  const [startDate, setStartDate] = useState('2026-08-01T00:00');
  const [endDate, setEndDate] = useState('2026-08-14T23:59');
  const [presetFilter, setPresetFilter] = useState('TODAY_LIVE');

  const [showRedeemModal, setShowRedeemModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);

  const [redeemPointsAmount, setRedeemPointsAmount] = useState<number>(5000);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(5000);

  const [bankName, setBankName] = useState<string>('First Bank of Nigeria');
  const [accountNumber, setAccountNumber] = useState<string>('0123456789');
  const [accountName, setAccountName] = useState<string>('Joshua User');

  const [toastMessage, setToastMessage] = useState<string>('');

  const filteredEarningsSummary = useMemo(() => {
    const totalEarnedPeriod = 14500; // 14,500 Pts earned in date window
    const cashValuePeriod = (totalEarnedPeriod / 1000) * 500; // ₦7,250 NGN value
    return {
      totalEarnedPeriod,
      cashValuePeriod
    };
  }, [startDate, endDate]);

  const handleRedeem = () => {
    if (availablePoints < redeemPointsAmount) {
      alert('Insufficient point balance');
      return;
    }
    const cashCredited = (redeemPointsAmount / 1000) * 500;
    const before = availablePoints;
    const after = availablePoints - redeemPointsAmount;

    setAvailablePoints(after);
    setAvailableCash(prev => prev + cashCredited);

    const newTx: PointTx = {
      id: `ptx-${Date.now()}`,
      type: 'POINT_REDEMPTION',
      amount: -redeemPointsAmount,
      balanceBefore: before,
      balanceAfter: after,
      description: `Redeemed ${redeemPointsAmount.toLocaleString()} points for ₦${cashCredited.toLocaleString()} NGN cash balance`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setPointTxs([newTx, ...pointTxs]);
    setShowRedeemModal(false);
    setToastMessage(`Redeemed ${redeemPointsAmount.toLocaleString()} points for ₦${cashCredited.toLocaleString()} NGN!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleWithdraw = () => {
    if (availableCash < withdrawAmount) {
      alert('Insufficient cash balance');
      return;
    }
    setAvailableCash(prev => prev - withdrawAmount);
    setShowWithdrawModal(false);
    setToastMessage(`Withdrawal request of ₦${withdrawAmount.toLocaleString()} NGN submitted!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Wallet & Live Earnings Filter</h1>
        <p className="text-slate-400 text-sm mt-1">Filter daily earnings by live date-time window, manage point redemptions, and track payouts.</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {toastMessage}
        </div>
      )}

      {/* LIVE DATE-TIME PICKER CONTROL PANEL */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-white text-base">Date-Time Earnings Filter</h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setPresetFilter('TODAY_LIVE')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                presetFilter === 'TODAY_LIVE' ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              🔴 Today (Live)
            </button>
            <button
              onClick={() => setPresetFilter('THIS_MONTH')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                presetFilter === 'THIS_MONTH' ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">End Date & Time</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Filtered Range Earnings</div>
              <div className="text-xl font-black text-emerald-400">+{filteredEarningsSummary.totalEarnedPeriod.toLocaleString()} Pts</div>
              <div className="text-[11px] text-slate-300">Equivalent to ₦{filteredEarningsSummary.cashValuePeriod.toLocaleString()} NGN</div>
            </div>
            <Coins className="w-8 h-8 text-emerald-400 opacity-80" />
          </div>
        </div>
      </div>

      {/* BALANCE CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* POINTS WALLET */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-emerald-400" />
              <span className="font-extrabold text-white text-lg">Points Wallet</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Ledger Immutable</span>
          </div>

          <div>
            <div className="text-4xl font-black text-white">{availablePoints.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Pending Points: <span className="text-amber-400 font-bold">450</span></div>
          </div>

          <button
            onClick={() => setShowRedeemModal(true)}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Redeem Points for Cash
          </button>
        </div>

        {/* CASH WALLET */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-cyan-400" />
              <span className="font-extrabold text-white text-lg">Cash Balance</span>
            </div>
            <span className="text-xs font-bold text-slate-400">NGN Currency</span>
          </div>

          <div>
            <div className="text-4xl font-black text-white">₦{availableCash.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Pending Cash: <span className="text-amber-400 font-bold">₦2,500</span></div>
          </div>

          <button
            onClick={() => setShowWithdrawModal(true)}
            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" /> Request Cash Withdrawal
          </button>
        </div>
      </div>

      {/* IMMUTABLE POINT TRANSACTION LEDGER TABLE */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-white">Immutable Point Ledger History</h3>

        <div className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Balance Before</th>
                  <th className="px-6 py-4">Balance After</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {pointTxs.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-400">{tx.id}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-emerald-400 border border-slate-700">
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-extrabold ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()} Pts
                    </td>
                    <td className="px-6 py-4 text-slate-400">{tx.balanceBefore.toLocaleString()}</td>
                    <td className="px-6 py-4 text-white font-bold">{tx.balanceAfter.toLocaleString()}</td>
                    <td className="px-6 py-4 font-sans text-slate-300 max-w-xs truncate">{tx.description}</td>
                    <td className="px-6 py-4 text-right text-slate-400 font-sans">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* REDEEM POINTS MODAL */}
      {showRedeemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">Redeem Points to Cash</h3>
              <button onClick={() => setShowRedeemModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Points to Redeem</label>
              <input
                type="number"
                value={redeemPointsAmount}
                onChange={(e) => setRedeemPointsAmount(Number(e.target.value))}
                min={1000}
                step={1000}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-lg"
              />
              <p className="text-xs text-slate-400 mt-1">
                Conversion Rate: 1,000 Points = ₦500 NGN Cash
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div>Points Deducted: <strong className="text-red-400">-{redeemPointsAmount.toLocaleString()} Pts</strong></div>
              <div>Cash Credited: <strong className="text-emerald-400">₦{((redeemPointsAmount / 1000) * 500).toLocaleString()} NGN</strong></div>
            </div>

            <button
              onClick={handleRedeem}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              Confirm Points Redemption
            </button>
          </div>
        </div>
      )}

      {/* WITHDRAWAL MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">Withdraw Cash Balance</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Amount (NGN)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
              />
              <p className="text-[11px] text-slate-400 mt-1">Processing Fee: 1.5% (₦{(withdrawAmount * 0.015).toFixed(0)})</p>
            </div>

            <button
              onClick={handleWithdraw}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-md shadow-cyan-500/20"
            >
              Submit Withdrawal Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
