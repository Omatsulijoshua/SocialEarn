'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, CheckSquare, Clock, History, PlusCircle, 
  Megaphone, Wallet, Share2, Bell, User, LogOut, Shield, ChevronRight, Menu, X, Coins
} from 'lucide-react';

export default function UserAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', href: '/app', icon: LayoutDashboard }
      ]
    },
    {
      title: 'TASKS',
      items: [
        { label: 'Available Tasks', href: '/app/tasks', icon: CheckSquare },
        { label: 'My Active Tasks', href: '/app/tasks/active', icon: Clock },
        { label: 'Task History', href: '/app/tasks/history', icon: History }
      ]
    },
    {
      title: 'CAMPAIGNS',
      items: [
        { label: 'Create Campaign', href: '/app/campaigns/create', icon: PlusCircle },
        { label: 'My Campaigns', href: '/app/campaigns/history', icon: Megaphone }
      ]
    },
    {
      title: 'WALLET',
      items: [
        { label: 'Wallet & Ledgers', href: '/app/wallet', icon: Wallet }
      ]
    },
    {
      title: 'COMMUNITY',
      items: [
        { label: 'Referrals & Rewards', href: '/app/referrals', icon: Share2 }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#080c14] text-slate-100">
      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 glass-panel border-r border-slate-800 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}>
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-black text-sm shadow-md shadow-emerald-500/20">
              SE
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">SocialEarn</span>
              <span className="block text-[10px] font-medium text-emerald-400 uppercase tracking-wider">User Dashboard</span>
            </div>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM DASHBOARD SWITCH */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/admin"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-amber-400 border border-amber-500/20 transition-all"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Dashboard</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-20 glass-panel sticky top-0 z-30 border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-white">Good evening, Joshua 👋</h1>
              <p className="text-xs text-slate-400">Welcome back to your SocialEarn workspace</p>
            </div>
          </div>

          {/* BALANCE CHIPS */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>24,580 Points</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
              <span>₦12,500 Cash</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
              JS
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
