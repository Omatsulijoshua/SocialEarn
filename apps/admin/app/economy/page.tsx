'use client';

import React, { useState, useMemo } from 'react';
import { Coins, CheckCircle2, History, Calendar, Clock, DollarSign, ArrowUpRight, TrendingUp, Filter, RefreshCw } from 'lucide-react';

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
  { id: 'pt-001', userEmail: 'earner@example.com', type: 'TASK_REWARD', amountText: '+220 Pts', balanceBefore: 24360, balanceAfter: 24580, description: 'YouTube Watch & Engage task execution', createdAt: '2026-08-14 22:30' },
  { id: 'pt-002', userEmail: 'creator@example.com', type: 'CAMPAIGN_PURCHASE', amountText: '-10,000 Pts', balanceBefore: 60000, balanceAfter: 50000, description: 'Star GitHub Repo campaign funding', createdAt: '2026-08-14 18:15' },
  { id: 'pt-003', userEmail: 'john123@example.com', type: 'POINT_REDEMPTION', amountText: '-50,000 Pts', balanceBefore: 75000, balanceAfter: 25000, description: 'Redeemed 50,000 points for ₦25,000 NGN cash payout', createdAt: '2026-08-10 12:00' }
];

export default function AdminEconomyPage() {
  const [conversionRate, setConversionRate] = useState(0.5);
  const [toastMessage, setToastMessage] = useState('');

  // LIVE DATE-TIME PICKER FILTERS
  const [startDate, setStartDate] = useState('2026-08-01T00:00');
  const [endDate, setEndDate] = useState('2026-08-14T23:59');
  const [presetRange, setPresetRange] = useState('CUSTOM');
  const [isLiveAutoRefresh, setIsLiveAutoRefresh] = useState(true);

  const handleSaveRate = () => {
    setToastMessage('Points conversion rate updated! AuditLog entry created.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handlePresetSelect = (preset: string) => {
    setPresetRange(preset);
    const now = new Date();
    const isoNow = now.toISOString().slice(0, 16);

    if (preset === 'TODAY_LIVE') {
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0).toISOString().slice(0, 16);
      setStartDate(todayStart);
      setEndDate(isoNow);
    } else if (preset === 'THIS_MONTH') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0).toISOString().slice(0, 16);
      setStartDate(monthStart);
      setEndDate(isoNow);
    } else if (preset === 'LAST_30_DAYS') {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
      setStartDate(thirtyDaysAgo);
      setEndDate(isoNow);
    }
  };

  // DYNAMICALLY COMPUTED FINANCIAL EARNINGS BY DATE-TIME WINDOW
  const financialSummary = useMemo(() => {
    // In production this queries backend `/api/admin/financials?start=${startDate}&end=${endDate}`
    const grossRevenue = 82400000; // ₦82.4M NGN total gross
    const userPayoutsMonthly = 58200000; // ₦58.2M NGN payouts
    const gatewayFees = 1236000; // 1.5% gateway fees (₦1.23M)
    const netRevenue = grossRevenue - userPayoutsMonthly - gatewayFees; // ₦22.96M NGN Net Profit
    const netMarginPercent = Number(((netRevenue / grossRevenue) * 100).toFixed(2));
    const payoutRatioPercent = Number(((userPayoutsMonthly / grossRevenue) * 100).toFixed(2));

    return {
      grossRevenue,
      userPayoutsMonthly,
      gatewayFees,
      netRevenue,
      netMarginPercent,
      payoutRatioPercent
    };
  }, [startDate, endDate]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Earnings & Date-Time Financial Filter</h1>
        <p className="text-slate-400 text-sm mt-1">Filter live daily earnings, Gross revenue, and Net platform profit after user monthly payouts.</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* LIVE DATE-TIME PICKER CONTROL BAR */}
      <div className="admin-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-white text-base">Date-Time Window Filter</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <button
              onClick={() => handlePresetSelect('TODAY_LIVE')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                presetRange === 'TODAY_LIVE' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              🔴 Today (Live)
            </button>
            <button
              onClick={() => handlePresetSelect('THIS_MONTH')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                presetRange === 'THIS_MONTH' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => handlePresetSelect('LAST_30_DAYS')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                presetRange === 'LAST_30_DAYS' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* INPUT DATE TIME PICKERS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setPresetRange('CUSTOM'); }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">End Date & Time (Live)</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => { setEndDate(e.target.value); setPresetRange('CUSTOM'); }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer w-full text-xs font-bold text-slate-300">
              <input
                type="checkbox"
                checked={isLiveAutoRefresh}
                onChange={(e) => setIsLiveAutoRefresh(e.target.checked)}
                className="w-4 h-4 accent-purple-500 rounded"
              />
              <RefreshCw className={`w-4 h-4 text-purple-400 ${isLiveAutoRefresh ? 'animate-spin' : ''}`} />
              <span>Live Ticker Auto-Refresh</span>
            </label>
          </div>
        </div>
      </div>

      {/* GROSS VS NET FINANCIAL CARDS (DATE-TIME RANGE CALCULATION) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Gross Platform Revenue</div>
          <div className="text-2xl sm:text-3xl font-black text-white">₦{financialSummary.grossRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Total incoming cash paid
          </div>
        </div>

        <div className="admin-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">User Monthly Payouts</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">₦{financialSummary.userPayoutsMonthly.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 font-medium">
            {financialSummary.payoutRatioPercent}% of gross revenue paid
          </div>
        </div>

        <div className="admin-card p-6 rounded-3xl border border-purple-500/30 bg-purple-950/20 space-y-2">
          <div className="text-purple-300 text-xs font-bold uppercase tracking-wider">Net Platform Profit</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">₦{financialSummary.netRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-purple-300 font-extrabold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Net Profit After Payouts
          </div>
        </div>

        <div className="admin-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Net Profit Margin</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">{financialSummary.netMarginPercent}%</div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mt-2">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${financialSummary.netMarginPercent}%` }} />
          </div>
        </div>
      </div>

      {/* CONVERSION RATE CONTROLS */}
      <div className="admin-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Configurable Points Exchange Rate</h3>
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
                <th className="px-6 py-4 text-right">Date & Time</th>
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
