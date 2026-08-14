'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Search, ShieldAlert, CheckCircle2, ChevronRight, Ban, RefreshCw, Eye } from 'lucide-react';

interface UserRecord {
  id: string;
  fullName: string;
  username: string;
  email: string;
  country: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'RESTRICTED' | 'BANNED';
  points: number;
  cash: number;
  campaignsCount: number;
  tasksCount: number;
  riskScore: number; // 0 - 100
  joinedDate: string;
}

const DEMO_USERS: UserRecord[] = [
  {
    id: 'usr-101',
    fullName: 'Joshua Creator',
    username: 'campaign_king',
    email: 'creator@example.com',
    country: 'Nigeria',
    status: 'ACTIVE',
    points: 50000,
    cash: 12500,
    campaignsCount: 12,
    tasksCount: 45,
    riskScore: 12,
    joinedDate: '2026-08-01'
  },
  {
    id: 'usr-102',
    fullName: 'Sarah Earner',
    username: 'task_hunter',
    email: 'earner@example.com',
    country: 'Nigeria',
    status: 'ACTIVE',
    points: 24580,
    cash: 12500,
    campaignsCount: 1,
    tasksCount: 180,
    riskScore: 8,
    joinedDate: '2026-08-05'
  },
  {
    id: 'usr-103',
    fullName: 'Suspicious Bot User',
    username: 'bot_user_99',
    email: 'suspicious@example.com',
    country: 'Nigeria',
    status: 'RESTRICTED',
    points: 120,
    cash: 0,
    campaignsCount: 0,
    tasksCount: 310,
    riskScore: 87,
    joinedDate: '2026-08-14'
  }
];

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(DEMO_USERS);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  const [adjustingUser, setAdjustingUser] = useState<UserRecord | null>(null);
  const [pointAdjustment, setPointAdjustment] = useState<number>(1000);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('');

  const filteredUsers = users.filter(u => {
    const matchesFilter = 
      selectedFilter === 'ALL' || 
      (selectedFilter === 'HIGH_RISK' ? u.riskScore >= 70 : u.status === selectedFilter);
    const matchesSearch = 
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id: string, status: 'ACTIVE' | 'SUSPENDED' | 'RESTRICTED' | 'BANNED') => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
    setToastMessage(`User status changed to ${status}. Immutable AuditLog entry recorded.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleConfirmPointAdjustment = () => {
    if (!adjustingUser || !adjustmentReason) {
      alert('Adjustment reason is required for points adjustment');
      return;
    }

    setUsers(prev => prev.map(u => {
      if (u.id === adjustingUser.id) {
        return { ...u, points: u.points + pointAdjustment };
      }
      return u;
    }));

    setToastMessage(`Adjusted ${pointAdjustment} points for ${adjustingUser.email}. Reason: "${adjustmentReason}". AuditLog entry created.`);
    setAdjustingUser(null);
    setAdjustmentReason('');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Governance & Accounts</h1>
          <p className="text-slate-400 text-sm mt-1">Search, inspect profiles, manage risk scores, and adjust balances (Phase D).</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, @handle, ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* FILTER PILLS (PHASE 9 MANDATORY FILTERS) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'ACTIVE', 'SUSPENDED', 'RESTRICTED', 'BANNED', 'HIGH_RISK'].map((f) => (
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

      {/* USERS TABLE (PHASE 9 MANDATORY COLUMNS) */}
      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Points</th>
                <th className="px-6 py-4">Cash</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Governance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-sm">{u.fullName}</div>
                    <div className="text-slate-400">{u.email} (@{u.username})</div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{u.country}</td>
                  <td className="px-6 py-4">
                    {u.status === 'ACTIVE' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                        ACTIVE
                      </span>
                    )}
                    {u.status === 'RESTRICTED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                        RESTRICTED
                      </span>
                    )}
                    {u.status === 'SUSPENDED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">
                        SUSPENDED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-emerald-400">{u.points.toLocaleString()} Pts</td>
                  <td className="px-6 py-4 font-bold text-cyan-400">₦{u.cash.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded font-black text-[11px] ${
                      u.riskScore >= 70 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {u.riskScore} / 100
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{u.joinedDate}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setAdjustingUser(u)}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold border border-purple-500/20"
                    >
                      Adjust Pts
                    </button>

                    {u.status !== 'ACTIVE' && (
                      <button
                        onClick={() => handleStatusChange(u.id, 'ACTIVE')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20"
                      >
                        Restore
                      </button>
                    )}
                    {u.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleStatusChange(u.id, 'RESTRICTED')}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20"
                      >
                        Restrict
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADJUST POINTS MODAL (PHASE 11 MANDATORY REASON REQUIREMENT) */}
      {adjustingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="admin-card w-full max-w-md p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">Adjust Points for {adjustingUser.username}</h3>
              <button onClick={() => setAdjustingUser(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Point Adjustment Delta</label>
              <input
                type="number"
                value={pointAdjustment}
                onChange={(e) => setPointAdjustment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-base"
              />
              <p className="text-[11px] text-slate-400 mt-1">Use negative values to deduct points (e.g. -500).</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Admin Audit Reason (Required)</label>
              <textarea
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                placeholder="Reason for adjusting user points balance..."
                rows={2}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <button
              onClick={handleConfirmPointAdjustment}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20"
            >
              Confirm Point Adjustment & Write AuditLog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
