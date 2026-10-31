import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, RotateCcw, Truck, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      {/* 4 Trust Highlights Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#38b0f7] shrink-0" />
            <span>Refill & Save Up to 50%</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#38b0f7] shrink-0" />
            <span>Free Delivery Above ₹399</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#38b0f7] shrink-0" />
            <span>Dermatologically Verified</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Leaf className="w-4 h-4 text-[#38b0f7] shrink-0" />
            <span>Bodywise Back Bottle Credit</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-medium text-slate-400 lowercase">be</span>
              <span className="text-2xl font-bold tracking-tight text-white">Bodywise</span>
              <span className="text-[10px] font-semibold text-[#38b0f7] uppercase tracking-widest ml-1 border-l border-slate-700 pl-1.5">Refill Commerce</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Same Effect, Half the Spend. Refill your essentials, return your empties with your delivery, and earn store credit for every eligible bottle returned.
            </p>
            <div className="text-[11px] text-slate-400">
              Customer Support: care@bebodywise.com · Mon–Sat 9:00 AM – 6:00 PM IST
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Refill & Rewards
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Refill Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How Bottle Returns Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('rewards')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bottle Value Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('sustainability')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Price & Material Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Account & Policies */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Customer Account & Prototype Notice
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This application is an interactive commerce prototype designed to evaluate the circular refill-and-return model for Be Bodywise. All orders and doorstep collections are simulated with persistent local storage.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNav('account')}
                className="text-xs font-semibold text-[#38b0f7] hover:underline cursor-pointer"
              >
                Access My Account & Wallet →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Be Bodywise Circular Refills Prototype. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Packaging Return Guidelines</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
