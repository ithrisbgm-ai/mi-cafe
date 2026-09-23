import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNumber = '919876543210';
  const defaultMessage = encodeURIComponent(
    'Hello MI CAFE! ☕ I would like to check today’s specials or place an order.'
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#2C1810] text-[#FAF7F2] text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-[#C89B6D]/50 animate-in fade-in slide-in-from-right-4 duration-300">
          <span>Need help or want to order via WhatsApp?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Pulsing Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MI CAFE on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white stroke-[1.8]" />
      </a>
    </div>
  );
};
