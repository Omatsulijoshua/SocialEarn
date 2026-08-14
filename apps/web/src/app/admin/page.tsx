'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, Megaphone, CheckSquare, Coins, Wallet, ExternalLink, 
  ShieldAlert, TrendingUp, ArrowRight, Bell, AlertTriangle 
} from 'lucide-react';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* ALERT NOTIFICATION BANNER (PHASE 15 MANDATORY REQUIREMENT) */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-amber-500/30 bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">🔔 12 External campaigns awaiting review</h3>
            <p className="text-slate-300 text-xs mt-0.5">External and custom platform links require mandatory moderation before publication.</p>
          </div>
        </div>
        <Link
          href="/admin/external-links"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs whitespace-nowrap transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          Open Review Queue <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* METRIC CARDS GRID (PHASE 42 MANDATORY METRICS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">1,240</div>
          <div className="mt-2 text-xs text-emerald-400 font-semibold">+18 users today</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Active Campaigns</span>
            <Megaphone className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">24</div>
          <div className="mt-2 text-xs text-slate-400 font-medium">Completed: 180</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Pending External Links</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">12</div>
          <div className="mt-2 text-xs text-amber-400/80 font-semibold">Requires Moderation</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Total Revenue</span>
            <Wallet className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">₦1,250,000</div>
          <div className="mt-2 text-xs text-cyan-400 font-semibold">+12% vs last month</div>
        </div>
      </div>

      {/* SECONDARY SYSTEM METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase">Tasks Completed Total</div>
          <div className="text-2xl font-black text-white mt-1">45,280</div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase">Points Distributed</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">1,450,000 Pts</div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase">Points Redeemed</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">620,000 Pts</div>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <div className="text-slate-400 text-xs font-bold uppercase">Fraud Alerts</div>
          <div className="text-2xl font-black text-red-400 mt-1">2 Review Req</div>
        </div>
      </div>
    </div>
  );
}
