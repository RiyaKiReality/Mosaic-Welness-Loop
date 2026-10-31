import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, User, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    totalCartItemCount,
    cartSubtotal,
    setIsCartOpen,
    walletBalance
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Slim Promotional Notification (<=40px) */}
      <div className="bg-[#0052a3] text-white text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span>Same Effect, Half the Spend: Refill & return your empty bottles for instant store credit</span>
        <button
          onClick={() => handleNavClick('rewards')}
          className="underline decoration-white/70 hover:decoration-white inline-flex items-center gap-1 font-semibold text-xs ml-1 cursor-pointer"
        >
          Explore Bodywise Back <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Top Bar - Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left whitespace-nowrap shrink-0 group cursor-pointer focus-visible:outline-none"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-medium text-slate-500 tracking-wider lowercase">be</span>
            <span className="text-2xl font-bold tracking-tight text-[#0066cc]">Bodywise</span>
            <span className="text-[10px] font-semibold text-[#0066cc] uppercase tracking-widest ml-1 border-l border-slate-300 pl-1.5 hidden sm:inline">Refills</span>
          </div>
        </button>

        {/* Zone 2: 5 Concise Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#0066cc] cursor-pointer py-1 ${
              activeTab === 'home' ? 'text-[#0066cc] font-semibold border-b-2 border-[#0066cc]' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#0066cc] cursor-pointer py-1 ${
              activeTab === 'catalog' ? 'text-[#0066cc] font-semibold border-b-2 border-[#0066cc]' : ''
            }`}
          >
            Shop Refills
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#0066cc] cursor-pointer py-1 ${
              activeTab === 'how-it-works' ? 'text-[#0066cc] font-semibold border-b-2 border-[#0066cc]' : ''
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('rewards')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#0066cc] cursor-pointer py-1 ${
              activeTab === 'rewards' ? 'text-[#0066cc] font-semibold border-b-2 border-[#0066cc]' : ''
            }`}
          >
            Bottle Return Rewards
          </button>
          <button
            onClick={() => handleNavClick('sustainability')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#0066cc] cursor-pointer py-1 ${
              activeTab === 'sustainability' ? 'text-[#0066cc] font-semibold border-b-2 border-[#0066cc]' : ''
            }`}
          >
            Why Refill
          </button>
          <button
            onClick={() => handleNavClick('account')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#0066cc] cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === 'account' ? 'text-[#0066cc] font-semibold border-b-2 border-[#0066cc]' : ''
            }`}
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>My Account</span>
            {walletBalance > 0 && (
              <span className="text-xs font-semibold text-[#0066cc] bg-blue-50 px-1.5 py-0.5 rounded tabular-nums">
                ₹{walletBalance}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Cart + Mobile Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Cart"
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white bg-[#0066cc] hover:bg-[#0052a3] active:bg-[#004080] transition-colors rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Cart</span>
            {totalCartItemCount > 0 ? (
              <span className="bg-white text-[#0066cc] text-xs font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {totalCartItemCount}
              </span>
            ) : null}
            {cartSubtotal > 0 && (
              <span className="text-xs font-medium text-blue-100 border-l border-blue-400 pl-2 tabular-nums hidden lg:inline">
                ₹{cartSubtotal}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
              activeTab === 'home' ? 'bg-blue-50 text-[#0066cc]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
              activeTab === 'catalog' ? 'bg-blue-50 text-[#0066cc]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Shop Refills
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
              activeTab === 'how-it-works' ? 'bg-blue-50 text-[#0066cc]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('rewards')}
            className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
              activeTab === 'rewards' ? 'bg-blue-50 text-[#0066cc]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Bottle Return Rewards (Bodywise Back)
          </button>
          <button
            onClick={() => handleNavClick('sustainability')}
            className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
              activeTab === 'sustainability' ? 'bg-blue-50 text-[#0066cc]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Why Refill (Savings & Impact)
          </button>
          <button
            onClick={() => handleNavClick('account')}
            className={`flex items-center justify-between w-full text-left px-3 py-2 text-base font-medium rounded-md ${
              activeTab === 'account' ? 'bg-blue-50 text-[#0066cc]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <span>My Account</span>
            </span>
            {walletBalance > 0 && (
              <span className="text-xs font-semibold text-[#0066cc] bg-blue-100 px-2 py-0.5 rounded tabular-nums">
                ₹{walletBalance} credit
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
