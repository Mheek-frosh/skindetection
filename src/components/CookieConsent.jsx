import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Info } from 'lucide-react';
import Button from './Button';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner after 1.5 seconds if consent not set
    const consent = localStorage.getItem('dermascan_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dermascan_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('dermascan_cookie_consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 inset-x-4 md:left-6 md:right-auto z-45 max-w-md pointer-events-auto"
        >
          <div className="border border-slate-100/80 rounded-3xl p-5 shadow-2xl glassmorphism flex flex-col gap-4 relative overflow-hidden">
            {/* Soft decorative green/blue radial dot */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-400/10 blur-xl pointer-events-none" />

            <div className="flex items-start gap-3.5">
              {/* Cookie Icon */}
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5" />
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">We Value Your Privacy</h4>
                  <button 
                    onClick={() => setVisible(false)}
                    className="text-slate-400 hover:text-slate-600 rounded-lg p-0.5 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-slate-500 text-[11px] leading-relaxed mt-1.5">
                  We use cookies and client local storage to optimize your experience, process model features, and save your scan history safely. Learn more in our <a href="#privacy" className="text-brand-500 hover:underline font-semibold">Privacy Policy</a>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1 border-t border-slate-100/50">
              <button 
                onClick={handleDecline}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Decline
              </button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleAccept}
                className="text-xs px-4 py-2"
              >
                Accept All Cookies
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
