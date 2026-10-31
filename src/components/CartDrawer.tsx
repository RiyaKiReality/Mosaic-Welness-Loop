import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMPTY_BOTTLE_CATALOGUE } from '../data/mockData';
import {
  X,
  Trash2,
  Plus,
  Minus,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    isReturnOptedIn,
    setIsReturnOptedIn,
    returnItems,
    setReturnBottleQuantity,
    estimatedReturnReward,
    totalReturnBottlesCount,
    setIsCheckoutOpen,
    setActiveTab,
    walletBalance
  } = useApp();

  const [returnsExpanded, setReturnsExpanded] = useState<boolean>(true);

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const deliveryFee = cartSubtotal >= 399 ? 0 : 49;
  const isFreeDeliveryQualified = cartSubtotal >= 399;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0066cc]" />
            <h2 className="text-lg font-bold text-slate-900">Your Refill Cart</h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full tabular-nums">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Cart Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {/* Free Shipping Banner */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs">
            {isFreeDeliveryQualified ? (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You qualify for FREE doorstep delivery & empty bottle pickup!</span>
              </div>
            ) : (
              <div className="text-slate-600">
                Add <span className="font-bold text-[#0066cc] tabular-nums">₹{399 - cartSubtotal}</span> more for Free Delivery (otherwise ₹49 flat).
              </div>
            )}
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-800">Your cart is empty</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our refill catalog to save up to 50% on your favourite Be Bodywise essentials.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('catalog');
                }}
                className="mt-2 px-4 py-2 text-xs font-bold text-white bg-[#0066cc] rounded-lg cursor-pointer"
              >
                Browse Refill Products
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.refillOptionId}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3"
                >
                  <div className="w-14 h-14 bg-white rounded-lg p-1 border border-slate-200 flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.productName}
                    </h4>
                    <div className="text-[11px] text-slate-500">
                      {item.refillFormat.toLowerCase().includes(item.refillSize.toLowerCase().replace(' ', ''))
                        ? item.refillFormat
                        : `${item.refillSize} (${item.refillFormat})`}
                    </div>
                    <div className="text-xs font-extrabold text-[#0066cc] mt-1 tabular-nums">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => updateCartQuantity(item.refillOptionId, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.refillOptionId, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.refillOptionId)}
                      className="p-1 text-slate-400 hover:text-rose-600 ml-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ======================================================== */}
          {/* THE CORE BUSINESS FEATURE: OPTIONAL BOTTLE RETURN ADD-ON */}
          {/* ======================================================== */}
          <div className="border border-blue-200 rounded-xl bg-[#f8faff] overflow-hidden shadow-xs">
            {/* Header / Toggle */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-white flex items-start gap-3 border-b border-blue-100">
              <input
                type="checkbox"
                id="cart-return-opt-in"
                checked={isReturnOptedIn}
                onChange={(e) => setIsReturnOptedIn(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#0066cc] rounded border-slate-300 focus:ring-[#0066cc] cursor-pointer"
              />
              <div className="flex-1">
                <label
                  htmlFor="cart-return-opt-in"
                  className="text-xs font-bold text-slate-900 cursor-pointer block leading-snug"
                >
                  Have empty Be Bodywise bottles? Return them with this delivery and earn store credit.
                </label>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                  <span className="text-emerald-700 font-semibold">100% Optional</span>
                  <span aria-hidden="true">·</span>
                  <span>Hand over to courier at your door</span>
                </div>
              </div>
            </div>

            {/* Expanded Return Product Selector */}
            {isReturnOptedIn && (
              <div className="p-4 space-y-4 text-xs animate-in fade-in">
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Select your empty bottles:</span>
                  <span className="text-slate-400">Max 8 per order</span>
                </div>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {EMPTY_BOTTLE_CATALOGUE.map((bottle) => {
                    const currentSelected =
                      returnItems.find((b) => b.id === bottle.id)?.quantity || 0;

                    return (
                      <div
                        key={bottle.id}
                        className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-900 truncate">
                            {bottle.name}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <span>₹{bottle.rewardAmount} credit/bottle</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() =>
                              setReturnBottleQuantity(bottle.id, Math.max(0, currentSelected - 1))
                            }
                            className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-bold text-slate-900 tabular-nums">
                            {currentSelected}
                          </span>
                          <button
                            onClick={() =>
                              setReturnBottleQuantity(bottle.id, Math.min(8, currentSelected + 1))
                            }
                            className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Return Estimate Summary */}
                <div className="p-3 bg-white rounded-lg border border-blue-200/80 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Estimated Store Credit:</span>
                    </span>
                    <span className="text-base text-[#0066cc] tabular-nums">
                      +₹{estimatedReturnReward}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-normal">
                    {totalReturnBottlesCount > 0 ? (
                      <span>
                        {totalReturnBottlesCount} bottle(s) selected for collection. Final credit is added to your account after verification at our hub.
                      </span>
                    ) : (
                      <span className="text-amber-700">
                        Please select at least 1 bottle above to schedule pickup.
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  Note: Values are illustrative demo rewards. Actual credit is issued after receipt and inspection, and applied to a future purchase.
                </div>
              </div>
            )}
          </div>

          {/* Existing Store Credit Notice */}
          {walletBalance > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-600">Available Wallet Balance:</span>
              <span className="font-bold text-[#0066cc] tabular-nums">₹{walletBalance}</span>
            </div>
          )}

        </div>

        {/* Footer / Summary / Checkout Button */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Refill Subtotal:</span>
              <span className="font-bold text-slate-900 tabular-nums">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span className="tabular-nums font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>
            {isReturnOptedIn && estimatedReturnReward > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-slate-100">
                <span>Est. Future Store Credit (Return):</span>
                <span className="tabular-nums">+₹{estimatedReturnReward}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Today's Payable:</span>
              <span className="text-base text-[#0066cc] tabular-nums">
                ₹{cartSubtotal > 0 ? cartSubtotal + deliveryFee : 0}
              </span>
            </div>
          </div>

          <button
            onClick={handleProceedToCheckout}
            disabled={cart.length === 0}
            className={`w-full py-3.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
              cart.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#0066cc] hover:bg-[#0052a3] text-white'
            }`}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
