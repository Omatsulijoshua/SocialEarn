'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, Megaphone, Coins, Wallet, ShieldAlert, CheckCircle2, 
  ArrowRight, ArrowLeft, ExternalLink, Sparkles
} from 'lucide-react';

export default function CreateCampaignPage() {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [platform, setPlatform] = useState<string>('INSTAGRAM');
  const [action, setAction] = useState<string>('FOLLOW');
  const [targetUrl, setTargetUrl] = useState<string>('https://instagram.com/myaccount');
  const [targetQuantity, setTargetQuantity] = useState<number>(4500);
  const [paymentMethod, setPaymentMethod] = useState<'MONEY' | 'POINTS' | 'MONEY_AND_POINTS'>('POINTS');
  const [customPlatformName, setCustomPlatformName] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false);
  const [requiresReview, setRequiresReview] = useState<boolean>(false);

  // Calculate pricing logic (Phase 10 & 25)
  const rewardPerTask = action === 'WATCH' ? 220 : action === 'COMMENT' ? 25 : 15;
  const totalRewardPoints = targetQuantity * rewardPerTask; // e.g. 4500 * 15 = 67,500 points
  const totalCostMoney = (totalRewardPoints / 1000) * 500; // 67,500 pts = 33,750 NGN

  const handleNext = () => setStep(prev => Math.min(8, prev + 1));
  const handleBack = () => setStep(prev => Math.max(1, prev - 1));

  const handleSubmitCampaign = async () => {
    setIsSubmitting(true);
    try {
      const isCustom = platform === 'OTHER' || !!customPlatformName;
      setRequiresReview(isCustom);
      setIsSubmitting(false);
      setCreationSuccess(true);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Create New Campaign</h1>
        <p className="text-slate-400 text-sm mt-1">Promote your social handles and pay using Cash, Platform Points, or both.</p>
      </div>

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800 text-xs font-bold text-slate-400">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              step === s
                ? 'bg-emerald-500 text-black font-extrabold shadow-md shadow-emerald-500/20'
                : step > s
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* WIZARD CARD */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        {!creationSuccess ? (
          <>
            {/* STEP 1: PLATFORM */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Step 1 — Select Social Platform</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'FACEBOOK', 'X', 'LINKEDIN', 'TELEGRAM', 'DISCORD', 'PINTEREST', 'OTHER'].map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setPlatform(plat)}
                      className={`p-4 rounded-2xl font-bold text-sm text-left transition-all border ${
                        platform === plat
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-sm'
                          : 'glass-card text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
                {platform === 'OTHER' && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Custom Platform Name</label>
                    <input
                      type="text"
                      value={customPlatformName}
                      onChange={(e) => setCustomPlatformName(e.target.value)}
                      placeholder="e.g. GitHub, Substack, Medium..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: ACTION */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Step 2 — Select Required Action</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['FOLLOW', 'LIKE', 'COMMENT', 'SUBSCRIBE', 'SHARE_REPOST', 'JOIN', 'VISIT', 'WATCH', 'CUSTOM'].map((act) => (
                    <button
                      key={act}
                      onClick={() => setAction(act)}
                      className={`p-4 rounded-2xl font-bold text-sm text-left transition-all border ${
                        action === act
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-sm'
                          : 'glass-card text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {act}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: TARGET URL */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Step 3 — Target URL & Instructions</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Target Social Link / URL</label>
                  <input
                    type="url"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Additional Task Instructions (Optional)</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={3}
                    placeholder="Instructions for performers..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: QUANTITY */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Step 4 — Target Quantity</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Target Engagements / Completions</label>
                  <input
                    type="number"
                    value={targetQuantity}
                    onChange={(e) => setTargetQuantity(Number(e.target.value))}
                    min={10}
                    max={100000}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-lg font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: REWARD & COST SUMMARY */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Step 5 — Calculated Campaign Cost</h3>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Reward Per Verified Task:</span>
                    <strong className="text-emerald-400">+{rewardPerTask} Points</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Target Quantity:</span>
                    <strong className="text-white">{targetQuantity.toLocaleString()}</strong>
                  </div>
                  <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-extrabold">
                    <span className="text-slate-200">Total Campaign Price (Points):</span>
                    <span className="text-emerald-400">{totalRewardPoints.toLocaleString()} Points</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Cash Equivalent Price:</span>
                    <span className="text-cyan-400 font-bold">₦{totalCostMoney.toLocaleString()} NGN</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: PAYMENT METHOD (PHASE 25 MANDATORY SPLIT) */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Step 6 — Choose Payment Method</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setPaymentMethod('POINTS')}
                    className={`p-6 rounded-2xl text-left border transition-all ${
                      paymentMethod === 'POINTS'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-sm'
                        : 'glass-card text-slate-300 border-slate-800'
                    }`}
                  >
                    <Coins className="w-6 h-6 text-emerald-400 mb-2" />
                    <div className="font-bold text-base">Pay with Points</div>
                    <div className="text-xs text-slate-400 mt-1">{totalRewardPoints.toLocaleString()} Points</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('MONEY')}
                    className={`p-6 rounded-2xl text-left border transition-all ${
                      paymentMethod === 'MONEY'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-sm'
                        : 'glass-card text-slate-300 border-slate-800'
                    }`}
                  >
                    <Wallet className="w-6 h-6 text-cyan-400 mb-2" />
                    <div className="font-bold text-base">Pay with Money</div>
                    <div className="text-xs text-slate-400 mt-1">₦{totalCostMoney.toLocaleString()} NGN</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('MONEY_AND_POINTS')}
                    className={`p-6 rounded-2xl text-left border transition-all ${
                      paymentMethod === 'MONEY_AND_POINTS'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/40 shadow-sm'
                        : 'glass-card text-slate-300 border-slate-800'
                    }`}
                  >
                    <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
                    <div className="font-bold text-base">Cash + Points Split</div>
                    <div className="text-xs text-slate-400 mt-1">Flexible mixed payment</div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: REVIEW */}
            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Step 7 — Campaign Review</h3>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-sm text-slate-300">
                  <div><span className="text-slate-400">Platform:</span> <strong>{platform}</strong></div>
                  <div><span className="text-slate-400">Action:</span> <strong>{action}</strong></div>
                  <div><span className="text-slate-400">Target Link:</span> <strong>{targetUrl}</strong></div>
                  <div><span className="text-slate-400">Target Quantity:</span> <strong>{targetQuantity.toLocaleString()}</strong></div>
                  <div><span className="text-slate-400">Payment Mode:</span> <strong>{paymentMethod}</strong></div>
                </div>

                {(platform === 'OTHER' || customPlatformName) && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Mandatory Admin Approval (Phase 12):</strong> External/Custom platform campaigns must be reviewed by Admin before appearing in the marketplace.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 8: SUBMIT */}
            {step === 8 && (
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-extrabold text-white">Step 8 — Ready to Publish</h3>
                <p className="text-slate-400 text-sm">Click below to finalize payment and launch your campaign.</p>
                <button
                  onClick={handleSubmitCampaign}
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-all"
                >
                  {isSubmitting ? 'Processing Payment...' : 'Confirm & Launch Campaign'}
                </button>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex justify-between border-t border-slate-800 pt-6">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-5 py-2.5 rounded-xl glass-card text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40"
              >
                Back
              </button>

              {step < 8 && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Continue
                </button>
              )}
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Campaign Created!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              {requiresReview 
                ? 'Your external campaign link has been submitted for Admin Review (External Link Queue).' 
                : 'Your campaign is now ACTIVE and published to the public marketplace.'}
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link href="/app/campaigns/history" className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold text-xs">
                View My Campaigns
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
