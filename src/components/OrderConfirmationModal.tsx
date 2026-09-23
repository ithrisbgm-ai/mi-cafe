import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Share2, Coffee, Sparkles, Sheet } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderConfirmationModal: React.FC = () => {
  const { orderConfirmation, setOrderConfirmation, setIsSheetsGuideOpen } = useCart();
  const [copied, setCopied] = useState(false);

  if (!orderConfirmation) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderConfirmation.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `☕ *MI CAFE Order Confirmation*\n` +
      `*Order ID:* ${orderConfirmation.orderId}\n` +
      `*Name:* ${orderConfirmation.customerName}\n` +
      `*Order Type:* ${orderConfirmation.orderType} (${orderConfirmation.tableNumber})\n` +
      `*Items:* ${orderConfirmation.items}\n` +
      `*Total:* ₹${orderConfirmation.total}\n` +
      `*Status:* New Order\n\n` +
      `Thank you for dining with MI CAFE!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setOrderConfirmation(null)}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative bg-[#FAF7F2] rounded-3xl max-w-lg w-full text-left overflow-hidden shadow-2xl border border-[#DFD3BF] my-8 animate-in zoom-in-95 duration-200">
          
          {/* Top Celebration Banner */}
          <div className="bg-gradient-to-r from-[#2C1810] via-[#3E2317] to-[#2C1810] text-[#FAF7F2] p-6 text-center border-b border-[#4A2E18] relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-900/30 mb-3">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-400/40 text-emerald-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Received</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              Order Placed Successfully!
            </h2>
            <p className="text-xs text-[#E2BA8A] mt-1">
              Your barista is now preparing your handcrafted drinks.
            </p>
          </div>

          {/* Receipt Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Key Stats: Order ID & Total */}
            <div className="bg-white rounded-2xl p-5 border border-[#EDE3D2] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2E8DC]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Order ID
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono font-bold text-lg text-[#2C1810]">
                      {orderConfirmation.orderId}
                    </span>
                    <button
                      onClick={handleCopyOrderId}
                      className="p-1.5 text-stone-500 hover:text-[#2C1810] hover:bg-[#F3EBDD] rounded-lg transition-colors"
                      title="Copy Order ID"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Total Amount
                  </span>
                  <div className="font-display font-bold text-2xl text-[#2C1810] mt-0.5">
                    ₹{orderConfirmation.total}
                  </div>
                </div>
              </div>

              {/* Order Meta */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-500">Customer:</span>
                  <p className="font-bold text-[#2C1810]">{orderConfirmation.customerName}</p>
                </div>
                <div>
                  <span className="text-stone-500">Service:</span>
                  <p className="font-bold text-[#2C1810]">
                    {orderConfirmation.orderType} • {orderConfirmation.tableNumber}
                  </p>
                </div>
                <div>
                  <span className="text-stone-500">Timestamp:</span>
                  <p className="font-medium text-[#2C1810]">
                    {orderConfirmation.date} at {orderConfirmation.time}
                  </p>
                </div>
                <div>
                  <span className="text-stone-500">Kitchen Status:</span>
                  <span className="inline-block mt-0.5 px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">
                    New Order
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="pt-3 border-t border-[#F2E8DC]">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Ordered Items
                </span>
                <p className="text-xs text-stone-700 bg-[#FBF9F5] p-2.5 rounded-xl border border-[#EDE3D2] leading-relaxed">
                  {orderConfirmation.items}
                </p>
              </div>

              {/* Google Sheets Sync Indicator */}
              <div className="flex items-center justify-between text-[11px] bg-[#F3EBDD]/60 p-2.5 rounded-xl border border-[#C89B6D]/30">
                <div className="flex items-center gap-1.5 text-[#4A2E18]">
                  <Sheet className="w-3.5 h-3.5 text-emerald-600" />
                  {orderConfirmation.savedToGoogleSheets ? (
                    <span>Logged to Google Sheets successfully!</span>
                  ) : (
                    <span>Ready for live Google Sheets Apps Script URL.</span>
                  )}
                </div>
                <button
                  onClick={() => setIsSheetsGuideOpen(true)}
                  className="font-semibold text-[#8C5D33] hover:underline"
                >
                  View Setup
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppShare}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Order on WhatsApp</span>
              </button>

              <button
                onClick={() => setOrderConfirmation(null)}
                className="w-full py-3 px-4 rounded-xl bg-[#2C1810] hover:bg-[#3E2317] text-[#FAF7F2] font-semibold text-sm transition-all cursor-pointer"
              >
                Done & Order Again
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
