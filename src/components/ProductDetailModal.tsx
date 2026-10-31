import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RefillOption } from '../types';
import { X, Check, ShoppingBag, ShieldCheck, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart } = useApp();
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'instructions' | 'compatibility' | 'directions'>('instructions');
  const [isAdded, setIsAdded] = useState(false);
  const [isShowingBottle, setIsShowingBottle] = useState(false);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const currentOption: RefillOption =
    product.refills.find((r) => r.id === selectedOptionId) || product.refills[0];

  const modalImage = isShowingBottle
    ? (product.originalBottleImage || product.image)
    : (product.refillPouchImage || product.image);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      refillOptionId: currentOption.id,
      productName: product.name,
      refillSize: currentOption.size,
      refillFormat: currentOption.format,
      price: currentOption.price,
      quantity,
      image: modalImage
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/90 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Visuals & Packaging Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative aspect-square bg-[#f8faff] rounded-xl border border-slate-200 p-6 flex items-center justify-center overflow-hidden">
              <img
                src={modalImage}
                alt={`${product.name} ${isShowingBottle ? 'Original Bottle' : 'Refill'}`}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0066cc] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs tabular-nums">
                SAVE {currentOption.savingsPercent}%
              </div>
              
              {/* Switch View Button */}
              {product.originalBottleImage && product.refillPouchImage && (
                <button
                  type="button"
                  onClick={() => setIsShowingBottle(!isShowingBottle)}
                  className="absolute top-3 right-3 z-10 bg-white/95 hover:bg-white text-slate-700 hover:text-[#0066cc] text-[11px] font-semibold px-2 py-1 rounded-md shadow-xs border border-slate-200 flex items-center gap-1 transition-all cursor-pointer"
                  title="Switch between Refill and Bottle view"
                >
                  <RotateCcw className="w-3 h-3 text-[#0066cc]" />
                  <span>Switch: {isShowingBottle ? 'View Refill' : 'View Bottle'}</span>
                </button>
              )}

              <div className="absolute bottom-3 left-3 right-3 text-center bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
                {isShowingBottle ? 'Original Packaged Bottle' : (currentOption.format.toLowerCase().includes(currentOption.size.toLowerCase().replace(' ', '')) ? currentOption.format : `${currentOption.format} · ${currentOption.size}`)}
              </div>
            </div>

            {/* Packaging Verification Badge */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
                <span>
                  {currentOption.isVerifiedFormat ? 'Commercially Verified Refill Format' : 'Proposed Prototype Format'}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {currentOption.packagingDetails}
              </p>
            </div>

            {/* Doorstep Return Reward Banner */}
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1">
              <div className="font-bold text-[#0066cc] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bodywise Back Reward</span>
              </div>
              <p className="text-slate-700">
                Keep your empty <span className="font-semibold">{product.eligibleBottleType}</span>. Hand it to the courier partner during refill delivery to earn <span className="font-bold text-[#0066cc] tabular-nums">₹{product.rewardValuePerEmpty}</span> store credit.
              </p>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Transfer Guide, Purchase Action */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0066cc] mb-1.5">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-normal">Active Formulation</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {product.subtitle}
              </p>

              {/* Price & Savings Display */}
              <div className="mt-4 p-4 bg-[#f8faff] rounded-xl border border-blue-100 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Refill Price (INR)</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                      ₹{currentOption.price}
                    </span>
                    <span className="text-sm line-through text-slate-400 tabular-nums">
                      ₹{currentOption.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 tabular-nums">
                      Save ₹{currentOption.savingsAmount} ({currentOption.savingsPercent}%)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Unit Rate</div>
                  <div className="text-sm font-bold text-[#0066cc] tabular-nums mt-0.5">
                    ₹{currentOption.pricePerMl.toFixed(2)}/ml
                  </div>
                  <div className="text-[11px] text-slate-400 line-through tabular-nums">
                    ₹{currentOption.originalPricePerMl.toFixed(2)}/ml orig
                  </div>
                </div>
              </div>

              {/* Refill Variant Selector if multiple */}
              {product.refills.length > 1 && (
                <div className="mt-4">
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Select Refill Pack Size:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {product.refills.map((refill) => (
                      <button
                        key={refill.id}
                        onClick={() => setSelectedOptionId(refill.id)}
                        className={`p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                          currentOption.id === refill.id
                            ? 'border-[#0066cc] bg-blue-50/50 ring-1 ring-[#0066cc]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-slate-900">{refill.size}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">{refill.format}</div>
                        <div className="font-semibold text-[#0066cc] tabular-nums mt-1">₹{refill.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Information Tabs: Refill Instructions / Compatibility / Usage */}
              <div className="mt-6 border-b border-slate-200 flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'instructions'
                      ? 'text-[#0066cc] border-b-2 border-[#0066cc]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Transfer Instructions
                </button>
                <button
                  onClick={() => setActiveTab('compatibility')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'compatibility'
                      ? 'text-[#0066cc] border-b-2 border-[#0066cc]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Packaging Compatibility
                </button>
                <button
                  onClick={() => setActiveTab('directions')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'directions'
                      ? 'text-[#0066cc] border-b-2 border-[#0066cc]'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Directions for Use
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-4 text-xs text-slate-600 leading-relaxed min-h-[140px]">
                {activeTab === 'instructions' && (
                  <div className="space-y-2">
                    <div className="font-bold text-slate-800 mb-2">
                      How to transfer the refill into your original Be Bodywise bottle:
                    </div>
                    <ol className="space-y-1.5 list-decimal list-inside text-slate-700">
                      {product.refillInstructions.map((step, idx) => (
                        <li key={idx} className="leading-snug">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {activeTab === 'compatibility' && (
                  <div className="space-y-3">
                    <div className="font-bold text-slate-800">
                      Compatibility & Safety Notice:
                    </div>
                    <p className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      {currentOption.compatibilityNote}
                    </p>
                    <div className="flex items-start gap-2 text-slate-500">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        Do not mix this refill with formulas from other brands. Ensure original pump mechanism is rinsed and completely dried before refilling.
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'directions' && (
                  <div className="space-y-3">
                    <div className="font-bold text-slate-800">Clinical Directions:</div>
                    <p className="text-slate-700">{product.directions}</p>
                    <div className="font-bold text-slate-800 pt-2">Key Actives & Benefits:</div>
                    <ul className="space-y-1">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity Stepper & Add to Cart */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg p-1 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-slate-900 text-sm tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-8 rounded text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 w-full py-3 px-6 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0066cc] hover:bg-[#0052a3] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} Refill ({currentOption.size}) · ₹{currentOption.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
