import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RefillDemonstration } from './components/RefillDemonstration';
import { ProductCatalog } from './components/ProductCatalog';
import { BottleReturnCalculator } from './components/BottleReturnCalculator';
import { SustainabilitySection } from './components/SustainabilitySection';
import { AccountDashboard } from './components/AccountDashboard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-[#0066cc]">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <ProductCatalog />
            <RefillDemonstration />
            <BottleReturnCalculator />
            <SustainabilitySection />
          </>
        )}

        {activeTab === 'catalog' && (
          <div className="pt-4">
            <ProductCatalog />
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="pt-4">
            <RefillDemonstration />
            <BottleReturnCalculator />
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="pt-4">
            <BottleReturnCalculator />
            <SustainabilitySection />
          </div>
        )}

        {activeTab === 'sustainability' && (
          <div className="pt-4">
            <SustainabilitySection />
            <RefillDemonstration />
          </div>
        )}

        {activeTab === 'account' && (
          <AccountDashboard />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <CheckoutModal />
      <OrderConfirmationModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
