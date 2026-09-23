import React, { useState } from 'react';
import { X, Coffee, AlertCircle, RefreshCw, CheckCircle2, ChevronRight, Sheet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData, OrderType } from '../types';
import { getActiveGoogleScriptUrl, GOOGLE_SCRIPT_URL } from '../config';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    isSubmitting,
    lastError,
    clearError,
    setIsSheetsGuideOpen,
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    email: '',
    orderType: 'Dine In',
    tableNumber: 'Table 4',
    notes: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const activeUrl = getActiveGoogleScriptUrl();
  const isPlaceholderUrl =
    !activeUrl ||
    activeUrl === GOOGLE_SCRIPT_URL ||
    activeUrl.includes('PASTE_GOOGLE_APPS_SCRIPT_URL_HERE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);

    // Validation
    if (!formData.name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (formData.orderType === 'Dine In' && !formData.tableNumber.trim()) {
      setValidationError('Please specify your table number for Dine In.');
      return;
    }

    await placeOrder(formData);
  };

  const tableOptions = [
    'Table 1 (Indoor Window)',
    'Table 2 (Cozy Booth)',
    'Table 3 (Center Lounge)',
    'Table 4 (Barista Counter)',
    'Table 5 (Patio Garden)',
    'Table 6 (Reading Corner)',
    'Table 7 (Upper Deck)',
    'Table 8 (Family Round)',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full text-left overflow-hidden shadow-2xl border border-[#DFD3BF] my-8 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#2C1810] text-[#FAF7F2] p-6 border-b border-[#4A2E18] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C89B6D] flex items-center justify-center text-[#2C1810]">
                <Coffee className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl leading-tight">Checkout</h3>
                <p className="text-xs text-[#E2BA8A]">
                  MI CAFE Fresh Order & Table Dispatch
                </p>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              onClick={() => setIsCheckoutOpen(false)}
              className="text-[#FAF7F2]/70 hover:text-white p-2 rounded-full hover:bg-[#3E2317] transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Google Sheets Sync notice */}
            <div className="bg-[#F3EBDD] rounded-xl p-3.5 border border-[#C89B6D]/40 flex items-center justify-between text-xs text-[#4A2E18]">
              <div className="flex items-center gap-2">
                <Sheet className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Google Sheets Web App:</strong>{' '}
                  {isPlaceholderUrl
                    ? 'Default mode (Ready for Apps Script link)'
                    : 'Active Live Sync Enabled'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSheetsGuideOpen(true)}
                className="text-xs font-semibold text-[#8C5D33] hover:underline shrink-0 pl-2"
              >
                View Code →
              </button>
            </div>

            {/* Error Message if previous submission failed */}
            {lastError && (
              <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl flex items-start gap-3 text-rose-900">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs">
                  <p className="font-bold">Order submission failed</p>
                  <p className="mt-0.5 text-rose-700">
                    Your cart items have been kept safe! Error: {lastError}. You can retry now or verify your Google Apps Script URL.
                  </p>
                </div>
              </div>
            )}

            {validationError && (
              <div className="bg-amber-50 border-l-4 border-amber-600 p-3 rounded-r-xl text-xs text-amber-900 font-medium">
                {validationError}
              </div>
            )}

            {/* Order Type Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Order Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['Dine In', 'Pickup'] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        orderType: type,
                        tableNumber: type === 'Pickup' ? 'Takeaway' : prev.tableNumber || 'Table 1',
                      }))
                    }
                    className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      formData.orderType === type
                        ? 'bg-[#2C1810] text-[#FAF7F2] border-[#2C1810] shadow-sm'
                        : 'bg-white text-stone-700 border-[#DFD3BF] hover:bg-[#F8F4EE]'
                    }`}
                  >
                    <span>{type === 'Dine In' ? '🍽️ Dine In' : '🛍️ Quick Pickup'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD3BF] text-sm text-[#2C1810] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89B6D] transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD3BF] text-sm text-[#2C1810] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89B6D] transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD3BF] text-sm text-[#2C1810] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89B6D] transition-all"
                />
              </div>

              {/* Table Number (if Dine In) */}
              {formData.orderType === 'Dine In' ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">
                    Table Number / Seating <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.tableNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tableNumber: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD3BF] text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C89B6D] transition-all"
                  >
                    {tableOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                    <option value="Bar Counter">Bar Counter</option>
                    <option value="Any Available Table">Any Available Table</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">
                    Pickup Counter
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Express Pickup Counter - Ground Floor"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DFD3BF] text-xs text-stone-600 font-medium cursor-not-allowed"
                  />
                </div>
              )}
            </div>

            {/* Special Instructions / Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700">
                Barista Notes / Preparation Requests (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Extra hot, oat milk preferred, less syrup, cutlery needed..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD3BF] text-sm text-[#2C1810] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89B6D] transition-all resize-none"
              />
            </div>

            {/* Order Summary Box */}
            <div className="bg-white rounded-2xl p-4 border border-[#EDE3D2] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F2E8DC]">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Order Summary ({cart.length} distinct {cart.length === 1 ? 'item' : 'items'})
                </span>
                <span className="text-xs text-stone-500 font-medium">Status: New Order</span>
              </div>

              <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-stone-700">
                      <strong className="text-[#2C1810]">{item.quantity}x</strong>{' '}
                      {item.product.name}
                    </span>
                    <span className="font-semibold text-[#2C1810]">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F2E8DC] flex items-center justify-between text-base font-bold text-[#2C1810]">
                <span>Total Due</span>
                <span className="font-display text-xl text-[#2C1810]">₹{cartSubtotal}</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C89B6D] via-[#B8834F] to-[#9C6C3E] text-[#2C1810] font-extrabold text-base flex items-center justify-center gap-3 hover:from-[#d5a87b] hover:to-[#a97544] shadow-xl shadow-[#C89B6D]/25 active:scale-98 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-[#2C1810]" />
                    <span>Brewing Order & Syncing to Google Sheets...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#2C1810]" />
                    <span>Place Order • ₹{cartSubtotal}</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-stone-500">
                🔒 Safe & secure order submission. Records directly to MI CAFE Google Sheets kitchen terminal.
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
