import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './BrandIcons';
import { useUIModal } from '../context/UIModalContext';

export const Footer = ({ onNavigate, onFilterCategory }) => {
  const { openSizeGuide } = useUIModal();

  return (
    <footer className="bg-brand-darker text-gray-300 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Brand Info & Logo Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="/assets/logo_transparent.png"
                alt="Saideep Collection Logo"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Saideep Collection celebrates the rich heritage of Indian menswear and ethnic fashion. Bringing together master craftsmanship, luxury handloom weaves, and contemporary festive tailoring for every distinguished occasion.
            </p>

            {/* Social Channels */}
            <div className="flex items-center space-x-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-300 text-emerald-400 border border-white/10"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-600 hover:text-white flex items-center justify-center transition-all duration-300 text-pink-400 border border-white/10"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 text-blue-400 border border-white/10"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5 border-l-2 border-brand-red pl-2.5">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-brand-gold transition-colors text-left"
                >
                  All Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory({ department: 'men' })}
                  className="hover:text-brand-gold transition-colors text-left"
                >
                  Men's Fashion
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory({ department: 'women' })}
                  className="hover:text-brand-gold transition-colors text-left"
                >
                  Women's Kurtis & Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory({ department: 'kids' })}
                  className="hover:text-brand-gold transition-colors text-left"
                >
                  Kids' Festive Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory({ category: 'Ethnic Wear' })}
                  className="hover:text-brand-gold transition-colors text-left"
                >
                  Ethnic & Royal Kurtas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterCategory({ isNewArrival: true })}
                  className="hover:text-brand-gold transition-colors text-left flex items-center gap-1.5"
                >
                  <span>New Arrivals</span>
                  <span className="text-[10px] bg-brand-red text-white px-1.5 py-0.2 rounded font-bold">NEW</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick & Customer Care Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5 border-l-2 border-brand-gold pl-2.5">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={openSizeGuide} className="hover:text-brand-gold transition-colors">
                  Size Guide & Measurements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping-policy')} className="hover:text-white transition-colors">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('return-policy')} className="hover:text-white transition-colors">
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5 border-l-2 border-brand-red pl-2.5">
              Store & Support
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Saideep Collection Flagship Store, Gandhi Chowk, Textile Market, Surat, Gujarat – 395002, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210 / +91 98765 43211
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="mailto:care@saideepcollection.com" className="hover:text-white transition-colors">
                  care@saideepcollection.com
                </a>
              </li>
              <li className="text-[11px] text-gray-400 bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="font-semibold text-white block mb-0.5">Mon - Sat: 10:00 AM – 8:30 PM IST</span>
                Sunday: 11:00 AM – 6:00 PM IST
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white font-semibold">Saideep Collection</strong>. All rights reserved. Handcrafted in India.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              100% Verified SSL Secure
            </span>
            <span>•</span>
            <span>UPI / Cards / Net Banking / COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
