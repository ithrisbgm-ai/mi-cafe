import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] text-[#2C1810] shadow-2xl flex flex-col border-l border-[#DFD3BF] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 bg-[#2C1810] text-[#FAF7F2] flex items-center justify-between border-b border-[#4A2E18]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C89B6D] flex items-center justify-center text-[#2C1810]">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg leading-tight">Your Cart</h2>
                <p className="text-xs text-[#E2BA8A]">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#FAF7F2]/80 hover:text-white hover:bg-[#3E2317] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#F3EBDD] flex items-center justify-center text-[#C89B6D] mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#2C1810]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1">
                  Discover our freshly brewed single origin coffees and freshly baked treats.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#2C1810] text-[#FAF7F2] text-xs font-bold hover:bg-[#4A2E18] transition-all cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#EADFCF]">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Selected Items
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-700 hover:text-rose-900 font-medium flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear all
                  </button>
                </div>

                {cart.map((item) => {
                  const lineTotal = item.product.price * item.quantity;
                  return (
                    <div
                      key={item.product.id}
                      className="bg-white rounded-xl p-3.5 border border-[#EDE3D2] shadow-xs flex items-center gap-3.5"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-sm text-[#2C1810] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-stone-500">
                          ₹{item.product.price} each
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Stepper */}
                          <div className="flex items-center bg-[#F5EFE6] rounded-lg border border-[#DFD3BF]">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-[#2C1810] hover:bg-[#EAE0D0] rounded-l-lg transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-[#2C1810]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-[#2C1810] hover:bg-[#EAE0D0] rounded-r-lg transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line total */}
                          <span className="font-display font-bold text-sm text-[#2C1810]">
                            ₹{lineTotal}
                          </span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}

                {/* Cafe Perk Callout */}
                <div className="bg-[#F3EBDD] rounded-xl p-3 border border-[#C89B6D]/30 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9C6C3E] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#4A2E18] leading-tight">
                    <strong>Patron Perk:</strong> Every beverage order includes our complimentary house cinnamon speculoos biscuit!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#DFD3BF] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Packaging & Service</span>
                  <span className="text-emerald-700 font-semibold">Free</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-[#2C1810] pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="font-display text-xl text-[#2C1810]">₹{cartSubtotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C89B6D] to-[#B8834F] text-[#2C1810] font-bold text-sm flex items-center justify-center gap-2 hover:from-[#d5a87b] hover:to-[#c6915b] shadow-lg shadow-[#C89B6D]/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
