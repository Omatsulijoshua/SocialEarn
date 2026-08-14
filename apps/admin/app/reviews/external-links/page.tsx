'use client';

import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface ExternalReviewRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  submittedByUsername: string;
  platformName: string;
  url: string;
  action: string;
  targetQuantity: number;
  rewardPerTask: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUIRED';
  reviewReason?: string;
  createdAt: string;
}

const DEMO_REVIEWS: ExternalReviewRecord[] = [
  {
    id: 'rev-101',
    campaignId: 'cmp-005',
    campaignTitle: 'Star Official GitHub Repository',
    submittedByUsername: 'John123',
    platformName: 'GitHub',
    url: 'https://github.com/example/socialearn',
    action: 'CUSTOM',
    targetQuantity: 500,
    rewardPerTask: 20,
    status: 'PENDING',
    createdAt: '2 minutes ago'
  },
  {
    id: 'rev-102',
    campaignId: 'cmp-008',
    campaignTitle: 'Substack Newsletter Subscribe',
    submittedByUsername: 'TechWriter',
    platformName: 'Substack',
    url: 'https://techdigest.substack.com',
    action: 'SUBSCRIBE',
    targetQuantity: 1000,
    rewardPerTask: 25,
    status: 'PENDING',
    createdAt: '15 minutes ago'
  }
];

export default function ExternalLinkQueuePage() {
  const [reviews, setReviews] = useState<ExternalReviewRecord[]>(DEMO_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<ExternalReviewRecord | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [actionSuccessText, setActionSuccessText] = useState<string>('');

  const handleAction = (status: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUIRED') => {
    if (!selectedReview) return;
    if ((status === 'REJECTED' || status === 'CHANGES_REQUIRED') && !rejectionReason) {
      alert('Explanation reason/message is required for this action.');
      return;
    }

    setReviews(prev => prev.map(r => {
      if (r.id === selectedReview.id) {
        return {
          ...r,
          status,
          reviewReason: status !== 'APPROVED' ? rejectionReason : undefined
        };
      }
      return r;
    }));

    setActionSuccessText(`External link review updated to ${status}. ${status === 'APPROVED' ? 'Campaign is now APPROVED & ACTIVE in public marketplace!' : ''}`);
    setSelectedReview(null);
    setRejectionReason('');
    setTimeout(() => setActionSuccessText(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">External Link Approval Queue</h1>
        <p className="text-slate-400 text-sm mt-1">Mandatory Admin moderation queue for custom and external platform links (Phases 15 - 18).</p>
      </div>

      {actionSuccessText && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {actionSuccessText}
        </div>
      )}

      {/* REVIEWS TABLE (PHASE 15 & 16 MANDATORY COLUMNS) */}
      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Campaign Title</th>
                <th className="px-6 py-4">Submitted By</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Target URL</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4">Reward</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{rev.campaignTitle}</td>
                  <td className="px-6 py-4 text-purple-400 font-semibold">{rev.submittedByUsername}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-bold text-slate-300 border border-slate-700">
                      {rev.platformName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{rev.url}</td>
                  <td className="px-6 py-4 font-semibold text-slate-300">{rev.action}</td>
                  <td className="px-6 py-4 text-white font-bold">{rev.targetQuantity.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-emerald-400">+{rev.rewardPerTask} Pts</td>
                  <td className="px-6 py-4 text-slate-400">{rev.createdAt}</td>
                  <td className="px-6 py-4">
                    {rev.status === 'PENDING' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                        PENDING
                      </span>
                    )}
                    {rev.status === 'APPROVED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                        APPROVED
                      </span>
                    )}
                    {rev.status === 'REJECTED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">
                        REJECTED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedReview(rev)}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/20"
                    >
                      Inspect & Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADMIN INSPECTOR DIALOG (PHASE 16 & 17 MANDATORY REQUIREMENTS) */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="admin-card w-full max-w-lg p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">Admin Moderation Inspector</h3>
              <button onClick={() => setSelectedReview(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div><span className="text-slate-400 uppercase font-bold block">Campaign Title:</span> <strong className="text-white text-sm">{selectedReview.campaignTitle}</strong></div>
              <div><span className="text-slate-400 uppercase font-bold block">Submitted By:</span> {selectedReview.submittedByUsername}</div>
              <div><span className="text-slate-400 uppercase font-bold block">Platform & Action:</span> {selectedReview.platformName} • {selectedReview.action}</div>
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="truncate max-w-xs">{selectedReview.url}</span>
                <a
                  href={selectedReview.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 font-bold hover:bg-purple-500/20 border border-purple-500/20 flex items-center gap-1 shrink-0"
                >
                  Open Link <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-300 uppercase">Reason / Explanation Notes (Required for Reject/Request Changes)</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Reason for rejection or change request..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            {/* ACTION BUTTONS (PHASE 17) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => handleAction('APPROVED')}
                className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction('REJECTED')}
                className="py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction('CHANGES_REQUIRED')}
                className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
              >
                Request Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
