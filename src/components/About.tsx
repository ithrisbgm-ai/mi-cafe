import React from 'react';
import { Coffee, Heart, Award, Users, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F5EFE6] text-[#2C1810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Images collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DFD3BF]">
                  <img
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"
                    alt="Artisan coffee beans roasting"
                    className="w-full h-52 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-[#2C1810] text-[#FAF7F2] p-5 rounded-2xl border border-[#4A2E18] shadow-lg">
                  <div className="font-display text-3xl font-bold text-[#E2BA8A]">100%</div>
                  <p className="text-xs text-[#FAF7F2]/80 mt-1">
                    Specialty grade Arabica coffee harvested through direct trade partnerships.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#DFD3BF] shadow-lg">
                  <div className="font-display text-3xl font-bold text-[#2C1810]">15+</div>
                  <p className="text-xs text-stone-600 mt-1">
                    Years of combined artisan barista & pastry craftsmanship.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DFD3BF]">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                    alt="Cozy interior of MI CAFE"
                    className="w-full h-52 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#C89B6D] text-[#2C1810] font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <Award className="w-4 h-4" />
              <span>Awarded Best Neighborhood Roastery</span>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADFCF] text-[#8C5D33] text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#8C5D33]" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C1810] leading-tight">
              Crafted with Soul, <br />
              Poured with Heart.
            </h2>

            <p className="text-base text-stone-700 leading-relaxed">
              At <strong>MI CAFE</strong>, coffee isn’t just a morning habit—it is a sensory ritual. Founded with a deep passion for botanical terroir and culinary precision, our beans are sourced directly from sustainable high-altitude estates in Chikmagalur and Kodagu.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              Every morning our master bakers roll organic sourdough, whisk velvety mascarpone for tiramisu, and calibrate our espresso extractions down to the milligram. Whether you’re meeting friends, reading your favorite book, or grabbing a quick espresso on the move, MI CAFE is your home away from home.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {[
                'Micro-batch weekly drum roasting for maximum aromatic clarity',
                'Slow-steeped 18-hour cold brew & single-origin pour-overs',
                'Freshly laminated butter croissants and wholesome gourmet sourdoughs',
                'Seamless mobile ordering & instant table dispatch'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#2C1810]">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#2C1810] text-[#E2BA8A] flex items-center justify-center font-display font-bold text-lg">
                  MI
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1810]">Mihir & Ishaan</h4>
                  <p className="text-xs text-stone-500">Founders & Head Baristas</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
