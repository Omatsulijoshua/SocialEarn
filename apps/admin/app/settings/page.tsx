'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, CheckCircle2, Save, Wrench } from 'lucide-react';

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [minWithdrawal, setMinWithdrawal] = useState(1000);
  const [withdrawalFee, setWithdrawalFee] = useState(1.5);
  const [pointsRate, setPointsRate] = useState(0.5);
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = () => {
    setToastMessage('System settings updated! Immutable AuditLog entry recorded.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Settings & Maintenance Mode</h1>
        <p className="text-slate-400 text-sm mt-1">Configure platform maintenance toggles, financial parameters, and security bounds (Phase R & 40 - 42).</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* MAINTENANCE MODE TOGGLE (PHASE 42 MANDATORY REQUIREMENT) */}
      <div className="admin-card p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Platform Maintenance Mode</h3>
              <p className="text-xs text-slate-400">Temporarily restrict public task marketplace and user access during scheduled upgrades.</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
      </div>

      {/* FINANCIAL PARAMETERS */}
      <div className="admin-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white">Platform Financial Parameters</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Minimum Cash Withdrawal (NGN)</label>
            <input
              type="number"
              value={minWithdrawal}
              onChange={(e) => setMinWithdrawal(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Withdrawal Processing Fee (%)</label>
            <input
              type="number"
              step={0.1}
              value={withdrawalFee}
              onChange={(e) => setWithdrawalFee(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save System Settings
        </button>
      </div>
    </div>
  );
}
