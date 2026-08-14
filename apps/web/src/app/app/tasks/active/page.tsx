'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

export default function ActiveTasksPage() {
  const [watchSeconds, setWatchSeconds] = useState<number>(420); // 7 minutes
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying && watchSeconds < 600) { // 10 minutes max (600s)
      interval = setInterval(() => {
        setWatchSeconds(prev => {
          if (prev >= 599) {
            setIsPlaying(false);
            setIsCompleted(true);
            return 600;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, watchSeconds]);

  const minutesWatched = Math.floor(watchSeconds / 60);
  const remainingSeconds = watchSeconds % 60;
  const progressPercent = Math.min(100, Number(((watchSeconds / 600) * 100).toFixed(1)));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Active Tasks</h1>
        <p className="text-slate-400 text-sm mt-1">Ongoing watch-time sessions and active task executions.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
            YOUTUBE WATCH SESSION
          </span>
          <span className="text-emerald-400 font-extrabold text-sm">+220 Points</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">YouTube Watch & Engage</h3>
          <p className="text-xs text-slate-400 mt-1">Required duration: 10 Minutes (600 Seconds)</p>
        </div>

        {/* TIMER DISPLAY */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
          <div className="text-4xl font-black text-white tracking-widest font-mono">
            {String(minutesWatched).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')} / 10:00
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="text-xs text-slate-400 font-medium">Session Progress: {progressPercent}%</div>
        </div>

        {/* WATCH CONTROLS */}
        {!isCompleted ? (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isPlaying ? (
              <><Pause className="w-4 h-4" /> Pause Watch Session</>
            ) : (
              <><Play className="w-4 h-4" /> Resume Watch Session</>
            )}
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-emerald-400 font-bold text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> 10-Minute Watch Limit Complete! Reward Verified (+220 Points).
          </div>
        )}
      </div>
    </div>
  );
}
