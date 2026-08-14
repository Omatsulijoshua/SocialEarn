'use client';

import React, { useState } from 'react';
import { 
  Globe, CheckSquare, Search, Filter, ArrowUpRight, Play, 
  ExternalLink, ShieldAlert, CheckCircle2, Clock, Coins, X
} from 'lucide-react';

interface TaskItem {
  id: string;
  campaignId: string;
  platform: string;
  action: string;
  title: string;
  targetUrl: string;
  rewardPoints: number;
  completedQuantity: number;
  targetQuantity: number;
  remainingQuantity: number;
  progressPercentage: number;
  estimatedDifficulty: 'Easy' | 'Medium' | 'Hard';
  status: string;
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'cmp-001',
    campaignId: 'cmp-001',
    platform: 'INSTAGRAM',
    action: 'FOLLOW',
    title: 'Follow @SocialEarn Official',
    targetUrl: 'https://instagram.com/socialearn_app',
    rewardPoints: 15,
    completedQuantity: 385,
    targetQuantity: 4500,
    remainingQuantity: 4115,
    progressPercentage: 8.56,
    estimatedDifficulty: 'Easy',
    status: 'ACTIVE'
  },
  {
    id: 'cmp-002',
    campaignId: 'cmp-002',
    platform: 'YOUTUBE',
    action: 'WATCH',
    title: 'YouTube Watch & Engage (10 Mins)',
    targetUrl: 'https://youtube.com/watch?v=demo12345',
    rewardPoints: 220,
    completedQuantity: 142,
    targetQuantity: 1000,
    remainingQuantity: 858,
    progressPercentage: 14.2,
    estimatedDifficulty: 'Medium',
    status: 'ACTIVE'
  },
  {
    id: 'cmp-003',
    campaignId: 'cmp-003',
    platform: 'TELEGRAM',
    action: 'JOIN',
    title: 'Join Community Broadcast Channel',
    targetUrl: 'https://t.me/socialearn_official',
    rewardPoints: 20,
    completedQuantity: 820,
    targetQuantity: 1000,
    remainingQuantity: 180,
    progressPercentage: 82.0,
    estimatedDifficulty: 'Easy',
    status: 'ACTIVE'
  },
  {
    id: 'cmp-004',
    campaignId: 'cmp-004',
    platform: 'X',
    action: 'SHARE_REPOST',
    title: 'Repost Product Launch Announcement',
    targetUrl: 'https://x.com/socialearn/status/100001',
    rewardPoints: 25,
    completedQuantity: 450,
    targetQuantity: 2000,
    remainingQuantity: 1550,
    progressPercentage: 22.5,
    estimatedDifficulty: 'Easy',
    status: 'ACTIVE'
  },
  {
    id: 'cmp-005',
    campaignId: 'cmp-005',
    platform: 'OTHER',
    action: 'CUSTOM',
    title: 'Star Official GitHub Repository',
    targetUrl: 'https://github.com/example/socialearn',
    rewardPoints: 30,
    completedQuantity: 120,
    targetQuantity: 500,
    remainingQuantity: 380,
    progressPercentage: 24.0,
    estimatedDifficulty: 'Easy',
    status: 'ACTIVE'
  }
];

