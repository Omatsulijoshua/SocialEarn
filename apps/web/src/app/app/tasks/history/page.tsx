'use client';

import React, { useState } from 'react';
import { History, CheckCircle2, Clock, XCircle, ChevronRight, Coins } from 'lucide-react';

interface HistoryRecord {
  id: string;
  date: string;
  title: string;
  platform: string;
  action: string;
  rewardPoints: number;
  status: 'Verified' | 'Pending' | 'Rejected' | 'Expired';
  rejectionReason?: string;
}

const DEMO_HISTORY: HistoryRecord[] = [
  {
    id: 'att-101',
    date: '2026-08-14 20:15',
    title: 'Follow @SocialEarn Official',
    platform: 'INSTAGRAM',
    action: 'FOLLOW',
    rewardPoints: 15,
    status: 'Verified'
  },
  {
    id: 'att-102',
    date: '2026-08-14 18:30',
    title: 'YouTube Watch & Engage (10 Mins)',
    platform: 'YOUTUBE',
    action: 'WATCH',
    rewardPoints: 220,
    status: 'Verified'
  },
  {
    id: 'att-103',
    date: '2026-08-13 14:10',
    title: 'Join Community Broadcast Channel',
    platform: 'TELEGRAM',
    action: 'JOIN',
    rewardPoints: 20,
    status: 'Verified'
  },
  {
    id: 'att-104',
    date: '2026-08-12 09:45',
    title: 'Repost Product Launch Announcement',
    platform: 'X',
    action: 'SHARE_REPOST',
    rewardPoints: 25,
    status: 'Pending'
  }
];

export default function TaskHistoryPage() {
  const [historyList] = useState<HistoryRecord[]>(DEMO_HISTORY);
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Task Performance History</h1>
        <p className="text-slate-400 text-sm mt-1">Complete immutable record of all social tasks you have attempted and completed.</p>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Reward</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {historyList.map((record) => (
                <tr key={record.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-slate-400">{record.date}</td>
                  <td className="px-6 py-4 font-bold text-white">{record.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">
                      {record.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400">{record.action}</td>
                  <td className="px-6 py-4 font-extrabold text-emerald-400">+{record.rewardPoints} Pts</td>
                  <td className="px-6 py-4">
                    {record.status === 'Verified' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                    {record.status === 'Pending' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 flex items-center gap-1.5 w-fit">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL INSPECTION MODAL (PHASE 17) */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">Task Execution Record</h3>
              <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <div><span className="text-slate-400 text-xs uppercase font-bold block">Attempt ID:</span> {selectedRecord.id}</div>
              <div><span className="text-slate-400 text-xs uppercase font-bold block">Campaign Title:</span> {selectedRecord.title}</div>
              <div><span className="text-slate-400 text-xs uppercase font-bold block">Platform & Action:</span> {selectedRecord.platform} • {selectedRecord.action}</div>
              <div><span className="text-slate-400 text-xs uppercase font-bold block">Reward Issued:</span> +{selectedRecord.rewardPoints} Points</div>
              <div><span className="text-slate-400 text-xs uppercase font-bold block">Execution Date:</span> {selectedRecord.date}</div>
            </div>
            <button onClick={() => setSelectedRecord(null)} className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs mt-2">
              Close Inspection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
