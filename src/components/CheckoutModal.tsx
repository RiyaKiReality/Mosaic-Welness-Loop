import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmptyBottleReturnItem } from '../types';
import { X, ArrowLeft, Truck, ShieldCheck, Check, AlertCircle, RotateCcw, Coins } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    isReturnOptedIn,
    returnItems,
    estimatedReturnReward,
    totalReturnBottlesCount,
    walletBalance,
    redeemCredit,
    placeOrder
  } = useApp();

  // Form State
  const [name, setName] = useState('Riya Garg');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('riya@example.com');
  const [address, setAddress] = useState('402, Lotus Residency, 12th Main Road, Indiranagar');
  const [pincode, setPincode] = useState('560038');
  const [city, setCity] = useState('Bengaluru');
  const [deliverySlot, setDeliverySlot] = useState('Tomorrow, 9:00 AM - 1:00 PM (Doorstep Handover)');
  const [handoverAgreed, setHandoverAgreed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');

  // Wallet Credit Redemption
  const [applyWalletCredit, setApplyWalletCredit] = useState(false);
  const [creditToApply, setCreditToApply] = useState(Math.min(walletBalance, Math.floor(cartSubtotal * 0.4)));

  // Form errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isCheckoutOpen) return null;

  const deliveryFee = cartSubtotal >= 399 ? 0 : 49;
  const activeReturnedBottles: EmptyBottleReturnItem[] = isReturnOptedIn
    ? returnItems.filter((b) => b.quantity > 0)
    : [];

  const actualCreditRedeemed = applyWalletCredit ? Math.min(walletBalance, creditToApply) : 0;
  const totalPayable = Math.max(0, cartSubtotal + deliveryFee - actualCreditRedeemed);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!phone.trim()) errs.phone = 'Valid phone number is required';
    if (!address.trim()) errs.address = 'Street address is required';
    if (!pincode.trim() || pincode.length !== 6) errs.pincode = 'Valid 6-digit PIN code required';
    if (activeReturnedBottles.length > 0 && !handoverAgreed) {
      errs.handover = 'Please confirm you will hand over the empty bottles during delivery';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    // If wallet credit was used, deduct it
    if (actualCreditRedeemed > 0) {
      redeemCredit(actualCreditRedeemed);
    }

    placeOrder({
      items: cart,
      subtotal: cartSubtotal,
      deliveryFee,
      discount: 0,
      creditRedeemed: actualCreditRedeemed,
      totalPayable,
      deliverySlot,
      deliveryAddress: {
        name,
        phone,
        email,
        address,
        pincode,
        city
      },
      returnedEmpties: activeReturnedBottles,
      estimatedReward: isReturnOptedIn ? estimatedReturnReward : 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Checkout & Delivery Setup</h2>
              <p className="text-xs text-slate-500">Combined refill drop-off and packaging pickup</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Split: Form Left, Summary Right */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Delivery Details & Return Agreement */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                1. Delivery Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-[#0066cc] focus:outline-none"
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-[#0066cc] focus:outline-none"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-[#0066cc] focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                2. Shipping Address
              </h3>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">House / Flat / Street Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-[#0066cc] focus:outline-none"
                  placeholder="Complete street address"
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    maxLength={6}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-[#0066cc] focus:outline-none"
                  />
                  {errors.pincode && <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-[#0066cc] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Delivery & Handover Slot */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>3. Delivery & Collection Slot</span>
                <span className="text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Combined Courier Visit</span>
              </h3>
              <div className="space-y-2">
                {[
                  'Tomorrow, 9:00 AM - 1:00 PM (Morning Slot)',
                  'Tomorrow, 4:00 PM - 8:00 PM (Evening Slot)',
                  'Day After Tomorrow, 10:00 AM - 2:00 PM'
                ].map((slot) => (
                  <label
                    key={slot}
                    className={`flex items-center gap-3 p-3 text-xs rounded-xl border cursor-pointer transition-all ${
                      deliverySlot === slot
                        ? 'border-[#0066cc] bg-blue-50/50 ring-1 ring-[#0066cc] font-semibold text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliverySlot"
                      checked={deliverySlot === slot}
                      onChange={() => setDeliverySlot(slot)}
                      className="text-[#0066cc] focus:ring-[#0066cc]"
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Doorstep Bottle Return Agreement (Mandatory if returns selected) */}
            {activeReturnedBottles.length > 0 && (
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <RotateCcw className="w-4 h-4 text-[#0066cc]" />
                  <span>Doorstep Empty Bottle Return Confirmation</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You have selected <strong className="text-slate-900">{totalReturnBottlesCount} empty Be Bodywise bottle(s)</strong> for collection. Your delivery partner will collect these during your refill delivery.
                </p>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={handoverAgreed}
                    onChange={(e) => setHandoverAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#0066cc] rounded border-slate-300 focus:ring-[#0066cc]"
                  />
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    I will hand over the selected empty bottles to the delivery partner during my refill delivery.
                  </span>
                </label>
                {errors.handover && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.handover}</p>
                )}
              </div>
            )}

            {/* Step 5: Payment Method */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                4. Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI (GPay / PhonePe)' },
                  { id: 'cod', label: 'Cash on Delivery' },
                  { id: 'card', label: 'Credit / Debit Card' }
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-2.5 text-center text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'border-[#0066cc] bg-blue-50 text-[#0066cc] ring-1 ring-[#0066cc]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                *Demo simulation only: no actual financial transactions or charges will occur.
              </p>
            </div>

          </div>

          {/* Right Column: Order Summary & Clear Credit Itemization */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.refillOptionId} className="flex items-center justify-between text-xs">
                    <div className="truncate max-w-[190px]">
                      <span className="font-semibold text-slate-900">{item.productName}</span>
                      <div className="text-[11px] text-slate-400">
                        {item.quantity} × {item.refillFormat.toLowerCase().includes(item.refillSize.toLowerCase().replace(' ', '')) ? item.refillFormat : `${item.refillSize} (${item.refillFormat})`}
                      </div>
                    </div>
                    <span className="font-bold text-slate-800 tabular-nums">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Wallet Credit Redemption Selector */}
              {walletBalance > 0 && (
                <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Coins className="w-4 h-4 text-[#0066cc]" />
                      <span>Redeem Bodywise Back Credit</span>
                    </div>
                    <span className="font-semibold text-[#0066cc] tabular-nums">
                      Available: ₹{walletBalance}
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={applyWalletCredit}
                      onChange={(e) => setApplyWalletCredit(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#0066cc] rounded focus:ring-[#0066cc]"
                    />
                    <span className="text-slate-700">Apply ₹{Math.min(walletBalance, Math.floor(cartSubtotal * 0.4))} discount from wallet</span>
                  </label>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Refill Subtotal:</span>
                  <span className="font-medium text-slate-900 tabular-nums">₹{cartSubtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Doorstep Delivery:</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="font-bold text-emerald-700">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {applyWalletCredit && actualCreditRedeemed > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Store Credit Redeemed:</span>
                    <span className="tabular-nums">-₹{actualCreditRedeemed}</span>
                  </div>
                )}

                {/* Clear distinction: Estimated future store credit */}
                {isReturnOptedIn && estimatedReturnReward > 0 && (
                  <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-[#0066cc]">Est. Store Credit to Earn:</div>
                      <div className="text-[10px] text-slate-500">Credited to wallet upon return verification</div>
                    </div>
                    <span className="text-sm font-extrabold text-[#0066cc] tabular-nums">
                      +₹{estimatedReturnReward}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-extrabold text-slate-900">
                  <span>Total Amount Payable:</span>
                  <span className="text-xl text-[#0066cc] tabular-nums">
                    ₹{totalPayable}
                  </span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="space-y-2 pt-4">
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 px-4 bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Place Refill Order (₹{totalPayable})</span>
              </button>

              <div className="text-[10px] text-center text-slate-400">
                By placing this simulated order, you agree to our demo terms and recycling handover guidelines.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
