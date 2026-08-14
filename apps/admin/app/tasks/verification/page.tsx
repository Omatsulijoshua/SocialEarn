'use client';

import React, { useState } from 'react';
import { CheckSquare, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface VerificationTaskItem {
  id: string;
  userEmail: string;
  campaignTitle: string;
  platform: string;
  action: string;
  submittedAt: string;
  verificationMethod: string;
  riskScore: number;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'FLAGGED';
}

const DEMO_TASK_SUBMISSIONS: VerificationTaskItem[] = [
  {
    id: 'ts-001',
    userEmail: 'earner@example.com',
    campaignTitle: 'Follow @SocialEarn Official',
    platform: 'INSTAGRAM',
    action: 'FOLLOW',
    submittedAt: '5 minutes ago',
    verificationMethod: 'AUTOMATED',
    riskScore: 12,
    status: 'PENDING'
  },
  {
    id: 'ts-002',
    userEmail: 'suspicious@example.com',
    campaignTitle: 'Star Official GitHub Repository',
    platform: 'OTHER',
    action: 'CUSTOM',
    submittedAt: '12 minutes ago',
    verificationMethod: 'MANUAL_PROOF',
    riskScore: 87,
    status: 'FLAGGED'
  }
];

export default function TaskVerificationQueuePage() {
  const [submissions, setSubmissions] = useState<VerificationTaskItem[]>(DEMO_TASK_SUBMISSIONS);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleAction = (id: string, status: 'VERIFIED' | 'REJECTED') => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setToastMessage(`Task submission ${status.toLowerCase()} by Admin. AuditLog recorded.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Task Verification Queue</h1>
        <p className="text-slate-400 text-sm mt-1">Manual review queue for disputed, flagged, or proof-based task attempts (Phase G & 20).</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Task Submission</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{sub.campaignTitle}</td>
                  <td className="px-6 py-4 text-purple-400 font-semibold">{sub.userEmail}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-bold text-slate-300 border border-slate-700">
                      {sub.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{sub.submittedAt}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-300">{sub.verificationMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded font-black text-[11px] ${
                      sub.riskScore >= 70 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {sub.riskScore} / 100
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {sub.status === 'PENDING' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                        PENDING
                      </span>
                    )}
                    {sub.status === 'FLAGGED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">
                        FLAGGED
                      </span>
                    )}
                    {sub.status === 'VERIFIED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                        VERIFIED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {sub.status !== 'VERIFIED' && (
                      <button
                        onClick={() => handleAction(sub.id, 'VERIFIED')}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs"
                      >
                        Verify & Award
                      </button>
                    )}
                    {sub.status !== 'REJECTED' && (
                      <button
                        onClick={() => handleAction(sub.id, 'REJECTED')}
                        className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold text-xs"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
