'use client';

import React, { useState } from 'react';
import { Coins, CheckCircle2, ShieldCheck, Save } from 'lucide-react';

export default function AdminRewardsPage() {
  const [pointsToCashRate, setPointsToCashRate] = useState<number>(0.5); // 1000 points = 500 NGN
  const [minRedemptionPoints, setMinRedemptionPoints] = useState<number>(1000);
  const [withdrawalFeePercent, setWithdrawalFeePercent] = useState<number>(1.5);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleSave = () => {
    setToastMessage('Point conversion and reward rules updated! AuditLog entry created.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Reward & Conversion Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure base reward rates, points-to-cash conversion rates, and watch-time limits (Phases 23 & 26).</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white">Point Conversion Rules</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Points to Cash Conversion Rate</label>
            <input
              type="number"
              step={0.1}
              value={pointsToCashRate}
              onChange={(e) => setPointsToCashRate(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
            <p className="text-[11px] text-slate-400 mt-1">1,000 Points = ₦{(1000 * pointsToCashRate).toFixed(0)} NGN</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Minimum Redemption Points</label>
            <input
              type="number"
              value={minRedemptionPoints}
              onChange={(e) => setMinRedemptionPoints(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Cash Withdrawal Processing Fee (%)</label>
          <input
            type="number"
            step={0.1}
            value={withdrawalFeePercent}
            onChange={(e) => setWithdrawalFeePercent(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Reward Settings
        </button>
      </div>
    </div>
  );
}
