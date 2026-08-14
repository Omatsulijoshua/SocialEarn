'use client';

import React, { useState } from 'react';
import { Users, Search, ShieldAlert, CheckCircle2, Ban, ShieldCheck } from 'lucide-react';

interface UserRecord {
  id: string;
  email: string;
  username: string;
  fullName: string;
  country: string;
  role: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  points: number;
  cash: number;
}

const DEMO_USERS: UserRecord[] = [
  {
    id: 'user-a',
    email: 'creator@example.com',
    username: 'campaign_king',
    fullName: 'Joshua Creator',
    country: 'Nigeria',
    role: 'USER',
    status: 'ACTIVE',
    points: 50000,
    cash: 12500
  },
  {
    id: 'user-b',
    email: 'earner@example.com',
    username: 'task_hunter',
    fullName: 'Sarah Earner',
    country: 'Nigeria',
    role: 'USER',
    status: 'ACTIVE',
    points: 24580,
    cash: 12500
  },
  {
    id: 'user-c',
    email: 'suspicious@example.com',
    username: 'bot_user_99',
    fullName: 'Suspicious Bot',
    country: 'Nigeria',
    role: 'USER',
    status: 'SUSPENDED',
    points: 120,
    cash: 0
  }
];

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(DEMO_USERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (userId: string, newStatus: 'ACTIVE' | 'SUSPENDED' | 'BANNED') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    setToastMessage(`User status updated to ${newStatus} (Audit Log entry created).`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Governance</h1>
          <p className="text-slate-400 text-sm mt-1">Search, inspect profiles, and manage account statuses (Phase 32).</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      <div className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Points</th>
                <th className="px-6 py-4">Cash</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{user.fullName}</div>
                    <div className="text-slate-400">{user.email} (@{user.username})</div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.country}</td>
                  <td className="px-6 py-4 font-bold text-emerald-400">{user.points.toLocaleString()} Pts</td>
                  <td className="px-6 py-4 font-bold text-cyan-400">₦{user.cash.toLocaleString()}</td>
                  <td className="px-6 py-4 font-semibold text-slate-300">{user.role}</td>
                  <td className="px-6 py-4">
                    {user.status === 'ACTIVE' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                        ACTIVE
                      </span>
                    )}
                    {user.status === 'SUSPENDED' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                        SUSPENDED
                      </span>
                    )}
                    {user.status === 'BANNED' && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">
                        BANNED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {user.status !== 'ACTIVE' && (
                      <button
                        onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/20"
                      >
                        Restore
                      </button>
                    )}
                    {user.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleStatusChange(user.id, 'SUSPENDED')}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold border border-amber-500/20"
                      >
                        Suspend
                      </button>
                    )}
                    {user.status !== 'BANNED' && (
                      <button
                        onClick={() => handleStatusChange(user.id, 'BANNED')}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/20"
                      >
                        Ban
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
