'use client';

import React, { useState } from 'react';
import { Share2, Copy, CheckCircle2, Users, Coins } from 'lucide-react';

export default function ReferralsPage() {
  const [copied, setCopied] = useState<boolean>(false);
  const referralLink = 'https://socialearn.app/register?ref=SE-JOSHUA-1234';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Referrals & Community Rewards</h1>
        <p className="text-slate-400 text-sm mt-1">Invite friends to SocialEarn and earn bonus points for every qualified signup.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Referrals</div>
          <div className="text-3xl font-black text-white">12 Users</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Referral Rewards Earned</div>
          <div className="text-3xl font-black text-emerald-400">+1,200 Pts</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Reward Per Signup</div>
          <div className="text-3xl font-black text-cyan-400">100 Pts</div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xl font-extrabold text-white">Your Personal Referral Link</h3>
        <p className="text-xs text-slate-400">Share your link with your network. Points are credited to your point ledger automatically.</p>

        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm"
          />
          <button
            onClick={handleCopy}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center gap-2"
          >
            {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
          </button>
        </div>
      </div>
    </div>
  );
}
