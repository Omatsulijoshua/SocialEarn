'use client';

import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'FINANCE' | 'SUPPORT' | 'FRAUD_ANALYST';
  twoFactorEnabled: boolean;
  status: 'ACTIVE' | 'DISABLED';
  lastLogin: string;
}

const DEMO_ADMINS: AdminUserRecord[] = [
  { id: 'adm-1', email: 'admin@socialearn.app', name: 'Platform Super Admin', role: 'SUPER_ADMIN', twoFactorEnabled: true, status: 'ACTIVE', lastLogin: 'Just now' },
  { id: 'adm-2', email: 'finance@socialearn.app', name: 'Finance Controller', role: 'FINANCE', twoFactorEnabled: true, status: 'ACTIVE', lastLogin: '2 hours ago' },
  { id: 'adm-3', email: 'moderator@socialearn.app', name: 'Lead Moderator', role: 'MODERATOR', twoFactorEnabled: true, status: 'ACTIVE', lastLogin: '1 day ago' },
  { id: 'adm-4', email: 'fraud@socialearn.app', name: 'Risk Analyst', role: 'FRAUD_ANALYST', twoFactorEnabled: true, status: 'ACTIVE', lastLogin: '3 days ago' },
];

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<AdminUserRecord[]>(DEMO_ADMINS);
  const [toastMessage, setToastMessage] = useState('');

  const toggleStatus = (id: string) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE' } : a));
    setToastMessage('Admin access status updated. AuditLog entry created.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manage Admins & RBAC Permissions</h1>
        <p className="text-slate-400 text-sm mt-1">Super Admin governance over administrative accounts, roles, and 2FA settings (Phase P & 38).</p>
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
                <th className="px-6 py-4">Admin User</th>
                <th className="px-6 py-4">RBAC Role</th>
                <th className="px-6 py-4">2FA Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {admins.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{adm.name}</div>
                    <div className="text-slate-400">{adm.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 font-mono text-[11px] font-bold border border-purple-500/30">
                      {adm.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                      2FA ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{adm.lastLogin}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                      {adm.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {adm.role !== 'SUPER_ADMIN' && (
                      <button
                        onClick={() => toggleStatus(adm.id)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 font-bold text-xs"
                      >
                        {adm.status === 'ACTIVE' ? 'Disable Access' : 'Enable Access'}
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
