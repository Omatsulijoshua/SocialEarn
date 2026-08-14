'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, Coins, Megaphone, ShieldCheck } from 'lucide-react';

interface NotifItem {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  date: string;
}

const DEMO_NOTIFS: NotifItem[] = [
  {
    id: 'n-1',
    title: 'Task Verified (+220 Points)',
    message: 'Your YouTube Watch & Engage task execution was verified by system engine.',
    type: 'TASK_REWARD',
    isRead: false,
    date: '10 minutes ago'
  },
  {
    id: 'n-2',
    title: 'Campaign Progress Milestone (85%)',
    message: 'Your campaign "Follow @SocialEarn Official" reached 3,850 / 4,500 target completions.',
    type: 'CAMPAIGN_MILESTONE',
    isRead: false,
    date: '2 hours ago'
  },
  {
    id: 'n-3',
    title: 'Referral Bonus Received (+100 Points)',
    message: 'Sarah Earner registered using your personal referral link.',
    type: 'REFERRAL_REWARD',
    isRead: true,
    date: '1 day ago'
  }
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<NotifItem[]>(DEMO_NOTIFS);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notifications & Alerts</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time alerts for task rewards, campaign progress, and platform updates.</p>
        </div>
        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700"
        >
          Mark All as Read
        </button>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        {notifs.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              !n.isRead 
                ? 'bg-emerald-500/10 border-emerald-500/30' 
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">{n.title}</h4>
                <span className="text-[11px] text-slate-400">{n.date}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
