'use client';

import React from 'react';
import { Wallet } from 'lucide-react';

interface PaymentItem {
  id: string;
  userEmail: string;
  campaignTitle: string;
  provider: string;
  amountText: string;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  date: string;
}

const DEMO_PAYMENTS: PaymentItem[] = [
  { id: 'tx-1001', userEmail: 'creator@example.com', campaignTitle: 'Follow @SocialEarn Official', provider: 'Paystack', amountText: '₦45,000 NGN', status: 'PAID', date: '2026-08-12 14:20' },
  { id: 'tx-1002', userEmail: 'john123@example.com', campaignTitle: 'Star GitHub Repo', provider: 'Stripe', amountText: '$25.00 USD', status: 'PAID', date: '2026-08-14 10:15' }
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Cash Payments & Gateway Transactions</h1>
        <p className="text-slate-400 text-sm mt-1">Verified payment provider transactions and webhook logs (Phase J & 25).</p>
      </div>

      <div className="admin-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Campaign</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {DEMO_PAYMENTS.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-white">{p.id}</td>
                  <td className="px-6 py-4 text-purple-400">{p.userEmail}</td>
                  <td className="px-6 py-4 text-slate-200">{p.campaignTitle}</td>
                  <td className="px-6 py-4 font-bold text-slate-300">{p.provider}</td>
                  <td className="px-6 py-4 font-extrabold text-emerald-400">{p.amountText}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 font-mono">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
