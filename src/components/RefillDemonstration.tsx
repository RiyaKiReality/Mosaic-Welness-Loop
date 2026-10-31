import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Truck, Gift, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const RefillDemonstration: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  const refillSteps = [
    {
      step: 1,
      title: 'Prep & Clean',
      subtitle: 'Keep your durable pump or roller container',
      description: 'When your Be Bodywise product is finished, unscrew the pump or roller assembly. Give the bottle a quick warm-water rinse and allow it to dry for 15 minutes.',
      tag: 'No special tools required'
    },
    {
      step: 2,
      title: 'Snip & Decant',
      subtitle: 'Cut along the designated spout line',
      description: 'The refill pouch features a corner cutting guide and narrow pour spout. Hold the pouch at a 45-degree angle and gently squeeze the active formula into your empty bottle.',
      tag: 'Zero-spill pour channel'
    },
    {
      step: 3,
      title: 'Lock Dispenser',
      subtitle: 'Screw your original pump back on tight',
      description: 'Tightly refasten the pump dispenser or snap-fit roller housing. Press 2-3 times to prime the pump. Your essential skincare routine is 100% replenished at half the price.',
      tag: 'Same fresh clinical formula'
    },
    {
      step: 4,
      title: 'Doorstep Return',
      subtitle: 'Hand over empties during your next refill drop-off',
      description: 'When our delivery partner arrives with your next refill order, hand over your clean empty Be Bodywise bottles. Once verified at our depot, store credit is added to your Bodywise Back wallet.',
      tag: 'Optional · ₹20-₹40 credit per bottle'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0066cc]">
            Circular Skincare Routine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Refilling & Doorstep Returns Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A frictionless loop designed around your delivery visit. No special drop-off trips. No complex shipping labels.
          </p>
        </div>

        {/* 3-Step High Level Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-[#f8faff] rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#0066cc] text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Shop Your Refill</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose the eco-refill format for your favourite Body Wash, Roll-on, or Sunscreen. Save up to 50% compared to purchasing a new full-packaged bottle.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/60 text-xs text-slate-500 font-medium">
              Available across all core product lines
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f8faff] rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#0066cc] text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Hand Over Empties</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                During checkout, check the optional box if you have empty bottles. Hand them directly to our delivery courier during the exact same doorstep visit.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/60 text-xs text-slate-500 font-medium">
              100% optional: Refills work with or without returns
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f8faff] rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#0066cc] text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Earn Store Credit</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Once received and inspected at our circular hub, ₹20 to ₹40 store credit per eligible bottle is activated in your Bodywise Back wallet for your next purchase.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-200/60 text-xs text-slate-500 font-medium">
              Redeemable directly at checkout
            </div>
          </div>
        </div>

        {/* Interactive Deep-Dive: Visual Refill Tutorial */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Container using actual uploaded images */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/3] bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-center shadow-xs overflow-hidden">
                {activeStepTab === 1 && (
                  <div className="flex items-center justify-center gap-4 h-full">
                    <img
                      src="/assets/aistudio/image_d21ab557.png"
                      alt="1% Salicylic Acid Body Wash empty pump bottle"
                      className="h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs text-slate-500 max-w-[130px]">
                      <div className="font-bold text-slate-900 mb-1">Durable Bottle</div>
                      Rinse original 375ml container and dry. Keep pump intact.
                    </div>
                  </div>
                )}

                {activeStepTab === 2 && (
                  <div className="flex items-center justify-center gap-4 h-full">
                    <img
                      src="/assets/aistudio/salicylic_body_wash_pouch.png"
                      alt="Be Bodywise 1% Salicylic Acid Body Wash Refill Pouch with scissor guide"
                      className="h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs text-slate-500 max-w-[130px]">
                      <div className="font-bold text-[#0066cc] mb-1">Precision Pouch</div>
                      Snip along dotted line to open the pour spout.
                    </div>
                  </div>
                )}

                {activeStepTab === 3 && (
                  <div className="flex items-center justify-center gap-4 h-full">
                    <img
                      src="/assets/aistudio/advanced_hair_growth_serum.png"
                      alt="Be Bodywise Roll-on refill snap and replenish demonstration"
                      className="h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs text-slate-500 max-w-[130px]">
                      <div className="font-bold text-slate-900 mb-1">Ready to Use</div>
                      Snap or screw dispenser firmly. Fully replenished!
                    </div>
                  </div>
                )}

                {activeStepTab === 4 && (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="w-14 h-14 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center mb-3">
                      <Truck className="w-7 h-7" />
                    </div>
                    <div className="font-bold text-slate-900 text-sm">Doorstep Handover</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Give empty bottles to courier during your refill delivery.
                    </div>
                    <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Earn ₹20 - ₹40 credit per bottle
                    </div>
                  </div>
                )}
              </div>

              {/* Step indicator tabs */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => setActiveStepTab(step)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      activeStepTab === step
                        ? 'bg-[#0066cc] text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    Step {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Explanation text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold text-[#0066cc] uppercase tracking-wide">
                Interactive Tutorial · Step {activeStepTab} of 4
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {refillSteps[activeStepTab - 1].title}: {refillSteps[activeStepTab - 1].subtitle}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                {refillSteps[activeStepTab - 1].description}
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>{refillSteps[activeStepTab - 1].tag}</span>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-5 py-2.5 bg-[#0066cc] hover:bg-[#0052a3] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Refill Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className="text-sm font-semibold text-slate-700 hover:text-[#0066cc] cursor-pointer"
                >
                  Check Your Bottle's Value →
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Clear Policy Reassurance Note */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900 font-semibold">Refills work independently:</strong> You do not need an empty bottle ready to order refills. Bottle return is an optional reward perk that lets you turn empty Be Bodywise packaging into store credit when you do have empties.
          </p>
        </div>

      </div>
    </section>
  );
};
