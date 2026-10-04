import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Newsletter = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({
        title: 'Valid Email Required',
        message: 'Please provide a valid email address to receive your promo code.',
        type: 'error',
      });
      return;
    }

    setIsSubscribed(true);
    addToast({
      title: 'Welcome to Saideep Collection Club!',
      message: 'Here is your 10% discount voucher: FIRSTORDER',
      type: 'success',
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FIRSTORDER');
    setCopied(true);
    addToast({
      title: 'Code Copied!',
      message: 'Code "FIRSTORDER" copied to your clipboard.',
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 sm:py-20 bg-brand-dark text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-brand-surface border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE INNER CIRCLE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-3">
          Get 10% Off Your First Order
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-light">
          Subscribe for privileged early access to festive drop releases, private styling previews, and curated couture updates.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-brand-surface border border-white/20 text-white placeholder-gray-400 pl-12 pr-4 py-3.5 rounded-lg focus:outline-none focus:border-brand-gold text-sm transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-lg shadow-brand-red/30 transition-all duration-300 flex items-center justify-center gap-2 group hover:translate-y-[-1px]"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-3">
              We respect your privacy. No spam, strictly refined fashion dispatches.
            </p>
          </form>
        ) : (
          <div className="bg-brand-surface border border-brand-gold/40 p-6 rounded-2xl max-w-md mx-auto text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">You're on the VIP list!</h4>
            <p className="text-xs text-gray-300 mb-4">Use your voucher code at checkout:</p>
            
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-xl font-bold text-brand-gold tracking-widest bg-brand-dark px-4 py-2 rounded-lg border border-brand-gold/50">
                FIRSTORDER
              </span>
              <button
                onClick={handleCopyCode}
                className="bg-brand-red hover:bg-brand-red-hover text-white p-2.5 rounded-lg transition-colors"
                title="Copy Code"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {copied && (
              <span className="text-xs text-emerald-400 font-semibold block mt-2 animate-fade-in">
                Copied to clipboard!
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
