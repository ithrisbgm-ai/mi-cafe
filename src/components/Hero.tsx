import React from 'react';
import { ArrowRight, Flame, Clock, Award, Coffee, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Hero: React.FC = () => {
  const { setIsCartOpen } = useCart();

  return (
    <section id="home" className="relative overflow-hidden bg-[#2C1810] text-[#FAF7F2] py-20 lg:py-28">
      {/* Ambient background glow & coffee bean textures */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C89B6D] blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#B8834F] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3E2317] border border-[#C89B6D]/40 text-[#E2BA8A] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C89B6D] animate-pulse" />
              <span>Artisanal Coffee & Oven Bakes</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
              Freshly Brewed at <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2BA8A] via-[#C89B6D] to-[#E5C29F]">
                MI CAFE
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#FAF7F2]/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Step into an aromatic haven of small-batch roasted single-origin Arabica, velvety handcrafted drinks, and oven-fresh pastries. Order for quick pickup or relaxed dine-in with table service.
            </p>

            {/* Call to actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C89B6D] to-[#B8834F] text-[#2C1810] font-bold text-base hover:from-[#d5a87b] hover:to-[#c6915b] shadow-lg shadow-[#C89B6D]/20 active:scale-95 transition-all"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#3E2317] border border-[#C89B6D]/50 text-[#FAF7F2] font-semibold text-base hover:bg-[#4A2E18] hover:border-[#C89B6D] transition-all cursor-pointer"
              >
                <Coffee className="w-5 h-5 text-[#C89B6D]" />
                <span>View My Cart</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#4A2E18]/80 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <div className="w-9 h-9 rounded-full bg-[#3E2317] flex items-center justify-center text-[#C89B6D] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FAF7F2]">100% Arabica</p>
                  <p className="text-[10px] text-[#FAF7F2]/60">Ethically Sourced</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-9 h-9 rounded-full bg-[#3E2317] flex items-center justify-center text-[#C89B6D] shrink-0">
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FAF7F2]">Fresh Roast</p>
                  <p className="text-[10px] text-[#FAF7F2]/60">Hand-ground Daily</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-9 h-9 rounded-full bg-[#3E2317] flex items-center justify-center text-[#C89B6D] shrink-0">
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FAF7F2]">Fast Prep</p>
                  <p className="text-[10px] text-[#FAF7F2]/60">5-10 Min Pickup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative border */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#C89B6D]/40 via-transparent to-[#E2BA8A]/30 blur-sm" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C89B6D]/30 bg-[#1E110A]">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
                  alt="Barista brewing artisan coffee at MI CAFE"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating special tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#2C1810]/90 backdrop-blur-md border border-[#C89B6D]/40 rounded-xl p-3.5 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#C89B6D] flex items-center justify-center text-[#2C1810] font-bold">
                      ☕
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#FAF7F2]">Signature Caramel Macchiato</p>
                      <p className="text-[11px] text-[#E2BA8A]">Special House Vanilla & Cold Crema</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-[#FAF7F2] bg-[#3E2317] px-2.5 py-1 rounded-md border border-[#C89B6D]/40">
                    ₹240
                  </span>
                </div>
              </div>

              {/* Little floating rating bubble */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#FAF7F2] text-[#2C1810] rounded-xl px-4 py-2.5 shadow-xl border border-[#C89B6D] items-center gap-2.5">
                <span className="text-xl">⭐️</span>
                <div>
                  <p className="text-xs font-bold leading-none">4.9 / 5.0</p>
                  <p className="text-[10px] text-stone-600">Over 3,000+ happy patrons</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
