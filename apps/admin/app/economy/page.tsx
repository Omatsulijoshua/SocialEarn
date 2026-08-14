'use client';

import React, { useState } from 'react';
import { Coins, CheckCircle2, History } from 'lucide-react';

interface PointLedgerItem {
  id: string;
  userEmail: string;
  type: string;
  amountText: string;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

const DEMO_POINT_LEDGER: PointLedgerItem[] = [
  { id: 'pt-001', userEmail: 'earner@example.com', type: 'TASK_REWARD', amountText: '+220 Pts', balanceBefore: 24360, balanceAfter: 24580, description: 'YouTube Watch & Engage task execution', createdAt: '10 minutes ago' },
  { id: 'pt-002', userEmail: 'creator@example.com', type: 'CAMPAIGN_PURCHASE', amountText: '-10,000 Pts', balanceBefore: 60000, balanceAfter: 50000, description: 'Star GitHub Repo campaign funding', createdAt: '2 hours ago' }
];

export default function AdminEconomyPage() {
  const [conversionRate, setConversionRate] = useState(0.5);
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveRate = () => {
    setToastMessage('Points conversion rate updated! AuditLog entry created.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Points Economy & Exchange Rates</h1>
        <p className="text-slate-400 text-sm mt-1">Monitor point distribution velocity and configure point-to-cash conversion rates (Phase I & 23, 24).</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* CONVERSION RATE CONTROLS */}
      <div className="admin-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Configurable Conversion Rate</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Points to Cash Conversion (NGN per Point)</label>
            <input
              type="number"
              step={0.1}
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
            <p className="text-[11px] text-slate-400 mt-1">1,000 Points = ₦{(1000 * conversionRate).toFixed(0)} NGN</p>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSaveRate}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/20"
            >
              Update Conversion Rate
            </button>
          </div>
        </div>
      </div>

      {/* IMMUTABLE POINT LEDGER TABLE */}
      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Transaction Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Balance Before</th>
                <th className="px-6 py-4">Balance After</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {DEMO_POINT_LEDGER.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-purple-400">{l.userEmail}</td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-200">{l.type}</td>
                  <td className="px-6 py-4 font-extrabold text-emerald-400">{l.amountText}</td>
                  <td className="px-6 py-4 text-slate-400">{l.balanceBefore.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-white">{l.balanceAfter.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-300">{l.description}</td>
                  <td className="px-6 py-4 text-right text-slate-400 font-mono">{l.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
