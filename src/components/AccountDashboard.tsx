import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReturnVerificationStatus, Order } from '../types';
import {
  Wallet,
  RotateCcw,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AccountDashboard: React.FC = () => {
  const {
    walletBalance,
    walletTransactions,
    orders,
    simulateOrderVerification,
    setActiveTab,
    setIsCartOpen
  } = useApp();

  const [activeAccountTab, setActiveAccountTab] = useState<'orders' | 'wallet' | 'returns' | 'rules'>('orders');

  const totalEarned = walletTransactions
    .filter((tx) => tx.type === 'EARNED' || tx.type === 'PROMOTIONAL')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalRedeemed = walletTransactions
    .filter((tx) => tx.type === 'REDEEMED')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const getStatusColor = (status: ReturnVerificationStatus) => {
    switch (status) {
      case 'Return Expected':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Empties Collected':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Under Verification':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Credit Issued':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Account Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0066cc]">
              Demo Customer Account
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome back, Riya
            </h1>
            <p className="text-xs text-slate-500">
              riya@example.com · +91 98765 43210 · Indiranagar, Bengaluru
            </p>
          </div>

          {/* Quick Wallet Metric Card */}
          <div className="bg-[#f8faff] rounded-xl border border-blue-200 p-4 sm:px-6 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">Bodywise Back Credit</div>
              <div className="text-2xl font-extrabold text-[#0066cc] tabular-nums">
                ₹{walletBalance}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                Active & spendable on next refill
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
          {[
            { id: 'orders', label: 'Order History & Returns', count: orders.length },
            { id: 'wallet', label: 'Store Credit Wallet', count: null },
            { id: 'rules', label: 'Programme Rules & Limits', count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAccountTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeAccountTab === tab.id
                  ? 'border-[#0066cc] text-[#0066cc]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full tabular-nums">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: ORDER HISTORY & BOTTLE RETURN STATUS VERIFICATION */}
        {/* ======================================================== */}
        {activeAccountTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Refill Orders & Doorstep Returns</h2>
                <p className="text-xs text-slate-500">
                  Track delivery progress, empty bottle collection, and verification status.
                </p>
              </div>

              <button
                onClick={() => { setActiveTab('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shop New Refill</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 space-y-3">
                <Package className="w-10 h-10 text-slate-300 mx-auto" />
                <div className="text-sm font-semibold text-slate-700">No orders placed yet</div>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0066cc] rounded-lg"
                >
                  Start Shopping Refills
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const hasReturns = order.returnedEmpties && order.returnedEmpties.length > 0;
                  const canSimulate = hasReturns && order.returnStatus !== 'Credit Issued';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5"
                    >
                      {/* Order Title Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              Order #{order.id}
                            </span>
                            <span className="text-xs text-slate-400">· {order.date}</span>
                          </div>
                          <div className="text-xs text-slate-500">
                            Slot: {order.deliverySlot}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xs text-slate-500">Amount Paid</div>
                            <div className="text-sm font-extrabold text-slate-900 tabular-nums">
                              ₹{order.totalPayable}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Refill Items */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Refill Products Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, i) => (
                              <div
                                key={i}
                                className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between text-xs"
                              >
                                <div>
                                  <div className="font-semibold text-slate-800">{item.productName}</div>
                                  <div className="text-[11px] text-slate-500">
                                    {item.quantity} × {item.refillFormat.toLowerCase().includes(item.refillSize.toLowerCase().replace(' ', '')) ? item.refillFormat : `${item.refillSize} (${item.refillFormat})`}
                                  </div>
                                </div>
                                <span className="font-bold text-slate-700 tabular-nums">
                                  ₹{item.price * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Return Package Status Pipeline */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                            <span>Empty Bottle Return Status</span>
                            {hasReturns && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(order.returnStatus)}`}>
                                {order.returnStatus}
                              </span>
                            )}
                          </div>

                          {hasReturns ? (
                            <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100 space-y-3 text-xs">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-600">
                                  {order.returnedEmpties.reduce((s, b) => s + b.quantity, 0)} bottle(s) registered
                                </span>
                                <span className="font-bold text-[#0066cc] tabular-nums">
                                  {order.returnStatus === 'Credit Issued' ? (
                                    <span className="text-emerald-700">₹{order.estimatedReward} Credited</span>
                                  ) : (
                                    `₹${order.estimatedReward} estimated`
                                  )}
                                </span>
                              </div>

                              {/* Interactive Simulation Button for Testers */}
                              {canSimulate && (
                                <div className="pt-2 border-t border-blue-100/70 space-y-1.5">
                                  <button
                                    onClick={() => simulateOrderVerification(order.id)}
                                    className="w-full py-2 px-3 text-xs font-bold bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>
                                      {order.returnStatus === 'Return Expected' && 'Simulate Courier Handover →'}
                                      {order.returnStatus === 'Empties Collected' && 'Simulate Quality Inspection →'}
                                      {order.returnStatus === 'Under Verification' && 'Issue Store Credit to Wallet (₹' + order.estimatedReward + ') →'}
                                    </span>
                                  </button>
                                  <div className="text-[10px] text-slate-500 text-center">
                                    Click above to test advancing verification and releasing store credit!
                                  </div>
                                </div>
                              )}

                              {order.returnStatus === 'Credit Issued' && (
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 pt-1">
                                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                                  <span>Credit verified and deposited to your available balance!</span>
                                </div>
                              )}

                              {/* Status History Logs */}
                              <div className="pt-2 border-t border-blue-100/60 space-y-1.5 text-[11px] text-slate-500">
                                {order.statusHistory.map((h, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="font-semibold text-slate-700">{h.status}:</span>
                                    <span>{h.note} ({h.timestamp})</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-400">
                              No bottle returns were requested with this order.
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: STORE CREDIT WALLET & TRANSACTION HISTORY */}
        {/* ======================================================== */}
        {activeAccountTab === 'wallet' && (
          <div className="space-y-6">
            {/* Wallet Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-medium">Available Store Credit</div>
                <div className="text-3xl font-extrabold text-[#0066cc] tabular-nums">
                  ₹{walletBalance}
                </div>
                <div className="text-[11px] text-slate-400">Ready to redeem at checkout</div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-medium">Lifetime Returns Earned</div>
                <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">
                  ₹{totalEarned}
                </div>
                <div className="text-[11px] text-slate-400">From verified returned empties</div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-medium">Lifetime Redeemed</div>
                <div className="text-3xl font-extrabold text-slate-700 tabular-nums">
                  ₹{totalRedeemed}
                </div>
                <div className="text-[11px] text-slate-400">Applied towards refill purchases</div>
              </div>
            </div>

            {/* Wallet Transactions Ledger */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Credit Transactions Ledger
                </h3>
                <span className="text-xs text-slate-500 tabular-nums">
                  {walletTransactions.length} transactions recorded
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {walletTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-900">{tx.description}</div>
                      <div className="text-[11px] text-slate-400">
                        {tx.date} {tx.orderId && `· Order #${tx.orderId}`}
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-mono font-bold text-sm tabular-nums ${
                          tx.type === 'EARNED' || tx.type === 'PROMOTIONAL'
                            ? 'text-emerald-700'
                            : 'text-slate-800'
                        }`}
                      >
                        {tx.type === 'REDEEMED' ? `-₹${tx.amount}` : `+₹${tx.amount}`}
                      </span>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {tx.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PROGRAMME RULES & CONFIGURABLE LIMITS */}
        {/* ======================================================== */}
        {activeAccountTab === 'rules' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Bodywise Back Policy & Reward Terms
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Transparent operating rules for refill deliveries and packaging returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
                  <span>Redemption Terms</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li><strong>Minimum Redemption:</strong> ₹20 store credit per order.</li>
                  <li><strong>Maximum Credit Limit:</strong> Up to 40% of the total refill order subtotal.</li>
                  <li><strong>Validity:</strong> Store credit remains valid for 180 days from the date of verification.</li>
                  <li><strong>Discount Combinations:</strong> Usable alongside free delivery thresholds.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#0066cc]" />
                  <span>Packaging Acceptance Criteria</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>Accepted packaging: Only authentic Be Bodywise branded containers.</li>
                  <li>Condition: Bottles must be rinsed, clean, and free of foreign fluids.</li>
                  <li>Caps & Dispensers: Pump mechanisms, fine sprayers, and roller caps must be attached.</li>
                  <li>Quantity Cap: Max 8 bottles per delivery address visit.</li>
                </ul>
              </div>
            </div>

            {/* Prototype Disclaimer */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-slate-600 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Prototype Note:</strong> All customer data, wallet balances, and simulated return verifications are stored locally in your browser's <code className="bg-white px-1 py-0.5 rounded border border-blue-200 text-[11px] font-mono">localStorage</code>. Refreshing the browser preserves your balance and history.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
