'use client';

import React, { useState } from 'react';
import { Coins, Clock, CheckCircle2, Save, ShieldCheck } from 'lucide-react';

export default function AdminRewardEnginePage() {
  // Watch Time Settings (Phase 22 Mandatory Requirements)
  const [maxUserMin, setMaxUserMin] = useState<number>(30);
  const [maxSessions, setMaxSessions] = useState<number>(3);
  const [minSessionDuration, setMinSessionDuration] = useState<number>(5);
  const [dailyMaxMin, setDailyMaxMin] = useState<number>(120);
  const [cooldownMin, setCooldownMin] = useState<number>(15);

  const [toastMessage, setToastMessage] = useState<string>('');

  const handleSaveWatchLimits = () => {
    setToastMessage('Watch-Time session limits updated! Immutable AuditLog entry recorded.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Reward Engine & Watch Limits</h1>
        <p className="text-slate-400 text-sm mt-1">Configure base platform rewards, multipliers, and watch-time eligibility rules (Phases H, 21 - 23).</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* WATCH-TIME LIMITS CONFIGURATION (PHASE 22 MANDATORY REQUIREMENTS) */}
      <div className="admin-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Watch-Time Eligibility Engine Settings</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Maximum Contribution Per User (Minutes)</label>
            <input
              type="number"
              value={maxUserMin}
              onChange={(e) => setMaxUserMin(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
            <p className="text-[11px] text-slate-400 mt-1">Example: 30 minutes cap per campaign</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Maximum Sessions Per User</label>
            <input
              type="number"
              value={maxSessions}
              onChange={(e) => setMaxSessions(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
            <p className="text-[11px] text-slate-400 mt-1">Example: 3 max watch sessions</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Minimum Session Duration (Minutes)</label>
            <input
              type="number"
              value={minSessionDuration}
              onChange={(e) => setMinSessionDuration(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Daily Maximum Contribution (Minutes)</label>
            <input
              type="number"
              value={dailyMaxMin}
              onChange={(e) => setDailyMaxMin(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Cooldown Period (Minutes)</label>
            <input
              type="number"
              value={cooldownMin}
              onChange={(e) => setCooldownMin(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleSaveWatchLimits}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Watch Engine Settings
        </button>
      </div>

      {/* BASE REWARD RATES TABLE (PHASE 21 MANDATORY EXAMPLES) */}
      <div className="admin-card p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Configurable Base Reward Rates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Platform</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Base Reward</th>
                <th className="px-6 py-3">Verification Method</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              <tr>
                <td className="px-6 py-3 font-bold text-white">Instagram</td>
                <td className="px-6 py-3 text-slate-300 font-semibold">Follow</td>
                <td className="px-6 py-3 font-bold text-emerald-400">10 Points</td>
                <td className="px-6 py-3 font-mono text-[11px]">AUTOMATED_API</td>
                <td className="px-6 py-3 text-right"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">ENABLED</span></td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold text-white">YouTube</td>
                <td className="px-6 py-3 text-slate-300 font-semibold">Like</td>
                <td className="px-6 py-3 font-bold text-emerald-400">5 Points</td>
                <td className="px-6 py-3 font-mono text-[11px]">AUTOMATED_API</td>
                <td className="px-6 py-3 text-right"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">ENABLED</span></td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold text-white">YouTube</td>
                <td className="px-6 py-3 text-slate-300 font-semibold">Watch (10 Mins)</td>
                <td className="px-6 py-3 font-bold text-emerald-400">220 Points</td>
                <td className="px-6 py-3 font-mono text-[11px]">WATCH_SESSION_ENGINE</td>
                <td className="px-6 py-3 text-right"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">ENABLED</span></td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-bold text-white">Other / Custom</td>
                <td className="px-6 py-3 text-slate-300 font-semibold">Custom Task</td>
                <td className="px-6 py-3 font-bold text-emerald-400">20 Points</td>
                <td className="px-6 py-3 font-mono text-[11px]">MANUAL_REVIEW_REQUIRED</td>
                <td className="px-6 py-3 text-right"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">MODERATED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
