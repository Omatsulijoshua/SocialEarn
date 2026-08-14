'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Eye, ShieldCheck, Ban } from 'lucide-react';

interface FraudAlertItem {
  id: string;
  userId: string;
  userEmail: string;
  username: string;
  riskScore: number;
  status: 'NORMAL' | 'WATCH' | 'REVIEW' | 'RESTRICTED';
  primarySignal: string;
  occurrences: number;
  detectedAt: string;
}

const DEMO_FRAUD_ALERTS: FraudAlertItem[] = [
  {
    id: 'fe-001',
    userId: 'usr-103',
    userEmail: 'suspicious@example.com',
    username: 'bot_user_99',
    riskScore: 87,
    status: 'REVIEW',
    primarySignal: 'Repeated failed task verification & rapid completion speed',
    occurrences: 14,
    detectedAt: '10 minutes ago'
  },
  {
    id: 'fe-002',
    userId: 'usr-109',
    userEmail: 'device_reuse@example.com',
    username: 'device_cloner',
    riskScore: 74,
    status: 'WATCH',
    primarySignal: 'Suspicious device fingerprint & IP reuse across 5 accounts',
    occurrences: 5,
    detectedAt: '1 hour ago'
  }
];

export default function AdminFraudDashboardPage() {
  const [alerts, setAlerts] = useState<FraudAlertItem[]>(DEMO_FRAUD_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlertItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleAction = (status: 'NORMAL' | 'RESTRICTED') => {
    if (!selectedAlert) return;
    setAlerts(prev => prev.map(a => a.id === selectedAlert.id ? { ...a, status } : a));
    setToastMessage(`Fraud alert updated to ${status}. ${status === 'RESTRICTED' ? 'User restricted from task earnings.' : 'Marked safe.'}`);
    setSelectedAlert(null);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Fraud & Risk Scoring Engine</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time risk scoring, suspicious device/IP detection, and automated anomaly monitoring (Phase L & 27 - 29).</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* FRAUD ALERTS TABLE */}
      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4">Primary Signal</th>
                <th className="px-6 py-4">Occurrences</th>
                <th className="px-6 py-4">Detected</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Investigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {alerts.map((al) => (
                <tr key={al.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">@{al.username}</div>
                    <div className="text-slate-400">{al.userEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md font-black text-xs ${
                      al.riskScore >= 70 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {al.riskScore} / 100
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-200 font-medium max-w-xs truncate">{al.primarySignal}</td>
                  <td className="px-6 py-4 text-white font-bold">{al.occurrences}</td>
                  <td className="px-6 py-4 text-slate-400">{al.detectedAt}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">
                      {al.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedAlert(al)}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/20"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FRAUD EVENT DETAIL MODAL (PHASE 29 MANDATORY REQUIREMENTS) */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="admin-card w-full max-w-lg p-6 rounded-3xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">Fraud Event Analysis</h3>
              <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div><span className="text-slate-400 uppercase font-bold block">User ID / Email:</span> {selectedAlert.userId} ({selectedAlert.userEmail})</div>
              <div>
                <span className="text-slate-400 uppercase font-bold block mb-1">Calculated Risk Score:</span>
                <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 font-black text-sm border border-red-500/30">
                  {selectedAlert.riskScore} / 100 ({selectedAlert.status})
                </span>
              </div>
              <div><span className="text-slate-400 uppercase font-bold block">Detected Anomaly Signal:</span> {selectedAlert.primarySignal}</div>
              <div><span className="text-slate-400 uppercase font-bold block">Signal Occurrences:</span> {selectedAlert.occurrences} times</div>
            </div>

            {/* ACTION BUTTONS (PHASE 29) */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => handleAction('NORMAL')}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Mark Safe
              </button>
              <button
                onClick={() => handleAction('RESTRICTED')}
                className="py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs shadow-md shadow-red-500/20"
              >
                Restrict Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
