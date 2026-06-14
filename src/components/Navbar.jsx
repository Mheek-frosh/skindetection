import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Globe, ChevronDown, Menu, X, Check } from 'lucide-react';
import { useScan } from '../context/ScanContext';

const countries = [
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'India', code: 'IN', flag: '🇮🇳' },
];

export default function Navbar() {
  const { country, setCountry, showToast } = useScan();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCountry = countries.find(c => c.name === country) || countries[0];

  const handleRegister = () => {
    showToast('Registration is simulated! Welcome aboard.');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Scan Upload', path: '/upload' },
    { name: 'Scan History', path: '/history' },
    { name: 'About System', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/10 group-hover:bg-brand-600 transition-colors">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-sans font-bold text-lg tracking-tight text-slate-800">
            DermaScan<span className="text-brand-500">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Nav Options */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Country Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-sm font-medium text-slate-700 transition-all cursor-pointer"
            >
              <span className="text-base leading-none">{activeCountry.flag}</span>
              <span>{activeCountry.code}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <motion.ul
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-apple z-20"
                  >
                    {countries.map((c) => (
                      <li key={c.code}>
                        <button
                          onClick={() => {
                            setCountry(c.name);
                            setDropdownOpen(false);
                            showToast(`Country switched to ${c.name} ${c.flag}`, 'info');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm transition-colors cursor-pointer hover:bg-slate-50 ${
                            country === c.name ? 'text-brand-600 font-medium bg-brand-50/50' : 'text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </span>
                          {country === c.name && <Check className="w-4 h-4 text-brand-600" />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-medium text-sm transition-all shadow-md shadow-brand-500/10 cursor-pointer"
          >
            Register
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Country selector */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              <span>{activeCountry.flag}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <motion.ul
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-100 bg-white p-1 shadow-apple z-20"
                  >
                    {countries.map((c) => (
                      <li key={c.code}>
                        <button
                          onClick={() => {
                            setCountry(c.name);
                            setDropdownOpen(false);
                            showToast(`Country switched to ${c.name} ${c.flag}`, 'info');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left text-xs hover:bg-slate-50 cursor-pointer text-slate-700"
                        >
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-1 px-2 rounded-lg ${
                    location.pathname === link.path ? 'text-brand-600 bg-brand-50/50' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100 my-1" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRegister();
                }}
                className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm text-center cursor-pointer shadow-md shadow-brand-500/10"
              >
                Register Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
