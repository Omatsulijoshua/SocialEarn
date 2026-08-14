'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, Megaphone, CheckSquare, Coins, Wallet, ExternalLink, 
  ShieldAlert, TrendingUp, ArrowRight, Bell, Calendar, BarChart3
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const REVENUE_GROWTH_DATA = [
  { day: 'Mon', revenue: 1250000, points: 24000000 },
  { day: 'Tue', revenue: 1840000, points: 32000000 },
  { day: 'Wed', revenue: 2100000, points: 41000000 },
  { day: 'Thu', revenue: 1950000, points: 38000000 },
  { day: 'Fri', revenue: 2750000, points: 52000000 },
  { day: 'Sat', revenue: 3100000, points: 64000000 },
  { day: 'Sun', revenue: 3850000, points: 78000000 },
];

const PLATFORM_DISTRIBUTION = [
  { name: 'YouTube', value: 35, color: '#ef4444' },
  { name: 'Instagram', value: 25, color: '#ec4899' },
  { name: 'TikTok', value: 15, color: '#06b6d4' },
  { name: 'X', value: 10, color: '#3b82f6' },
  { name: 'Telegram', value: 10, color: '#0284c7' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

export default function AdminHomePage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-8">
      {/* HEADER & TIME RANGE SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Operations Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time metrics, user growth, revenue velocity, and moderation queues.</p>
        </div>

        <div className="flex items-center gap-2 glass-panel p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
          <Calendar className="w-4 h-4 text-slate-400 ml-2" />
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === range ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* NOTIFICATION QUEUE ALERT BANNER (PHASE 8 MANDATORY REQUIREMENT) */}
      <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-purple-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">🔔 12 External Links & 8 Withdrawals Awaiting Review</h3>
            <p className="text-slate-300 text-xs mt-0.5">External links require safety verification before public task marketplace publication.</p>
          </div>
        </div>
        <Link
          href="/reviews/external-links"
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs whitespace-nowrap transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
        >
          Open Moderation Queue <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI METRIC CARDS (PHASE 6 MANDATORY KPI CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="admin-card p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Users</div>
          <div className="text-2xl sm:text-3xl font-black text-white">152,430</div>
          <div className="mt-1 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +1,284 today
          </div>
        </div>

        <div className="admin-card p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Active Users</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">24,820</div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">16.2% daily active</div>
        </div>

        <div className="admin-card p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Campaigns</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">38,420</div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Active: <strong className="text-white">4,832</strong></div>
        </div>

        <div className="admin-card p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Tasks Completed</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">8,492,120</div>
          <div className="mt-1 text-[11px] text-emerald-400 font-semibold">100% Verified</div>
        </div>

        <div className="admin-card p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Points Economy</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">1.82B</div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Distributed total</div>
        </div>
      </div>

      {/* SECONDARY FINANCIAL KPI ROW */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="admin-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase">Total Platform Revenue</div>
            <div className="text-3xl font-black text-white mt-1">₦82,400,000</div>
            <div className="text-xs text-emerald-400 font-semibold mt-1">+14.2% this month</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="admin-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase">Pending Withdrawals</div>
            <div className="text-3xl font-black text-cyan-400 mt-1">₦4,200,000</div>
            <div className="text-xs text-slate-400 font-medium mt-1">8 requests awaiting approval</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/20">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        <div className="admin-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase">Risk & Fraud Alerts</div>
            <div className="text-3xl font-black text-red-400 mt-1">3 Alerts</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Requires Analyst review</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold border border-red-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ANALYTICS CHARTS SECTION (PHASE 7 MANDATORY REQUIREMENT) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* REVENUE GROWTH AREA CHART */}
        <div className="lg:col-span-2 admin-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-white text-base">Revenue & Points Velocity</h3>
              <p className="text-xs text-slate-400">Daily gross revenue and distributed point volume</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_GROWTH_DATA}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PLATFORM DISTRIBUTION DONUT CHART */}
        <div className="admin-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-white text-base">Platform Task Distribution</h3>
          <p className="text-xs text-slate-400">Active campaigns by social platform</p>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PLATFORM_DISTRIBUTION} innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                  {PLATFORM_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            {PLATFORM_DISTRIBUTION.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-slate-300 font-semibold">{p.name}: <strong className="text-white">{p.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
