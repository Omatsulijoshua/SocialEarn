'use client';

import React, { useState } from 'react';
import { Flag, CheckCircle2, AlertCircle } from 'lucide-react';

interface DisputeRecord {
  id: string;
  reporterEmail: string;
  category: string;
  subject: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
}

const DEMO_DISPUTES: DisputeRecord[] = [
  { id: 'dsp-1', reporterEmail: 'earner@example.com', category: 'Task Verification', subject: 'YouTube Watch session verified but points delay', status: 'OPEN', createdAt: '30 minutes ago' },
  { id: 'dsp-2', reporterEmail: 'creator@example.com', category: 'Campaign Issue', subject: 'Campaign status active but progress stopped', status: 'INVESTIGATING', createdAt: '2 hours ago' }
];

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<DisputeRecord[]>(DEMO_DISPUTES);
  const [toastMessage, setToastMessage] = useState('');

  const resolveDispute = (id: string) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'RESOLVED' } : d));
    setToastMessage('Dispute resolved. User notified.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Disputes & Support Tickets</h1>
        <p className="text-slate-400 text-sm mt-1">Investigate and resolve user-reported task, campaign, or payout issues (Phase N & 35).</p>
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
                <th className="px-6 py-4">Reporter</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-purple-400">{d.reporterEmail}</td>
                  <td className="px-6 py-4 font-semibold text-slate-200">{d.category}</td>
                  <td className="px-6 py-4 text-slate-300">{d.subject}</td>
                  <td className="px-6 py-4 text-slate-400">{d.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {d.status !== 'RESOLVED' && (
                      <button
                        onClick={() => resolveDispute(d.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs"
                      >
                        Resolve Ticket
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
