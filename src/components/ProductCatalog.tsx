import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, Plus, Check, Star, Info, Sparkles, RotateCcw } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products, addToCart, setSelectedProductModal } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'savings'>('popular');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [switchedCards, setSwitchedCards] = useState<{ [productId: string]: boolean }>({});

  const toggleImageSwitch = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSwitchedCards((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const primaryRefillA = a.refills[0];
        const primaryRefillB = b.refills[0];

        if (sortBy === 'price-asc') {
          return primaryRefillA.price - primaryRefillB.price;
        }
        if (sortBy === 'price-desc') {
          return primaryRefillB.price - primaryRefillA.price;
        }
        if (sortBy === 'savings') {
          return primaryRefillB.savingsPercent - primaryRefillA.savingsPercent;
        }
        // default popular
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const primaryRefill = product.refills[0];
    addToCart({
      productId: product.id,
      refillOptionId: primaryRefill.id,
      productName: product.name,
      refillSize: primaryRefill.size,
      refillFormat: primaryRefill.format,
      price: primaryRefill.price,
      quantity: 1,
      image: product.image
    });

    setAddedAnimationId(primaryRefill.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="refill-catalog" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0066cc]">
              Verified Actives · Sustainable Refill Pouches
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Shop Essentials Refills
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Replenish your favourite Be Bodywise formulas in lightweight eco-pouches. Keep your durable pump bottles and roll-ons in circular circulation.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="text-xs font-medium text-slate-500 tabular-nums">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> refill products
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="py-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs (Segmented Control - Allowed by Anti-Slop Rule) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto shrink-0">
            {[
              { id: 'all', label: 'All Refills' },
              { id: 'bodycare', label: 'Body Care' },
              { id: 'skincare', label: 'Skincare' },
              { id: 'haircare', label: 'Hair Care' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#0066cc] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search active, serum, body wash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066cc] cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="savings">Highest Savings %</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid - 3 Column Desktop, 2 Column Tablet, 1 Column Mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">No refill products found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for "Salicylic", "SPF", or select "All Refills".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0066cc] rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const primaryRefill = product.refills[0];
              const isAdded = addedAnimationId === primaryRefill.id;
              const hasAlternateImage = !!(product.originalBottleImage && product.refillPouchImage && product.originalBottleImage !== product.refillPouchImage);
              const isSwitched = !!switchedCards[product.id];
              const currentImage = hasAlternateImage
                ? (isSwitched ? product.originalBottleImage : (product.refillPouchImage || product.image))
                : product.image;

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductModal(product)}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  <div>
                    {/* Image Showcase Container */}
                    <div className="relative aspect-[4/3] bg-slate-50/80 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                      <img
                        src={currentImage}
                        alt={`${product.name} ${isSwitched ? 'Bottle' : 'Refill'}`}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />

                      {/* Savings text tag */}
                      <div className="absolute top-3 left-3 bg-[#0066cc] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs tabular-nums">
                        SAVE {primaryRefill.savingsPercent}%
                      </div>

                      {/* Format status tag */}
                      <div className="absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded bg-white/90 text-slate-700 border border-slate-200">
                        {primaryRefill.isVerifiedFormat ? 'Verified Refill' : 'Proposed Demo'}
                      </div>

                      {/* Image Switcher Pill Button */}
                      {hasAlternateImage && (
                        <button
                          type="button"
                          onClick={(e) => toggleImageSwitch(product.id, e)}
                          className="absolute bottom-2.5 right-2.5 z-10 bg-white/95 hover:bg-white text-slate-700 hover:text-[#0066cc] text-[11px] font-semibold px-2 py-1 rounded-md shadow-xs border border-slate-200 flex items-center gap-1 transition-all cursor-pointer"
                          title="Switch between Refill and Bottle view"
                        >
                          <RotateCcw className="w-3 h-3 text-[#0066cc]" />
                          <span>Switch: {isSwitched ? 'View Refill' : 'View Bottle'}</span>
                        </button>
                      )}

                      {/* Packaging Indicator */}
                      {hasAlternateImage && (
                        <span className="absolute bottom-2.5 left-2.5 text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/90 text-slate-600 border border-slate-200">
                          {isSwitched ? 'Original Bottle' : 'Refill Pack'}
                        </span>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                      {/* Quiet Unboxed Metadata: Category & Bottle Return Credit */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="uppercase tracking-wider text-[#0066cc] font-semibold text-[11px]">
                          {product.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">Return earns ₹{product.rewardValuePerEmpty}</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      {/* Subtitle / Benefits */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>

                      {/* Refill Specs Info Box */}
                      <div className="bg-[#f8faff] rounded-lg p-3 text-xs space-y-1.5 border border-blue-100/70">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Refill Format:</span>
                          <span className="font-semibold text-slate-800">
                            {primaryRefill.format.toLowerCase().includes(primaryRefill.size.toLowerCase().replace(' ', ''))
                              ? primaryRefill.format
                              : `${primaryRefill.size} (${primaryRefill.format})`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Original Packaged:</span>
                          <span className="line-through text-slate-400 tabular-nums">₹{primaryRefill.originalPrice} ({primaryRefill.originalSize})</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-blue-100">
                          <span className="text-emerald-700 font-medium">Price per ml:</span>
                          <span className="text-emerald-700 font-bold tabular-nums">
                            ₹{primaryRefill.pricePerMl.toFixed(2)}/ml
                            <span className="text-[10px] font-normal text-slate-400 ml-1">vs ₹{primaryRefill.originalPricePerMl.toFixed(2)}/ml</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA & Pricing Bar */}
                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Refill Price</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                            ₹{primaryRefill.price}
                          </span>
                          <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                            Save ₹{primaryRefill.savingsAmount}
                          </span>
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#0066cc] hover:bg-[#0052a3] text-white shadow-xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Refill</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-2 text-center">
                      <span className="text-[11px] font-medium text-slate-500 hover:text-[#0066cc] transition-colors">
                        Click card for refill guide & packaging details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
