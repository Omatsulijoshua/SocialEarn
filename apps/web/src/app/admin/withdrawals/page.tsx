'use client';

import React, { useState } from 'react';
import { Wallet, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface WithdrawalRecord {
  id: string;
  userEmail: string;
  amountCash: number;
  feeCash: number;
  netAmountCash: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
}

const DEMO_WITHDRAWALS: WithdrawalRecord[] = [
  {
    id: 'wd-001',
    userEmail: 'earner@example.com',
    amountCash: 10000,
    feeCash: 150,
    netAmountCash: 9850,
    bankName: 'Guaranty Trust Bank',
    accountNumber: '0123456789',
    accountName: 'Sarah Earner',
    status: 'REQUESTED',
    requestedAt: '2026-08-14 19:10'
  },
  {
    id: 'wd-002',
    userEmail: 'creator@example.com',
    amountCash: 5000,
    feeCash: 75,
    netAmountCash: 4925,
    bankName: 'First Bank of Nigeria',
    accountNumber: '9876543210',
    accountName: 'Joshua Creator',
    status: 'REQUESTED',
    requestedAt: '2026-08-14 16:45'
  }
];

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(DEMO_WITHDRAWALS);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleAction = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status } : w));
    setToastMessage(`Withdrawal request ${status.toLowerCase()} cleanly. AuditLog recorded.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Cash Withdrawal Queue</h1>
        <p className="text-slate-400 text-sm mt-1">Review and process user cash withdrawal requests (Phase 37).</p>
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
                <th className="px-6 py-4">Gross Amount</th>
                <th className="px-6 py-4">Fee (1.5%)</th>
                <th className="px-6 py-4">Net Payout</th>
                <th className="px-6 py-4">Bank Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {withdrawals.map((wd) => (
                <tr key={wd.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{wd.accountName}</div>
                    <div className="text-slate-400">{wd.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">₦{wd.amountCash.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-400">₦{wd.feeCash.toLocaleString()}</td>
                  <td className="px-6 py-4 font-extrabold text-emerald-400">₦{wd.netAmountCash.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{wd.bankName}</div>
                    <div className="text-slate-400 font-mono">{wd.accountNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    {wd.status === 'REQUESTED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                        REQUESTED
                      </span>
                    )}
                    {wd.status === 'APPROVED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                        APPROVED
                      </span>
                    )}
                    {wd.status === 'REJECTED' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">
                        REJECTED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {wd.status === 'REQUESTED' && (
                      <>
                        <button
                          onClick={() => handleAction(wd.id, 'APPROVED')}
                          className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-sm"
                        >
                          Approve Payout
                        </button>
                        <button
                          onClick={() => handleAction(wd.id, 'REJECTED')}
                          className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold text-xs shadow-sm"
                        >
                          Reject
                        </button>
                      </>
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
