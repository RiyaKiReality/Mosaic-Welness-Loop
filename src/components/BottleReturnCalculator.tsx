import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMPTY_BOTTLE_CATALOGUE } from '../data/mockData';
import { RotateCcw, Calculator, CheckCircle2, ShieldAlert, ShoppingBag, ArrowRight, Info } from 'lucide-react';

export const BottleReturnCalculator: React.FC = () => {
  const {
    returnItems,
    setReturnBottleQuantity,
    setIsReturnOptedIn,
    setIsCartOpen,
    setActiveTab,
    showToast
  } = useApp();

  const [selectedBottleId, setSelectedBottleId] = useState<string>(EMPTY_BOTTLE_CATALOGUE[0].id);
  const [calculatorQuantity, setCalculatorQuantity] = useState<number>(2);

  const selectedBottle =
    EMPTY_BOTTLE_CATALOGUE.find((b) => b.id === selectedBottleId) || EMPTY_BOTTLE_CATALOGUE[0];

  const calculatedCredit = selectedBottle.rewardAmount * calculatorQuantity;

  const handleApplyToCart = () => {
    setIsReturnOptedIn(true);
    setReturnBottleQuantity(selectedBottle.id, calculatorQuantity);
    showToast(`Added ${calculatorQuantity}x ${selectedBottle.name} to return list!`);
    setIsCartOpen(true);
  };

  return (
    <section id="rewards" className="py-16 sm:py-24 bg-[#f8faff] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0066cc]">
            <span>Bodywise Back</span>
            <span aria-hidden="true">·</span>
            <span>Packaging Return Rewards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Refill. Return. Get Rewarded.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Turn your finished Be Bodywise bottles into spendable store credit. We collect them right at your doorstep during your refill drop-off.
          </p>
        </div>

        {/* 2-Column Split: Interactive Calculator Left, Eligibility & Trust Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Interactive "Check Your Bottle's Value" Module */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                <Calculator className="w-5 h-5 text-[#0066cc]" />
                <span>Check Your Bottle's Value</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Live Dynamic Estimator
              </span>
            </div>

            {/* Bottle Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                1. Select Bottle or Packaging Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EMPTY_BOTTLE_CATALOGUE.map((bottle) => (
                  <button
                    key={bottle.id}
                    onClick={() => setSelectedBottleId(bottle.id)}
                    className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-3 ${
                      selectedBottleId === bottle.id
                        ? 'border-[#0066cc] bg-blue-50/60 ring-1 ring-[#0066cc]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 p-1 flex items-center justify-center shrink-0 border border-slate-100">
                      <img
                        src={bottle.image}
                        alt={bottle.name}
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-slate-900 truncate">{bottle.name}</div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                        <span>{bottle.volume}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#0066cc] tabular-nums">₹{bottle.rewardAmount} credit</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-600">
                  2. Number of Empty Bottles to Hand Over:
                </label>
                <span className="text-slate-400">Max 8 per delivery</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg p-1">
                  <button
                    onClick={() => setCalculatorQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-extrabold text-slate-900 text-base tabular-nums">
                    {calculatorQuantity}
                  </span>
                  <button
                    onClick={() => setCalculatorQuantity((q) => Math.min(8, q + 1))}
                    className="w-9 h-9 rounded text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-slate-500">
                  {calculatorQuantity === 1 ? 'bottle selected' : 'bottles selected'} (₹{selectedBottle.rewardAmount} each)
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="p-5 bg-gradient-to-r from-blue-50 to-[#f0f7ff] rounded-xl border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Estimated Bodywise Back Credit
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0066cc] tabular-nums">
                    ₹{calculatedCredit}
                  </span>
                  <span className="text-xs text-slate-600">
                    for {calculatorQuantity} empty {calculatorQuantity === 1 ? 'container' : 'containers'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  *Credit activated after physical inspection at delivery hub.
                </div>
              </div>

              {/* Action: Add this return directly to current cart */}
              <button
                onClick={handleApplyToCart}
                className="px-5 py-3 text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Return Order</span>
              </button>
            </div>

          </div>

          {/* Column 2: Eligibility Rules & Verification Standards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Eligibility Requirements Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0066cc]" />
                <span>Empty Bottle Eligibility Standards</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-slate-900">Be Bodywise Containers Only:</strong> We accept authentic Be Bodywise pump bottles, roll-on containers, shampoo bottles, and glass serum droppers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-slate-900">Complete Components:</strong> Bottles must include their respective pump dispensers, roller-balls, dropper assemblies, or caps.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-slate-900">Rinsed & Empty:</strong> Containers should be completely empty and given a basic warm-water rinse to maintain hygiene.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-slate-900">Order Quantity Limit:</strong> To ensure courier capacity, customers can return up to 8 bottles per delivery order.
                  </span>
                </li>
              </ul>
            </div>

            {/* Estimated vs Confirmed Credit Explanation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#0066cc]" />
                <span>Estimated vs. Confirmed Credit</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The ₹ amount shown in your cart is an <strong className="text-slate-800">estimated reward</strong>. Because empty bottles are collected by third-party delivery couriers, final store credit is officially confirmed and deposited to your wallet within 24 to 48 hours after our warehouse team verifies container condition.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#0066cc] flex items-center gap-1">
                <span>View your returns anytime in My Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
