'use client';

import React from 'react';
import { History, ShieldCheck, Lock } from 'lucide-react';

interface AuditRecord {
  id: string;
  adminEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

const DEMO_AUDIT_LOGS: AuditRecord[] = [
  {
    id: 'audit-001',
    adminEmail: 'admin@socialearn.app',
    action: 'EXTERNAL_LINK_APPROVED',
    targetType: 'CAMPAIGN',
    targetId: 'cmp-005',
    details: 'Admin superadmin approved campaign link: https://github.com/example/socialearn',
    ipAddress: '197.210.65.12',
    timestamp: '2026-08-14 21:45'
  },
  {
    id: 'audit-002',
    adminEmail: 'admin@socialearn.app',
    action: 'USER_SUSPENDED',
    targetType: 'USER',
    targetId: 'user-c',
    details: 'User status changed to SUSPENDED for suspicious@example.com',
    ipAddress: '197.210.65.12',
    timestamp: '2026-08-14 19:20'
  },
  {
    id: 'audit-003',
    adminEmail: 'admin@socialearn.app',
    action: 'LOGIN',
    targetType: 'ADMIN_AUTH',
    targetId: 'admin-1',
    details: 'Super Admin login successful with 2FA verification',
    ipAddress: '197.210.65.12',
    timestamp: '2026-08-14 18:00'
  }
];

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Audit Log</h1>
        <p className="text-slate-400 text-sm mt-1">Immutable security log of all sensitive admin actions (Phase 43).</p>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {DEMO_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-400 font-sans">{log.timestamp}</td>
                  <td className="px-6 py-4 text-amber-400 font-bold">{log.adminEmail}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{log.targetType} ({log.targetId})</td>
                  <td className="px-6 py-4 font-sans text-slate-200 max-w-sm truncate">{log.details}</td>
                  <td className="px-6 py-4 text-right text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
