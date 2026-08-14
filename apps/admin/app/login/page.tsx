'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@socialearn.app');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (twoFactorCode && twoFactorCode !== '123456') {
        setErrorMessage('Invalid 2FA Authenticator Token. Try 123456');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('socialearn_admin_token', 'admin-token-authenticated');
      localStorage.setItem('socialearn_admin_role', 'SUPER_ADMIN');
      window.location.href = '/';
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d16] p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="admin-card w-full max-w-md p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">SocialEarn Admin</h2>
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Operations Console Login</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Master Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">2FA Authenticator Token</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="6-digit 2FA code (e.g. 123456)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono tracking-widest focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? 'Authenticating Admin Session...' : 'Authenticate & Access Console'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">RBAC Demo Fast Logins:</p>
          <div className="flex flex-wrap justify-center gap-1.5 text-[11px]">
            <button onClick={() => { localStorage.setItem('socialearn_admin_role', 'SUPER_ADMIN'); window.location.href = '/'; }} className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">Super Admin</button>
            <button onClick={() => { localStorage.setItem('socialearn_admin_role', 'FINANCE'); window.location.href = '/withdrawals'; }} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">Finance Admin</button>
            <button onClick={() => { localStorage.setItem('socialearn_admin_role', 'MODERATOR'); window.location.href = '/reviews/external-links'; }} className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">Moderator</button>
            <button onClick={() => { localStorage.setItem('socialearn_admin_role', 'FRAUD_ANALYST'); window.location.href = '/fraud'; }} className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">Fraud Analyst</button>
          </div>
        </div>
      </div>
    </div>
  );
}
