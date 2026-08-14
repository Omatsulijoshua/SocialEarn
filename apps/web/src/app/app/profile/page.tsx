'use client';

import React from 'react';
import { User, Award, CheckSquare, Megaphone, Clock, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Manage public profile details and track level progression.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black font-black text-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
            JS
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Joshua Creator</h2>
            <p className="text-sm text-slate-400">@campaign_king • Nigeria</p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              Level 5 Engager (12,000 XP)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div>
            <div className="text-2xl font-black text-white">1,842</div>
            <div className="text-xs text-slate-400 font-bold uppercase mt-1">Tasks Completed</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">12</div>
            <div className="text-xs text-slate-400 font-bold uppercase mt-1">Campaigns Launched</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">450 Mins</div>
            <div className="text-xs text-slate-400 font-bold uppercase mt-1">Watch Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
