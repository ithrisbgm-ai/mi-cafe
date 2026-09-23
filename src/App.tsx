/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { GoogleSheetsGuideModal } from './components/GoogleSheetsGuideModal';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col font-sans selection:bg-[#C89B6D] selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <Menu />
          <About />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals and Drawers */}
        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <GoogleSheetsGuideModal />

        {/* Floating WhatsApp Action */}
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
