'use client';

import React, { useState } from 'react';
import { Megaphone, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';

interface CampaignItem {
  id: string;
  title: string;
  ownerUsername: string;
  platform: string;
  action: string;
  targetUrl: string;
  targetQuantity: number;
  completedQuantity: number;
  progressPercentage: number;
  paymentMethod: string;
  costText: string;
  status: 'ACTIVE' | 'PENDING_REVIEW' | 'COMPLETED' | 'PAUSED' | 'REJECTED';
  createdAt: string;
}

const DEMO_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'cmp-001',
    title: 'Follow @SocialEarn Official',
    ownerUsername: 'campaign_king',
    platform: 'INSTAGRAM',
    action: 'FOLLOW',
    targetUrl: 'https://instagram.com/socialearn_app',
    targetQuantity: 4500,
    completedQuantity: 3850,
    progressPercentage: 85.56,
    paymentMethod: 'Money',
    costText: '₦45,000',
    status: 'ACTIVE',
    createdAt: '2026-08-12'
  },
  {
    id: 'cmp-002',
    title: 'YouTube Watch & Engage',
    ownerUsername: 'campaign_king',
    platform: 'YOUTUBE',
    action: 'WATCH',
    targetUrl: 'https://youtube.com/watch?v=demo12345',
    targetQuantity: 1000,
    completedQuantity: 142,
    progressPercentage: 14.2,
    paymentMethod: 'Points',
    costText: '220,000 Pts',
    status: 'ACTIVE',
    createdAt: '2026-08-11'
  },
  {
    id: 'cmp-005',
    title: 'Star Official GitHub Repository',
    ownerUsername: 'John123',
    platform: 'OTHER',
    action: 'CUSTOM',
    targetUrl: 'https://github.com/example/socialearn',
    targetQuantity: 500,
    completedQuantity: 0,
    progressPercentage: 0,
    paymentMethod: 'Points',
    costText: '10,000 Pts',
    status: 'PENDING_REVIEW',
    createdAt: '2026-08-14'
  }
];

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(DEMO_CAMPAIGNS);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filteredCampaigns = campaigns.filter(c => {
    return selectedFilter === 'ALL' || c.status === selectedFilter;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Campaign Management</h1>
        <p className="text-slate-400 text-sm mt-1">Inspect all user campaigns, live progress metrics, and moderation states (Phase 12 - 14).</p>
      </div>

      {/* FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'ACTIVE', 'PENDING_REVIEW', 'COMPLETED', 'PAUSED', 'REJECTED'].map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              selectedFilter === f
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'admin-card text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Campaign</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Target & Progress</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-sm">{c.title}</div>
                    <div className="text-slate-400">{c.targetUrl}</div>
                  </td>
                  <td className="px-6 py-4 text-purple-400 font-semibold">@{c.ownerUsername}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-bold text-slate-300 border border-slate-700">
                      {c.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-52">
                    <div className="text-xs font-bold text-slate-200">
                      {c.completedQuantity.toLocaleString()} / {c.targetQuantity.toLocaleString()} ({c.progressPercentage}%)
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${c.progressPercentage}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{c.costText}</td>
                  <td className="px-6 py-4 text-slate-400">{c.paymentMethod}</td>
                  <td className="px-6 py-4">
                    {c.status === 'ACTIVE' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                        ACTIVE
                      </span>
                    )}
                    {c.status === 'PENDING_REVIEW' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                        PENDING REVIEW
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400">{c.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
