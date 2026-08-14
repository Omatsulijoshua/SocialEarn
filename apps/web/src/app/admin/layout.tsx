'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, LayoutDashboard, ExternalLink, Users, History, 
  ArrowLeft, Bell, Lock, Menu, X, ShieldAlert, LogOut 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminNav = [
    { label: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'External Link Review', href: '/admin/external-links', icon: ExternalLink, badge: '12' },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Audit Logs & Security', href: '/admin/audit', icon: History }
  ];

  return (
    <div className="min-h-screen flex bg-[#060911] text-slate-100">
      {/* ADMIN SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 glass-panel border-r border-amber-500/20 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}>
        <div className="h-20 px-6 flex items-center justify-between border-b border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-black text-sm shadow-md shadow-amber-500/20">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">SocialEarn</span>
              <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-widest">Admin Control</span>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* BOTTOM USER DASHBOARD RETURN */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/app"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-emerald-400 border border-emerald-500/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to User Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* ADMIN TOP BAR */}
        <header className="h-20 glass-panel sticky top-0 z-30 border-b border-amber-500/20 px-4 sm:px-8 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" /> Admin Security Portal
              </h1>
              <p className="text-xs text-amber-400/80 font-medium">Role: Super Admin (2FA Verified)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-2">
              <Bell className="w-3.5 h-3.5" />
              <span>🔔 12 External campaigns awaiting review</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-black font-extrabold flex items-center justify-center text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
