import React from 'react';
import { Coffee, Heart, Sheet, ArrowUp, Instagram, Facebook, Twitter } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setIsSheetsGuideOpen } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E110A] text-[#FAF7F2] border-t border-[#3E2317]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C89B6D] to-[#E2BA8A] flex items-center justify-center text-[#2C1810]">
                <Coffee className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-[#FAF7F2]">
                MI CAFE
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Artisan coffee roastery, specialized cold brews, and oven-fresh Viennoiserie. Handcrafted with devotion every morning.
            </p>

            <div className="flex items-center gap-3 pt-2 text-stone-400">
              <a href="#" className="w-8 h-8 rounded-full bg-[#2C1810] flex items-center justify-center hover:text-[#E2BA8A] hover:bg-[#3E2317] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#2C1810] flex items-center justify-center hover:text-[#E2BA8A] hover:bg-[#3E2317] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#2C1810] flex items-center justify-center hover:text-[#E2BA8A] hover:bg-[#3E2317] transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#E2BA8A] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#home" className="hover:text-[#E2BA8A] transition-colors">Home Page</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#E2BA8A] transition-colors">Artisan Menu & Pricing</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E2BA8A] transition-colors">Our Roastery Story</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E2BA8A] transition-colors">Visit & Reservations</a>
              </li>
              <li>
                <button
                  onClick={() => setIsSheetsGuideOpen(true)}
                  className="hover:text-[#E2BA8A] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Sheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Sheets Web App Setup</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Roastery Hours */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#E2BA8A] uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="text-[#FAF7F2] font-semibold">7:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-[#FAF7F2] font-semibold">7:00 AM – 11:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-[#FAF7F2] font-semibold">7:30 AM – 11:00 PM</span>
              </div>
              <p className="text-[11px] text-[#C89B6D] pt-1">
                Table service & express takeaway open all day.
              </p>
            </div>
          </div>

          {/* Netlify & Tech Badges */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-[#E2BA8A] uppercase tracking-wider">
              Deployment Info
            </h4>
            <div className="bg-[#2C1810] p-4 rounded-2xl border border-[#3E2317] space-y-2 text-xs text-stone-300">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Target:</span>
                <span className="text-emerald-400 font-semibold font-mono">Netlify Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Build:</span>
                <span className="font-mono text-[11px] bg-[#1E110A] px-2 py-0.5 rounded text-amber-300">npm run build</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Publish:</span>
                <span className="font-mono text-[11px] bg-[#1E110A] px-2 py-0.5 rounded text-amber-300">dist</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#3E2317]">
                <span className="text-stone-400">Database:</span>
                <span className="text-[#E2BA8A] font-semibold">Google Sheets</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2C1810] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} MI CAFE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSheetsGuideOpen(true)}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sheet className="w-3.5 h-3.5" />
              <span>Google Apps Script Status</span>
            </button>
            <button
              onClick={scrollToTop}
              className="hover:text-[#E2BA8A] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
