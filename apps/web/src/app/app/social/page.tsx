'use client';

import React, { useState } from 'react';
import { Globe, CheckCircle2, Plus, Link2, Unlink } from 'lucide-react';

interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  connectedAt: string;
  status: 'CONNECTED' | 'VERIFICATION_PENDING';
}

const DEMO_CONNECTIONS: ConnectedAccount[] = [
  { id: 'sc-1', platform: 'INSTAGRAM', username: '@joshua_creator', connectedAt: '2026-08-01', status: 'CONNECTED' },
  { id: 'sc-2', platform: 'YOUTUBE', username: 'Joshua Creator Official', connectedAt: '2026-08-05', status: 'CONNECTED' },
  { id: 'sc-3', platform: 'X', username: '@joshua_x', connectedAt: '2026-08-10', status: 'CONNECTED' }
];

export default function SocialAccountsPage() {
  const [connections, setConnections] = useState<ConnectedAccount[]>(DEMO_CONNECTIONS);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleConnect = (platform: string) => {
    const username = prompt(`Enter your ${platform} handle/username:`);
    if (!username) return;

    const newConn: ConnectedAccount = {
      id: `sc-${Date.now()}`,
      platform,
      username: username.startsWith('@') ? username : `@${username}`,
      connectedAt: new Date().toISOString().slice(0, 10),
      status: 'CONNECTED'
    };

    setConnections([...connections, newConn]);
    setToastMessage(`Successfully connected ${platform} account ${newConn.username}!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDisconnect = (id: string) => {
    setConnections(connections.filter(c => c.id !== id));
    setToastMessage('Social account unlinked.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Connected Social Accounts</h1>
        <p className="text-slate-400 text-sm mt-1">Link your social media profiles to enable automatic task verification.</p>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* CONNECTED ACCOUNTS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'FACEBOOK', 'X', 'LINKEDIN', 'TELEGRAM', 'DISCORD', 'PINTEREST'].map((plat) => {
          const conn = connections.find(c => c.platform === plat);
          return (
            <div key={plat} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-sm">{plat}</span>
                </div>
                {conn && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    CONNECTED
                  </span>
                )}
              </div>

              {conn ? (
                <div>
                  <div className="text-sm font-extrabold text-emerald-400">{conn.username}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Linked on {conn.connectedAt}</div>
                </div>
              ) : (
                <div className="text-xs text-slate-400">Not connected yet</div>
              )}

              {conn ? (
                <button
                  onClick={() => handleDisconnect(conn.id)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Unlink className="w-3.5 h-3.5" /> Disconnect
                </button>
              ) : (
                <button
                  onClick={() => handleConnect(plat)}
                  className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Link2 className="w-3.5 h-3.5" /> Connect Account
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
