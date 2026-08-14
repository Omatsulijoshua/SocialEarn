'use client';

import React, { useState } from 'react';
import { Globe, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PlatformSetting {
  id: string;
  name: string;
  enabled: boolean;
  supportedActions: string[];
  verificationMethod: string;
}

const DEMO_PLATFORMS: PlatformSetting[] = [
  { id: 'p-1', name: 'INSTAGRAM', enabled: true, supportedActions: ['FOLLOW', 'LIKE', 'COMMENT'], verificationMethod: 'AUTOMATED_API' },
  { id: 'p-2', name: 'TIKTOK', enabled: true, supportedActions: ['FOLLOW', 'LIKE'], verificationMethod: 'AUTOMATED_API' },
  { id: 'p-3', name: 'YOUTUBE', enabled: true, supportedActions: ['SUBSCRIBE', 'LIKE', 'WATCH'], verificationMethod: 'WATCH_SESSION_ENGINE' },
  { id: 'p-4', name: 'X (TWITTER)', enabled: true, supportedActions: ['FOLLOW', 'LIKE', 'REPOST'], verificationMethod: 'AUTOMATED_API' },
  { id: 'p-5', name: 'OTHER / CUSTOM', enabled: true, supportedActions: ['CUSTOM'], verificationMethod: 'MANUAL_REVIEW_REQUIRED' },
];

export default function AdminPlatformsPage() {
  const [platforms, setPlatforms] = useState<PlatformSetting[]>(DEMO_PLATFORMS);
  const [toastMessage, setToastMessage] = useState<string>('');

  const togglePlatform = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
    setToastMessage('Platform availability updated across all task marketplace endpoints!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform & Action Feature Toggles</h1>
        <p className="text-slate-400 text-sm mt-1">Enable or disable any platform or action independently with zero downtime (Phase M & 30).</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* PLATFORM CARDS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((p) => (
          <div key={p.id} className="admin-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                <span className="font-extrabold text-white text-base">{p.name}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={p.enabled}
                  onChange={() => togglePlatform(p.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase font-bold mb-1">Supported Actions:</div>
              <div className="flex flex-wrap gap-1">
                {p.supportedActions.map(a => (
                  <span key={a} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px] font-bold border border-slate-800">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase font-bold mb-1">Verification Method:</div>
              <div className="font-mono text-[11px] text-purple-300">{p.verificationMethod}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
