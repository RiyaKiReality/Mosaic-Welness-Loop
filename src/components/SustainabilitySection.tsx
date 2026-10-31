import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, CheckCircle2, PackageCheck, Scale, Coins } from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  const { setActiveTab } = useApp();

  const comparisonRows = [
    {
      product: '1% Salicylic Acid Body Wash',
      original: { size: '375 ml Bottle', price: 549, perMl: 1.46 },
      refill: { size: '375 ml Pouch', price: 299, perMl: 0.80 },
      savingsAmount: 250,
      savingsPercent: 45,
      packagingFact: '78% less virgin plastic by weight in pouch vs rigid HDPE bottle'
    },
    {
      product: '4% AHA BHA Underarm Roll-on',
      original: { size: '50 ml Bottle', price: 299, perMl: 5.98 },
      refill: { size: '50 ml Pouch', price: 179, perMl: 3.58 },
      savingsAmount: 120,
      savingsPercent: 40,
      packagingFact: 'Reusable ball-housing eliminates need for new motorized roller assembly'
    },
    {
      product: 'De-Tan SPF 50 Sunscreen Body Lotion',
      original: { size: '300 ml Bottle', price: 499, perMl: 1.66 },
      refill: { size: '300 ml Pouch', price: 279, perMl: 0.93 },
      savingsAmount: 220,
      savingsPercent: 44,
      packagingFact: 'Die-cut flexible pouch format reduces shipping volume by 65%'
    },
    {
      product: 'Advanced Hair Growth Serum',
      original: { size: '40 ml Roll-on', price: 599, perMl: 14.98 },
      refill: { size: '40ml (roll on refill)', price: 299, perMl: 7.48 },
      savingsAmount: 300,
      savingsPercent: 50,
      packagingFact: 'Reusable ergonomic applicator sleeve eliminates outer casing disposal'
    },
    {
      product: '1% Ketoconazole Anti-Dandruff Shampoo',
      original: { size: '200 ml Bottle', price: 399, perMl: 2.00 },
      refill: { size: '200 ml Pouch', price: 249, perMl: 1.25 },
      savingsAmount: 150,
      savingsPercent: 38,
      packagingFact: 'Multi-layer barrier pouch saves virgin plastic bottle and cap'
    }
  ];

  return (
    <section id="why-refill" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0066cc]">
            Responsible Formulation & Economics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Refill? Three Clear Benefits
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A practical, commercially viable approach to everyday skincare that focuses on lower consumer costs and reduced single-use packaging.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1 */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0066cc] flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Less Primary Packaging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigid bottles and pump dispensers require significant raw resin and energy to mould. Flexible refill pouches use substantially less material by weight, reducing single-use packaging demand.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              *Verified material weight reduction per pouch vs pump bottle.
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0066cc] flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Real Doorstep Cash Rewards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instead of sending empty bottles into municipal waste streams, our delivery partners retrieve your clean containers during your scheduled refill visit, earning you ₹20 to ₹40 in store credit per bottle.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              *Credit applied directly to your Be Bodywise wallet.
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0066cc] flex items-center justify-center">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. A More Affordable Routine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When you do not pay for heavy plastic bottles, custom pumps, and outer boxes on every purchase, your effective price per ml drops by 40% to 50% for the exact same dermatological formula.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              *Backed by itemized price-per-ml calculations below.
            </div>
          </div>
        </div>

        {/* Refill vs Original Packaging Price & Packaging Comparison Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Refill vs. Full-Packaged Product Comparison
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Transparent price and packaging breakdown based on current catalog pricing.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0066cc] bg-blue-50 px-2.5 py-1 rounded border border-blue-200 self-start sm:self-auto">
              Verified Calculations
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Product</th>
                  <th className="py-3 px-4">Original Bottle</th>
                  <th className="py-3 px-4">Refill Pouch</th>
                  <th className="py-3 px-4">Price / ml Comparison</th>
                  <th className="py-3 px-4 text-right">Net Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">
                      <div>{row.product}</div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">{row.packagingFact}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">₹{row.original.price}</div>
                      <div className="text-slate-400 text-[11px]">{row.original.size}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-[#0066cc]">₹{row.refill.price}</div>
                      <div className="text-slate-500 text-[11px]">{row.refill.size}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap tabular-nums">
                      <span className="font-bold text-emerald-700">₹{row.refill.perMl.toFixed(2)}/ml</span>
                      <span className="text-slate-400 line-through ml-1.5 text-[11px]">₹{row.original.perMl.toFixed(2)}/ml</span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap tabular-nums">
                      <span className="text-sm font-extrabold text-emerald-700">
                        Save ₹{row.savingsAmount}
                      </span>
                      <div className="text-[11px] font-bold text-emerald-600">
                        ({row.savingsPercent}% lower spend)
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0" />
              <span>Figures calculated against official retail prices. Savings apply directly to your purchase.</span>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2 bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Shop All Refills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
