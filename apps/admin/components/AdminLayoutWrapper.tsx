'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, LayoutDashboard, Users, Megaphone, CheckSquare, 
  ExternalLink, Coins, Wallet, ShieldAlert, Flag, Bell, UserCheck, 
  History, Settings, Search, Menu, X, ChevronDown, ChevronRight, LogOut, Lock
} from 'lucide-react';

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('SUPER_ADMIN');

  useEffect(() => {
    const role = localStorage.getItem('socialearn_admin_role') || 'SUPER_ADMIN';
    setActiveRole(role);
  }, []);

  if (pathname === '/login') {
    return <>{children}</>;
  }

  const navGroups = [
    {
      title: 'CORE PLATFORM',
      items: [
        { label: 'Dashboard Home', href: '/', icon: LayoutDashboard },
        { label: 'User Governance', href: '/users', icon: Users },
        { label: 'Campaign Manager', href: '/campaigns', icon: Megaphone }
      ]
    },
    {
      title: 'MODERATION & QUEUES',
      items: [
        { label: 'External Link Reviews', href: '/reviews/external-links', icon: ExternalLink, badge: '12' },
        { label: 'Task Verifications', href: '/tasks/verification', icon: CheckSquare },
        { label: 'User Disputes', href: '/disputes', icon: Flag, badge: '5' }
      ]
    },
    {
      title: 'FINANCIAL & REWARDS',
      items: [
        { label: 'Reward & Watch Settings', href: '/rewards', icon: Coins },
        { label: 'Points Economy Ledger', href: '/economy', icon: History },
        { label: 'Cash Payments', href: '/payments', icon: Wallet },
        { label: 'Withdrawal Approvals', href: '/withdrawals', icon: Wallet, badge: '8' }
      ]
    },
    {
      title: 'SECURITY & RISK',
      items: [
        { label: 'Fraud & Risk Engine', href: '/fraud', icon: ShieldAlert, badge: '3' },
        { label: 'Platform & Action Toggles', href: '/platforms', icon: Settings },
        { label: 'Admin Audit Logs', href: '/audit-logs', icon: History }
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Manage Admins & RBAC', href: '/admins', icon: UserCheck },
        { label: 'System Settings', href: '/settings', icon: Settings }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-slate-100">
      {/* ENTERPRISE DARK SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#090d16] border-r border-slate-800 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}>
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-600/30">
              SE
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">SocialEarn</span>
              <span className="block text-[10px] font-extrabold text-purple-400 uppercase tracking-widest">Admin Console</span>
            </div>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ROLE INDICATOR BADGE */}
        <div className="px-6 py-3 bg-purple-950/40 border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px] font-extrabold text-purple-300 uppercase tracking-wider">{activeRole}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* NAV SECTIONS */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30 font-bold shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black border border-purple-500/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-red-500/20 text-xs font-bold text-slate-300 hover:text-red-400 border border-slate-800 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Admin Logout</span>
          </Link>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-20 bg-[#090d16]/90 sticky top-0 z-30 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>

            {/* GLOBAL SEARCH (PHASE 43 MANDATORY REQUIREMENT) */}
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Global Admin Search (Users, Campaigns, URLs, Transactions)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* REAL-TIME NOTIFICATIONS & PROFILE */}
          <div className="flex items-center gap-4">
            <Link href="/reviews/external-links" className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#090d16]">
                12
              </span>
            </Link>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                AD
              </div>
              <div className="hidden lg:block">
                <div className="text-xs font-bold text-white">Platform Super Admin</div>
                <div className="text-[10px] text-slate-400">admin@socialearn.app</div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
