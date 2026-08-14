'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Coins, Wallet, CheckSquare, Megaphone, ArrowUpRight, TrendingUp, 
  Play, ShieldCheck, Sparkles, Clock, Award, ArrowRight 
} from 'lucide-react';

export default function UserDashboardHome() {
  return (
    <div className="space-y-8">
      {/* HEADER BANNER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Level 5 Engager
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Your Social Activity Summary</h2>
            <p className="text-slate-400 text-sm mt-1">Complete verified tasks or create custom campaigns with your earned points.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/app/tasks"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              Browse Tasks <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/app/campaigns/create"
              className="px-5 py-3 rounded-xl glass-card hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              Create Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* METRIC GRID (PHASE 6 MANDATORY METRICS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* POINTS CARD */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Available Points</span>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">24,580</div>
          <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +1,450 this week
          </div>
        </div>

        {/* CASH BALANCE CARD */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Cash Balance</span>
            <Wallet className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">₦12,500</div>
          <div className="mt-2 text-xs text-slate-400 font-medium">
            Pending: <span className="text-amber-400 font-bold">₦2,500</span>
          </div>
        </div>

        {/* TASKS COMPLETED */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Tasks Completed</span>
            <CheckSquare className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-white">1,842</div>
          <div className="mt-2 text-xs text-teal-400 font-semibold">100% Verification Pass</div>
        </div>

        {/* CAMPAIGNS ACTIVE */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Active Campaigns</span>
            <Megaphone className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">2 Active</div>
          <div className="mt-2 text-xs text-slate-400 font-medium">Target Progress: 85.5%</div>
        </div>
      </div>

      {/* RECOMMENDED TASKS & QUICK MARKETPLACE PREVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-white">Recommended Tasks For You</h3>
          <Link href="/app/tasks" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
            View All Marketplace Tasks <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* TASK CARD 1 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                  Instagram
                </span>
                <span className="text-emerald-400 font-extrabold text-sm">+15 Points</span>
              </div>
              <h4 className="font-bold text-white text-base">Follow @SocialEarn Official</h4>
              <p className="text-xs text-slate-400 mt-1">Follow our verified Instagram page for updates.</p>
              
              {/* PROGRESS BAR (PHASE 7 & 8 MANDATORY REQUIREMENT) */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>385 / 4,500 completed</span>
                  <span className="text-emerald-400">8.56%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '8.56%' }} />
                </div>
              </div>
            </div>
            <Link
              href="/app/tasks"
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs text-center transition-all shadow-md shadow-emerald-500/20"
            >
              Perform Task
            </Link>
          </div>

          {/* TASK CARD 2 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                  YouTube
                </span>
                <span className="text-emerald-400 font-extrabold text-sm">+220 Points</span>
              </div>
              <h4 className="font-bold text-white text-base">Watch & Engage (10 Mins)</h4>
              <p className="text-xs text-slate-400 mt-1">Watch full 10-minute video and subscribe.</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>142 / 1,000 completed</span>
                  <span className="text-emerald-400">14.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '14.2%' }} />
                </div>
              </div>
            </div>
            <Link
              href="/app/tasks"
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs text-center transition-all shadow-md shadow-emerald-500/20"
            >
              Perform Task
            </Link>
          </div>

          {/* TASK CARD 3 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                  Telegram
                </span>
                <span className="text-emerald-400 font-extrabold text-sm">+20 Points</span>
              </div>
              <h4 className="font-bold text-white text-base">Join Official Telegram Channel</h4>
              <p className="text-xs text-slate-400 mt-1">Join the community broadcast channel.</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>820 / 1,000 completed</span>
                  <span className="text-emerald-400">82.0%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
            <Link
              href="/app/tasks"
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs text-center transition-all shadow-md shadow-emerald-500/20"
            >
              Perform Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
