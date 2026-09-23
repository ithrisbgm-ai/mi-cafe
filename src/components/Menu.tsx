import React, { useState, useMemo } from 'react';
import { Category, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Check, Clock, Search, Coffee, Sparkles } from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'Hot Coffee',
  'Cold Coffee',
  'Tea',
  'Snacks',
  'Desserts',
];

export const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const { cart, addToCart, updateQuantity } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedNotice(product.id);
    setTimeout(() => {
      setAddedNotice((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  const getCartQuantity = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2] text-[#2C1810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D8] text-[#8C5D33] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted Menu</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C1810]">
            Freshly Prepared For You
          </h2>

          <p className="text-base text-stone-600">
            From sunrise roasts to evening sweet treats, explore our artisan selections made with high-grade beans and wholesome ingredients.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Categories Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2C1810] text-[#FAF7F2] shadow-md shadow-[#2C1810]/20 scale-105'
                      : 'bg-[#F2E8DC] text-[#4A2E18] hover:bg-[#E5D7C5]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, tea, treats..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#DFD3BF] text-sm text-[#2C1810] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89B6D] focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-16 text-center py-16 bg-[#F3EBDD]/60 rounded-3xl border border-dashed border-[#C89B6D]/50">
            <Coffee className="w-12 h-12 text-[#C89B6D] mx-auto mb-3 opacity-60" />
            <h3 className="font-display text-xl font-bold text-[#2C1810]">No items found</h3>
            <p className="text-sm text-stone-500 mt-1">
              Try searching with another keyword or pick a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#2C1810] text-[#FAF7F2] text-xs font-semibold hover:bg-[#4A2E18]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => {
              const qtyInCart = getCartQuantity(product.id);
              const isJustAdded = addedNotice === product.id;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#EDE3D2] shadow-xs hover:shadow-xl hover:border-[#C89B6D]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for card clarity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#2C1810]/85 backdrop-blur-xs text-[#E2BA8A] text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#C89B6D]/40 shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Prep Time */}
                    {product.prepTime && (
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#2C1810] text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Clock className="w-3 h-3 text-[#C89B6D]" />
                        {product.prepTime}
                      </span>
                    )}

                    {/* Vegetarian green dot indicator */}
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-md bg-white/95 flex items-center justify-center shadow-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#9C6C3E] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="font-display font-bold text-lg text-[#2C1810]">
                          ₹{product.price}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#2C1810] mt-1 group-hover:text-[#9C6C3E] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="mt-5 pt-4 border-t border-[#F2E8DC] flex items-center justify-between">
                      {qtyInCart === 0 ? (
                        <button
                          onClick={() => handleAdd(product)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#2C1810] text-[#FAF7F2] hover:bg-[#4A2E18] active:scale-95 shadow-sm'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Added to Cart!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-[#E2BA8A]" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-between bg-[#F8F4EE] rounded-xl p-1 border border-[#DFD3BF]">
                          <button
                            onClick={() => updateQuantity(product.id, qtyInCart - 1)}
                            className="w-8 h-8 rounded-lg bg-white text-[#2C1810] hover:bg-stone-100 flex items-center justify-center font-bold shadow-xs transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="text-xs font-bold text-[#2C1810] px-3">
                            {qtyInCart} in cart
                          </span>

                          <button
                            onClick={() => updateQuantity(product.id, qtyInCart + 1)}
                            className="w-8 h-8 rounded-lg bg-[#2C1810] text-[#FAF7F2] hover:bg-[#4A2E18] flex items-center justify-center font-bold shadow-xs transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
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
    </section>
  );
};
