'use client';

import React, { useState } from 'react';
import { Megaphone, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';

interface CampaignRecord {
  id: string;
  title: string;
  platform: string;
  action: string;
  targetUrl: string;
  targetQuantity: number;
  completedQuantity: number;
  progressPercentage: number;
  amountText: string;
  paymentMethod: string;
  status: 'ACTIVE' | 'PENDING_REVIEW' | 'COMPLETED' | 'REJECTED';
  createdAt: string;
}

const DEMO_CAMPAIGNS: CampaignRecord[] = [
  {
    id: 'cmp-001',
    title: 'Follow @SocialEarn Official',
    platform: 'INSTAGRAM',
    action: 'FOLLOW',
    targetUrl: 'https://instagram.com/socialearn_app',
    targetQuantity: 4500,
    completedQuantity: 3850,
    progressPercentage: 85.56,
    amountText: '₦45,000',
    paymentMethod: 'Money',
    status: 'ACTIVE',
    createdAt: '2026-08-12'
  },
  {
    id: 'cmp-002',
    title: 'YouTube Watch & Engage',
    platform: 'YOUTUBE',
    action: 'WATCH',
    targetUrl: 'https://youtube.com/watch?v=demo12345',
    targetQuantity: 1000,
    completedQuantity: 142,
    progressPercentage: 14.2,
    amountText: '220,000 Pts',
    paymentMethod: 'Points',
    status: 'ACTIVE',
    createdAt: '2026-08-11'
  },
  {
    id: 'cmp-003',
    title: 'GitHub Repository Stars',
    platform: 'OTHER',
    action: 'CUSTOM',
    targetUrl: 'https://github.com/example/repo',
    targetQuantity: 500,
    completedQuantity: 0,
    progressPercentage: 0,
    amountText: '10,000 Pts',
    paymentMethod: 'Points',
    status: 'PENDING_REVIEW',
    createdAt: '2026-08-14'
  }
];

export default function MyCampaignsPage() {
  const [campaigns] = useState<CampaignRecord[]>(DEMO_CAMPAIGNS);
  const [inspectCampaign, setInspectCampaign] = useState<CampaignRecord | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Campaigns</h1>
        <p className="text-slate-400 text-sm mt-1">Track campaign performance, live progress counters, and approval status.</p>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Campaign</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Target & Progress</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Metrics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{cmp.title}</div>
                    <div className="text-xs text-slate-400">{cmp.targetUrl}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">
                      {cmp.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-56">
                    <div className="text-xs font-bold text-slate-200">
                      {cmp.completedQuantity.toLocaleString()} / {cmp.targetQuantity.toLocaleString()} ({cmp.progressPercentage}%)
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${cmp.progressPercentage}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{cmp.amountText}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400">{cmp.paymentMethod}</td>
                  <td className="px-6 py-4">
                    {cmp.status === 'ACTIVE' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        ACTIVE
                      </span>
                    )}
                    {cmp.status === 'PENDING_REVIEW' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                        PENDING REVIEW
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setInspectCampaign(cmp)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CAMPAIGN TIMELINE INSPECTION MODAL (PHASE 29, 30, 31) */}
      {inspectCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">Campaign Timeline & Analytics</h3>
              <button onClick={() => setInspectCampaign(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <div><span className="text-slate-400 text-xs uppercase font-bold block">Campaign ID:</span> {inspectCampaign.id}</div>
              <div><span className="text-slate-400 text-xs uppercase font-bold block">Title:</span> {inspectCampaign.title}</div>
              <div>
                <span className="text-slate-400 text-xs uppercase font-bold block mb-1">Live Progress:</span>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                  <span>Verified: <strong>{inspectCampaign.completedQuantity}</strong></span>
                  <span>Target: <strong>{inspectCampaign.targetQuantity}</strong></span>
                  <span>Progress: <strong className="text-emerald-400">{inspectCampaign.progressPercentage}%</strong></span>
                </div>
              </div>
            </div>
            <button onClick={() => setInspectCampaign(null)} className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs mt-2">
              Close Analytics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
