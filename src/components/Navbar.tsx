import React, { useState } from 'react';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Sheet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getActiveGoogleScriptUrl, GOOGLE_SCRIPT_URL } from '../config';

export const Navbar: React.FC = () => {
  const { cartCount, cartSubtotal, setIsCartOpen, setIsSheetsGuideOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeUrl = getActiveGoogleScriptUrl();
  const isCustomUrlSet = activeUrl && activeUrl !== GOOGLE_SCRIPT_URL;

  return (
    <header className="sticky top-0 z-40 bg-[#2C1810]/95 backdrop-blur-md border-b border-[#4A2E18] text-[#FAF7F2] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#C89B6D] to-[#E2BA8A] flex items-center justify-center text-[#2C1810] shadow-lg shadow-[#C89B6D]/20 group-hover:scale-105 transition-transform">
              <Coffee className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-wider text-[#FAF7F2] group-hover:text-[#E2BA8A] transition-colors">
                MI CAFE
              </span>
              <p className="text-[10px] tracking-[0.25em] text-[#C89B6D] uppercase font-semibold">
                Artisan Roastery
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-sm font-medium text-[#FAF7F2]/85 hover:text-[#E2BA8A] transition-colors"
            >
              Home
            </a>
            <a
              href="#menu"
              className="text-sm font-medium text-[#FAF7F2]/85 hover:text-[#E2BA8A] transition-colors"
            >
              Menu
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-[#FAF7F2]/85 hover:text-[#E2BA8A] transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-[#FAF7F2]/85 hover:text-[#E2BA8A] transition-colors"
            >
              Contact
            </a>

            {/* Google Sheets status pill */}
            <button
              onClick={() => setIsSheetsGuideOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#3E2317] border border-[#C89B6D]/30 text-[#E2BA8A] hover:bg-[#4A2E18] hover:border-[#C89B6D] transition-all"
              title="Google Sheets Apps Script Integration"
            >
              <Sheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isCustomUrlSet ? 'Sheets: Connected' : 'Google Sheets'}</span>
            </button>
          </nav>

          {/* Right Action: Cart Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C89B6D] to-[#B8834F] text-[#2C1810] font-semibold text-sm shadow-md hover:from-[#d5a87b] hover:to-[#c6915b] hover:shadow-lg hover:shadow-[#C89B6D]/25 active:scale-95 transition-all cursor-pointer"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#2C1810] text-[#E2BA8A] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#E2BA8A]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="hidden sm:inline pl-1 border-l border-[#2C1810]/20 font-bold">
                  ₹{cartSubtotal}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#FAF7F2] hover:bg-[#3E2317] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1F110B] border-b border-[#4A2E18] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#FAF7F2] hover:bg-[#2C1810] hover:text-[#E2BA8A]"
          >
            Home
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#FAF7F2] hover:bg-[#2C1810] hover:text-[#E2BA8A]"
          >
            Menu
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#FAF7F2] hover:bg-[#2C1810] hover:text-[#E2BA8A]"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#FAF7F2] hover:bg-[#2C1810] hover:text-[#E2BA8A]"
          >
            Contact
          </a>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSheetsGuideOpen(true);
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium bg-[#2C1810] text-[#E2BA8A] border border-[#C89B6D]/30"
          >
            <span className="flex items-center gap-2">
              <Sheet className="w-4 h-4 text-emerald-400" />
              Google Sheets Apps Script
            </span>
            <span className="text-xs text-stone-400">Setup Guide →</span>
          </button>
        </div>
      )}
    </header>
  );
};
