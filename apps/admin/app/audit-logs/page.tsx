'use client';

import React from 'react';
import { History, ShieldCheck } from 'lucide-react';

interface AuditLogRecord {
  id: string;
  adminEmail: string;
  action: string;
  targetResource: string;
  ipAddress: string;
  timestamp: string;
}

const DEMO_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'aud-001',
    adminEmail: 'admin@socialearn.app',
    action: 'APPROVED_EXTERNAL_CAMPAIGN',
    targetResource: 'CMP-005 (GitHub Star Task)',
    ipAddress: '197.210.65.14',
    timestamp: '2026-08-14 21:45:12'
  },
  {
    id: 'aud-002',
    adminEmail: 'finance@socialearn.app',
    action: 'APPROVED_CASH_WITHDRAWAL',
    targetResource: 'WD-001 (₦9,850 Payout to Sarah Earner)',
    ipAddress: '102.89.22.45',
    timestamp: '2026-08-14 19:12:08'
  },
  {
    id: 'aud-003',
    adminEmail: 'fraud@socialearn.app',
    action: 'RESTRICTED_USER_ACCOUNT',
    targetResource: 'USR-103 (@bot_user_99)',
    ipAddress: '102.89.22.45',
    timestamp: '2026-08-14 17:30:00'
  }
];

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Immutable Admin Audit Logs</h1>
        <p className="text-slate-400 text-sm mt-1">Complete security audit trail of all sensitive administrative actions (Phases Q & 39).</p>
      </div>

      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Admin Email</th>
                <th className="px-6 py-4">Action Type</th>
                <th className="px-6 py-4">Target Resource</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {DEMO_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-purple-400">{log.adminEmail}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-[11px] font-bold text-white border border-slate-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-200">{log.targetResource}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-400">{log.ipAddress}</td>
                  <td className="px-6 py-4 text-right font-mono text-[11px] text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
