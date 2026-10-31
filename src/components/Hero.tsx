import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, RotateCcw, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedProductModal, products } = useApp();

  const handleShopRefills = () => {
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHowItWorks = () => {
    setActiveTab('how-it-works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bodyWashProduct = products.find(p => p.id === 'salicylic-acid-body-wash');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7ff] via-white to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Micro-Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0066cc]">
              <span>Circular Skincare</span>
              <span aria-hidden="true">·</span>
              <span>Refill & Return Programme</span>
              <span aria-hidden="true">·</span>
              <span>Bodywise Back</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              Same Effect, <br />
              <span className="text-[#0066cc]">Half the Spend.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              Refill your essentials, return your empties with your delivery, and earn store credit for every eligible bottle returned.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleShopRefills}
                className="px-6 py-3.5 text-base font-semibold text-white bg-[#0066cc] hover:bg-[#0052a3] active:bg-[#003d7a] rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Refills</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleHowItWorks}
                className="px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#0066cc]" />
                <span>How Bottle Returns Work</span>
              </button>
            </div>

            {/* Value Highlights (Clean, Unboxed Metadata) */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Up to 50% Savings</div>
                  <div className="text-xs text-slate-500">Pay for actives, not new rigid bottles</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Doorstep Handover</div>
                  <div className="text-xs text-slate-500">Give empties to the courier when refill arrives</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Earn ₹20 - ₹40 / Bottle</div>
                  <div className="text-xs text-slate-500">Credited to Bodywise Back wallet</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Refill Hero Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
              {/* Subtle top banner strip */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs text-slate-500 font-medium">
                <span className="text-[#0066cc] font-semibold">Refill Companion Showcase</span>
                <span>Authentic Packaging Spec</span>
              </div>

              {/* Side-by-Side Visual: Bottle and Refill Pouch */}
              <div className="grid grid-cols-2 gap-4 items-center bg-[#f7faff] rounded-xl p-4 border border-blue-100/60">
                {/* 1. Original Packaging */}
                <div className="text-center space-y-2">
                  <div className="relative aspect-[3/4] bg-white rounded-lg p-2 border border-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/aistudio/image_d21ab557.png"
                      alt="Be Bodywise 1% Salicylic Acid Body Wash 375ml Original Bottle"
                      className="h-full w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-left px-1">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Your Bottle</div>
                    <div className="text-xs font-bold text-slate-900 truncate">1% Salicylic Body Wash</div>
                    <div className="text-xs text-slate-500 tabular-nums">Keep & reuse dispenser</div>
                  </div>
                </div>

                {/* 2. Refill Pouch */}
                <div className="text-center space-y-2">
                  <div className="relative aspect-[3/4] bg-white rounded-lg p-2 border border-blue-200 flex items-center justify-center overflow-hidden shadow-xs">
                    <img
                      src="/assets/aistudio/salicylic_body_wash_pouch.png"
                      alt="Be Bodywise 1% Salicylic Acid Body Wash Refill Pouch Packaging"
                      className="h-full w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-[#0066cc] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      SAVE 45%
                    </div>
                  </div>
                  <div className="text-left px-1">
                    <div className="text-[11px] uppercase tracking-wider text-[#0066cc] font-bold">The Refill Pouch</div>
                    <div className="text-xs font-bold text-slate-900 truncate">Eco-Pouch Refill</div>
                    <div className="text-xs text-emerald-700 font-medium tabular-nums">₹299 vs ₹549 original</div>
                  </div>
                </div>
              </div>

              {/* Interactive Transfer Step Snapshot */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-900">Return this bottle:</span> Earn ₹40 store credit
                </div>
                {bodyWashProduct && (
                  <button
                    onClick={() => setSelectedProductModal(bodyWashProduct)}
                    className="text-[#0066cc] font-semibold hover:underline cursor-pointer"
                  >
                    View Refill Guide →
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
