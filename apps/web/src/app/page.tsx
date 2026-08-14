'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Zap, Coins, Users, 
  ArrowRight, Play, Globe, Lock, ChevronRight, Award, BarChart3, Menu, X
} from 'lucide-react';

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-1.5 sm:gap-2"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#080c14]/95 p-4 space-y-3 text-sm font-semibold text-slate-300">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">How It Works</a>
            <a href="#platforms" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">Platforms</a>
            <a href="#rewards" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">Earn Rewards</a>
            <a href="#safety" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">Safety & Ethics</a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span>The #1 Verified Social Engagement Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Turn Your Social Activity Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Real Rewards.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Complete verified social tasks across YouTube, Instagram, TikTok, X, and Telegram to earn points. Redeem for cash or launch your own public engagement campaigns.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-3"
            >
              Browse Public Tasks <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/app/campaigns/create"
              className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold rounded-2xl glass-card hover:bg-slate-800/80 text-white transition-all border border-slate-700 flex items-center justify-center gap-3"
            >
              Create Campaign
            </Link>
          </div>

          {/* DEMO LIVE PREVIEW STATS */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">150K+</div>
              <div className="text-xs text-slate-400 font-semibold uppercase mt-1">Active Engagers</div>
            </div>
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">8.4M+</div>
              <div className="text-xs text-slate-400 font-semibold uppercase mt-1">Verified Tasks</div>
            </div>
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">₦82.4M</div>
              <div className="text-xs text-slate-400 font-semibold uppercase mt-1">Total Paid Out</div>
            </div>
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs text-slate-400 font-semibold uppercase mt-1">Anti-Bot Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-20 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">How SocialEarn Works</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">A transparent two-sided marketplace designed for creators and task performers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-extrabold text-xl mb-6 border border-emerald-500/20">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Browse & Perform</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose tasks across Instagram, TikTok, YouTube, X, and Telegram. Follow, like, subscribe, or watch videos.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800 relative">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-extrabold text-xl mb-6 border border-teal-500/20">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Verify & Earn</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our automated verification engine validates your action cleanly. Points deposit instantly into your double-entry point ledger.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800 relative">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-extrabold text-xl mb-6 border border-cyan-500/20">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Redeem or Spend</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Redeem accumulated points for direct cash payouts to your bank account, or use earned points to fund your own viral growth campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 sm:py-12 text-slate-400 text-sm">
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
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl relative max-h-[90vh] overflow-y-auto">
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-sm"
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
                <div className="flex flex-wrap justify-center gap-2">
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