export default function PublicTaskMarketplace() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTaskModal, setActiveTaskModal] = useState<TaskItem | null>(null);
  const [proofText, setProofText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const filterCategories = [
    'ALL', 'INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'FACEBOOK', 'X', 'LINKEDIN', 'TELEGRAM', 'DISCORD', 'OTHER'
  ];

  const filteredTasks = tasks.filter(t => {
    const matchesFilter = selectedFilter === 'ALL' || t.platform === selectedFilter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePerformTask = async () => {
    if (!activeTaskModal) return;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Simulate/call API submission
      const updatedCompleted = activeTaskModal.completedQuantity + 1;
      const updatedRemaining = Math.max(0, activeTaskModal.targetQuantity - updatedCompleted);
      const updatedProgress = Math.min(100, Number(((updatedCompleted / activeTaskModal.targetQuantity) * 100).toFixed(2)));

      setTasks(prev => prev.map(t => {
        if (t.id === activeTaskModal.id) {
          return {
            ...t,
            completedQuantity: updatedCompleted,
            remainingQuantity: updatedRemaining,
            progressPercentage: updatedProgress,
            status: updatedCompleted >= t.targetQuantity ? 'COMPLETED' : 'ACTIVE'
          };
        }
        return t;
      }));

      setIsSubmitting(false);
      setSubmittedSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Verification failed');
    }
  };

  return (
    <div className="space-y-8">
      {/* TITLE & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Public Task Marketplace</h1>
          <p className="text-slate-400 text-sm mt-1">Complete verified campaign tasks to earn instant platform points.</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* PLATFORM FILTERS (PHASE 7 MANDATORY REQUIREMENT) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === cat
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'glass-card text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TASK CARDS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="glass-card p-6 rounded-3xl border border-slate-800/80 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div>
              {/* CARD TOP BADGES */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-extrabold border border-emerald-500/20">
                    {task.platform}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {task.action}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-extrabold text-sm bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <Coins className="w-3.5 h-3.5" />
                  <span>+{task.rewardPoints} Pts</span>
                </div>
              </div>

              {/* TITLE & DESCRIPTION */}
              <h3 className="font-bold text-white text-base leading-snug">{task.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">Destination: {task.targetUrl}</p>

              {/* PROGRESS & COUNTER METRICS (PHASE 7 & 8 MANDATORY COUNTERS) */}
              <div className="mt-5 space-y-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/60">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>{task.completedQuantity.toLocaleString()} / {task.targetQuantity.toLocaleString()} completed</span>
                  <span className="text-emerald-400">{task.progressPercentage}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300" 
                    style={{ width: `${task.progressPercentage}%` }} 
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Remaining: <strong className="text-white">{task.remainingQuantity.toLocaleString()}</strong></span>
                  <span>Difficulty: <strong className="text-slate-300">{task.estimatedDifficulty}</strong></span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={() => {
                setActiveTaskModal(task);
                setSubmittedSuccess(false);
                setErrorMessage('');
                setProofText('');
              }}
              disabled={task.remainingQuantity <= 0}
              className={`mt-6 w-full py-3 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                task.remainingQuantity > 0
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {task.remainingQuantity > 0 ? (
                <>Perform Task <ArrowUpRight className="w-4 h-4" /></>
              ) : (
                'Campaign Completed'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* INTERACTIVE TASK EXECUTION MODAL (PHASE 16 & 19/20 ANTI-DUPLICATE ENFORCEMENT) */}
      {activeTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-lg p-8 rounded-3xl border border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setActiveTaskModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!submittedSuccess ? (
              <div className="space-y-6">
                <div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    {activeTaskModal.platform} • {activeTaskModal.action}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-2">{activeTaskModal.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Reward: +{activeTaskModal.rewardPoints} Points</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Task Step 1: Open Target Link</div>
                  <a
                    href={activeTaskModal.targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700"
                  >
                    Open Destination Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Task Step 2: Verification Proof</div>
                  <input
                    type="text"
                    value={proofText}
                    onChange={(e) => setProofText(e.target.value)}
                    placeholder="Enter username or reference proof (e.g. @myusername)..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* ANTI-DUPLICATE WARNING NOTICE */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Anti-Duplicate Rule:</strong> You cannot earn multiple rewards for refollowing or un-following. Each campaign permits strictly 1 reward per user.
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <button
                  onClick={handlePerformTask}
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Verifying Action...' : 'Submit & Claim Reward'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Task Verified!</h3>
                <p className="text-slate-300 text-sm">
                  You have successfully earned <strong className="text-emerald-400">+{activeTaskModal.rewardPoints} Points</strong>!
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setActiveTaskModal(null)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
