'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Zap, Coins, Users, 
  ArrowRight, Play, Globe, Lock, ChevronRight, Award, BarChart3
} from 'lucide-react';

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleQuickLogin = (roleEmail: string) => {
    localStorage.setItem('socialearn_token', 'demo-token');
    localStorage.setItem('socialearn_user_email', roleEmail);
    if (roleEmail.includes('admin')) {
      window.location.href = '/admin';
    } else {
      window.location.href = '/app';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-black shadow-lg shadow-emerald-500/20">
              SE
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">SocialEarn</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Engage. Earn. Grow.
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#platforms" className="hover:text-emerald-400 transition-colors">Platforms</a>
            <a href="#rewards" className="hover:text-emerald-400 transition-colors">Earn Rewards</a>
            <a href="#safety" className="hover:text-emerald-400 transition-colors">Safety & Ethics</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>The #1 Verified Social Engagement Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Turn Your Social Activity Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Real Rewards.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Complete verified social tasks across YouTube, Instagram, TikTok, X, and Telegram to earn points. Redeem for cash or launch your own public engagement campaigns.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/app"
              className="px-8 py-4 text-base font-bold rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30 transition-all flex items-center gap-3"
            >
              Browse Public Tasks <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/app/campaigns/create"
              className="px-8 py-4 text-base font-bold rounded-2xl glass-card hover:bg-slate-800/80 text-white transition-all border border-slate-700 flex items-center gap-3"
            >
              Create Campaign
            </Link>
          </div>

          {/* DEMO LIVE PREVIEW STATS */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800">
              <div className="text-3xl font-black text-emerald-400">24,580</div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Points Earned / User</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800">
              <div className="text-3xl font-black text-cyan-400">₦12,500</div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Average Cash Balance</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800">
              <div className="text-3xl font-black text-amber-400">1,842</div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Tasks Completed</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800">
              <div className="text-3xl font-black text-teal-400">100%</div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Verified Rewards</div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section id="platforms" className="py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">Supported Social Platforms</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-80">
            {['Instagram', 'TikTok', 'YouTube', 'Facebook', 'X / Twitter', 'LinkedIn', 'Telegram', 'Discord', 'Custom Link'].map((plat) => (
              <div key={plat} className="glass-card px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 flex items-center gap-2 border border-slate-800">
                <Globe className="w-4 h-4 text-emerald-400" />
                {plat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How SocialEarn Works</h2>
          <p className="mt-4 text-slate-400 text-lg">A simple, transparent process for both task performers and campaign creators.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl relative border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl mb-6 border border-emerald-500/20">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Browse & Perform</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore active tasks filtered by platform. Follow creators, watch video content, or engage with verified campaigns.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl relative border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xl mb-6 border border-teal-500/20">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Automated Verification</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our backend verification engine verifies completed actions and protects against duplicate attempts or refollow exploits.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl relative border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xl mb-6 border border-cyan-500/20">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Redeem or Promote</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Points enter your immutable ledger immediately. Redeem points for cash payouts or spend points to launch your own campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* SAFETY & ETHICS SECTION (PHASE 0 COMPLIANCE) */}
      <section id="safety" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                  <ShieldCheck className="w-4 h-4" /> Built with Integrity & Safety
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Full Transparency & Platform Safety Rules</h3>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  SocialEarn enforces strict anti-fraud safeguards: Admin pre-approves custom external links, immutable ledgers track all point transactions, and watch-time campaigns strictly enforce per-user contribution limits.
                </p>
              </div>
              <Link
                href="/app"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm whitespace-nowrap transition-all shadow-lg shadow-emerald-500/20"
              >
                Launch User Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-800/80 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-extrabold text-black text-sm">SE</div>
            <span className="font-bold text-white">SocialEarn</span>
            <span className="text-xs text-slate-500">© 2026 SocialEarn Marketplace. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/app" className="hover:text-emerald-400">User App</Link>
            <Link href="/admin" className="hover:text-emerald-400">Admin Dashboard</Link>
            <a href="#safety" className="hover:text-emerald-400">Product Rules</a>
          </div>
        </div>
      </footer>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Join SocialEarn'}
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {authMode === 'login' ? 'Sign in to access your dashboard & wallet.' : 'Create an account to start earning points today.'}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={() => handleQuickLogin(email || 'creator@example.com')}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all mt-2"
              >
                {authMode === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}
              </button>

              <div className="pt-4 border-t border-slate-800 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Demo Login Shortcuts:</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleQuickLogin('creator@example.com')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700"
                  >
                    User A (Creator)
                  </button>
                  <button
                    onClick={() => handleQuickLogin('earner@example.com')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 border border-slate-700"
                  >
                    User B (Earner)
                  </button>
                  <button
                    onClick={() => handleQuickLogin('admin@socialearn.app')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 border border-slate-700"
                  >
                    Super Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
