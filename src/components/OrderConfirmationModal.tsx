import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, PackageCheck, RotateCcw, Truck, ArrowRight, X, AlertCircle } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { placedOrderModal, setPlacedOrderModal, setActiveTab } = useApp();

  if (!placedOrderModal) return null;

  const order = placedOrderModal;

  const handleGoToAccount = () => {
    setPlacedOrderModal(null);
    setActiveTab('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setPlacedOrderModal(null)}
          aria-label="Close order confirmation"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Order Confirmed!
          </h2>
          <div className="text-xs font-semibold text-slate-500">
            Demo Reference ID: <span className="font-mono font-bold text-[#0066cc]">{order.id}</span>
          </div>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your refill essentials are being prepped for dispatch.
          </p>
        </div>

        {/* Delivery & Bottle Pickup Slot Card */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Truck className="w-4 h-4 text-[#0066cc]" />
            <span>Delivery & Pickup Schedule</span>
          </div>
          <div className="text-slate-700">
            <strong>Slot:</strong> {order.deliverySlot}
          </div>
          <div className="text-slate-600">
            <strong>Recipient:</strong> {order.deliveryAddress.name} ({order.deliveryAddress.phone})
          </div>
          <div className="text-slate-600">
            <strong>Address:</strong> {order.deliveryAddress.address}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
          </div>
        </div>

        {/* Ordered Refill Products */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Refill Items Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})
          </div>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{item.productName}</div>
                  <div className="text-[11px] text-slate-500">
                    {item.quantity} × {item.refillFormat.toLowerCase().includes(item.refillSize.toLowerCase().replace(' ', '')) ? item.refillFormat : `${item.refillSize} (${item.refillFormat})`}
                  </div>
                </div>
                <span className="font-bold text-slate-800 tabular-nums">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottle Returns & Instructions */}
        {order.returnedEmpties.length > 0 ? (
          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 text-xs space-y-3">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#0066cc]" />
                <span>Doorstep Bottle Collection</span>
              </span>
              <span className="text-emerald-700 tabular-nums">
                +₹{order.estimatedReward} estimated credit
              </span>
            </div>

            <div className="space-y-1 text-slate-700">
              <div className="font-semibold text-slate-900">Registered Empties to Hand Over:</div>
              {order.returnedEmpties.map((empty, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span>• {empty.quantity}x {empty.productName}</span>
                  <span className="font-medium text-slate-600 tabular-nums">₹{empty.quantity * empty.rewardPerBottle}</span>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-blue-100 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-900">Doorstep Handover Checklist:</div>
              <div>1. Have your rinsed, dry bottles ready when courier rings the bell.</div>
              <div>2. Ensure pumps and caps are firmly fastened.</div>
              <div>3. Hand over bottles during your refill drop-off.</div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
            No empty bottles registered for this delivery. You can always return bottles during a future refill purchase!
          </div>
        )}

        {/* Prototype Notice */}
        <div className="flex items-start gap-2.5 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Interactive Prototype Simulation:</strong> This order is simulated for demonstration purposes. In My Account, you can test the verification workflow to see how the status updates to <em>Credit Issued</em> and adds funds to your wallet!
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleGoToAccount}
            className="w-full sm:flex-1 py-3 px-4 bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Track Order & Returns in My Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPlacedOrderModal(null)}
            className="w-full sm:w-auto py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
