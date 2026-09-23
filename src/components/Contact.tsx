import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Table Reservation',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', subject: 'Table Reservation', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2] text-[#2C1810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE6D8] text-[#8C5D33] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Or Connect</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C1810]">
            We’d Love to Welcome You
          </h2>

          <p className="text-base text-stone-600">
            Drop by for a warm cup, book a cozy lounge table for work or celebration, or get in touch for custom catering.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#2C1810] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-[#4A2E18]">
              <h3 className="font-display text-2xl font-bold text-[#E2BA8A]">
                MI CAFE Flagship
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#3E2317] flex items-center justify-center text-[#C89B6D] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Our Address</h5>
                    <p className="text-stone-300 text-xs mt-0.5 leading-relaxed">
                      104 Artisan Promenade, Heritage Roastery Square, Indiranagar, Bengaluru 560038
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#3E2317] flex items-center justify-center text-[#C89B6D] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Café Hours</h5>
                    <p className="text-stone-300 text-xs mt-0.5">
                      Monday – Sunday: 7:00 AM – 11:00 PM
                    </p>
                    <p className="text-[11px] text-[#C89B6D]">
                      Fresh bakery batches at 7:30 AM & 3:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#3E2317] flex items-center justify-center text-[#C89B6D] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Direct Line</h5>
                    <a
                      href="tel:+919876543210"
                      className="text-stone-300 text-xs hover:text-[#E2BA8A] transition-colors"
                    >
                      +91 98765 43210 / +91 80 4123 9876
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#3E2317] flex items-center justify-center text-[#C89B6D] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Email Inquiries</h5>
                    <a
                      href="mailto:hello@micafe.com"
                      className="text-stone-300 text-xs hover:text-[#E2BA8A] transition-colors"
                    >
                      hello@micafe.com / orders@micafe.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-[#4A2E18]">
                <a
                  href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%20MI%20CAFE!%20I%20would%20like%20to%20inquire%20about%20ordering%20or%20booking%20a%20table."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Host on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#DFD3BF] shadow-xs">
            <h3 className="font-display text-2xl font-bold text-[#2C1810] mb-2">
              Send a Note or Table Reservation
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Have a special dietary request or planning a small meetup? Fill in the details below.
            </p>

            {formSent ? (
              <div className="py-12 text-center space-y-3 bg-[#FAF7F2] rounded-2xl border border-emerald-300 p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-display text-xl font-bold text-[#2C1810]">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Our cafe host will reach out to you within 30 minutes. We look forward to serving you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Arjun Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFD3BF] text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C89B6D]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="arjun@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFD3BF] text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C89B6D]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Purpose</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFD3BF] text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C89B6D]"
                  >
                    <option value="Table Reservation">Table Reservation (Evening / Weekend)</option>
                    <option value="Custom Coffee Catering">Custom Coffee Catering / Bulk Beans</option>
                    <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                    <option value="Career & Barista Apprenticeship">Career / Barista Application</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us details (number of guests, date, preferred seating, or inquiry)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFD3BF] text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C89B6D] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2C1810] hover:bg-[#3E2317] text-[#FAF7F2] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#E2BA8A]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
