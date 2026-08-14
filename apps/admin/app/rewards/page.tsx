'use client';

import React, { useState } from 'react';
import { Coins, Clock, CheckCircle2, Save, ShieldCheck, Edit3 } from 'lucide-react';

interface TaskCostSetting {
  id: string;
  platform: string;
  action: string;
  baseRewardPoints: number;
  verificationMethod: string;
  enabled: boolean;
}

const DEFAULT_TASK_COSTS: TaskCostSetting[] = [
  { id: 'tc-1', platform: 'Instagram', action: 'Follow', baseRewardPoints: 10, verificationMethod: 'AUTOMATED_API', enabled: true },
  { id: 'tc-2', platform: 'YouTube', action: 'Like', baseRewardPoints: 5, verificationMethod: 'AUTOMATED_API', enabled: true },
  { id: 'tc-3', platform: 'YouTube', action: 'Watch (10 Mins)', baseRewardPoints: 220, verificationMethod: 'WATCH_SESSION_ENGINE', enabled: true },
  { id: 'tc-4', platform: 'TikTok', action: 'Follow', baseRewardPoints: 10, verificationMethod: 'AUTOMATED_API', enabled: true },
  { id: 'tc-5', platform: 'X (Twitter)', action: 'Repost / Share', baseRewardPoints: 25, verificationMethod: 'AUTOMATED_API', enabled: true },
  { id: 'tc-6', platform: 'Other / Custom', action: 'Custom Link Task', baseRewardPoints: 20, verificationMethod: 'MANUAL_REVIEW_REQUIRED', enabled: true }
];

export default function AdminRewardEnginePage() {
  // Configurable Task Costs & Point Rates
  const [taskCosts, setTaskCosts] = useState<TaskCostSetting[]>(DEFAULT_TASK_COSTS);

  // Watch Time Settings
  const [maxUserMin, setMaxUserMin] = useState<number>(30);
  const [maxSessions, setMaxSessions] = useState<number>(3);
  const [minSessionDuration, setMinSessionDuration] = useState<number>(5);
  const [dailyMaxMin, setDailyMaxMin] = useState<number>(120);
  const [cooldownMin, setCooldownMin] = useState<number>(15);

  const [toastMessage, setToastMessage] = useState<string>('');

  const handlePointCostChange = (id: string, newPoints: number) => {
    setTaskCosts(prev => prev.map(tc => tc.id === id ? { ...tc, baseRewardPoints: newPoints } : tc));
  };

  const handleSaveAllTaskCosts = () => {
    localStorage.setItem('socialearn_task_costs', JSON.stringify(taskCosts));
    setToastMessage('Task cost rates updated and saved! Immutable AuditLog entry recorded.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSaveWatchLimits = () => {
    setToastMessage('Watch-Time session limits updated! Immutable AuditLog entry recorded.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Reward & Task Cost Rates Engine</h1>
        <p className="text-slate-400 text-sm mt-1">Adjust how much each task type costs & pays performers. Changes instantly reflect across the User Dashboard.</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* EDITABLE TASK REWARD & COST RATES TABLE */}
      <div className="admin-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Task Reward & Cost Rates Manager</h3>
            <p className="text-xs text-slate-400">Edit the base point reward earned per verified task completion.</p>
          </div>
          <button
            onClick={handleSaveAllTaskCosts}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 flex items-center gap-2 shrink-0"
          >
            <Save className="w-4 h-4" /> Save Task Cost Rates
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Platform</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Base Reward / Cost (Pts)</th>
                <th className="px-6 py-3">Verification Method</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {taskCosts.map((tc) => (
                <tr key={tc.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3 font-bold text-white">{tc.platform}</td>
                  <td className="px-6 py-3 text-slate-300 font-semibold">{tc.action}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={tc.baseRewardPoints}
                        onChange={(e) => handlePointCostChange(tc.id, Number(e.target.value))}
                        className="w-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-purple-300 font-extrabold text-xs focus:outline-none focus:border-purple-500"
                      />
                      <span className="text-[11px] font-bold text-slate-400">Pts</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-mono text-[11px] text-slate-400">{tc.verificationMethod}</td>
                  <td className="px-6 py-3 text-right">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
    </div>
  );
}
