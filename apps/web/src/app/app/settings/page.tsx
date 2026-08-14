'use client';

import React, { useState } from 'react';
import { Bell, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [inAppNotifs, setInAppNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = () => {
    setToastMessage('Account settings updated successfully!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Account Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure notification preferences, security, and authentication.</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white">Notification Preferences</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer">
            <span>Email Alerts for Verified Tasks & Payouts</span>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer">
            <span>In-App Realtime Notification Stream</span>
            <input
              type="checkbox"
              checked={inAppNotifs}
              onChange={(e) => setInAppNotifs(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded"
            />
          </label>
        </div>

        <h3 className="text-lg font-bold text-white pt-4 border-t border-slate-800">Security</h3>
        <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer">
          <div>
            <div className="font-bold text-white">Two-Factor Authentication (2FA)</div>
            <div className="text-xs text-slate-400">Require authenticator app code for sensitive logins & withdrawals.</div>
          </div>
          <input
            type="checkbox"
            checked={twoFactor}
            onChange={(e) => setTwoFactor(e.target.checked)}
            className="w-5 h-5 accent-emerald-500 rounded"
          />
        </label>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/20"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
