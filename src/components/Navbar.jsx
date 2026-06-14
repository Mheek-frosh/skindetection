import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Globe, ChevronDown, Menu, X, Check, User, LogOut } from 'lucide-react';
import { useScan } from '../context/ScanContext';

const countries = [
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'India', flag: '🇮🇳' },
];

export default function Navbar() {
  const { country, setCountry, user, logoutUser, setAuthModalOpen, showToast } = useScan();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCountry = countries.find(c => c.name === country) || countries[0];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Scan Upload', path: '/upload' },
    { name: 'Scan History', path: '/history' },
    { name: 'About System', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/85 backdrop-blur-md">
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
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setUserDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-sm font-medium text-slate-700 transition-all cursor-pointer"
            >
              <span className="text-base leading-none">{activeCountry.flag}</span>
              <span>{activeCountry.name}</span>
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
                    className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-apple z-20"
                  >
                    {countries.map((c) => (
                      <li key={c.name}>
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

          {/* User Account / Register Action */}
          {user ? (
            /* Logged In User Avatar Dropdown */
            <div className="relative">
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setDropdownOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-100 border border-brand-100 flex items-center justify-center font-bold text-xs text-brand-700 hover:text-brand-800 shadow-sm cursor-pointer transition-all hover:scale-102"
              >
                {getInitials(user.name)}
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white p-3 shadow-apple z-20 flex flex-col gap-2"
                    >
                      {/* User metadata header */}
                      <div className="px-2 py-1">
                        <div className="text-xs font-bold text-slate-800 truncate">{user.name}</div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">{user.email}</div>
                        <div className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 inline-block mt-2">
                          Region: {user.country || country}
                        </div>
                      </div>
                      
                      <hr className="border-slate-100" />
                      
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logoutUser();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-red-500 hover:text-red-650 hover:bg-red-50/50 rounded-xl text-left cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Guest Register Button */
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4.5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold text-sm transition-all shadow-md shadow-brand-500/10 cursor-pointer"
            >
              Register
            </button>
          )}
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
                      <li key={c.name}>
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
                  className={`text-sm font-medium py-1.5 px-2 rounded-lg ${
                    location.pathname === link.path ? 'text-brand-600 bg-brand-50/50' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <hr className="border-slate-100 my-1" />
              
              {user ? (
                <div className="flex flex-col gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-700 truncate">{user.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logoutUser();
                    }}
                    className="w-full mt-2 py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4.5 h-4.5" />
                    Log Out Account
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm text-center cursor-pointer shadow-md shadow-brand-500/10"
                >
                  Register Account
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
