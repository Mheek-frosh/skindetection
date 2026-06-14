import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { useScan } from '../context/ScanContext';
import Button from './Button';

const countriesList = [
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'India', flag: '🇮🇳' },
];

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, registerUser, loginUser } = useScan();
  const [activeTab, setActiveTab] = useState('register'); // 'register' or 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (activeTab === 'register' && !name.trim()) {
      tempErrors.name = 'Full name is required';
    }
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email format is invalid';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (activeTab === 'register') {
      registerUser({
        name,
        email,
        country: selectedCountry,
        registeredAt: new Date().toISOString()
      });
    } else {
      // Mock Login logic
      loginUser(email, email.split('@')[0]);
    }

    // Reset Form
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white border border-slate-100 shadow-2xl rounded-3xl w-full max-w-md overflow-hidden z-10"
          >
            {/* Top Color strip */}
            <div className="h-1.5 bg-gradient-to-r from-brand-400 to-medgreen-400" />
            
            {/* Close Button */}
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="p-6 md:p-8">
              {/* Logo / Header */}
              <div className="flex flex-col items-center text-center gap-1.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">
                  {activeTab === 'register' ? 'Join DermaScanAI' : 'Welcome Back'}
                </h3>
                <p className="text-slate-400 text-xs max-w-[260px] leading-relaxed">
                  {activeTab === 'register' 
                    ? 'Create an account to save, log, and view your scan history.' 
                    : 'Sign in to access your saved diagnostic logs.'}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="grid grid-cols-2 bg-slate-550 bg-slate-100/60 p-1.5 rounded-2xl mb-6 border border-slate-100">
                <button
                  onClick={() => { setActiveTab('register'); setErrors({}); }}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Create Account
                </button>
                <button
                  onClick={() => { setActiveTab('login'); setErrors({}); }}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Name (Register Only) */}
                {activeTab === 'register' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                          errors.name 
                            ? 'border-red-300 focus:ring-2 focus:ring-red-200' 
                            : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10'
                        }`}
                      />
                    </div>
                    {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name}</span>}
                  </div>
                )}

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.email 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10'
                      }`}
                    />
                  </div>
                  {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email}</span>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.password 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10'
                      }`}
                    />
                  </div>
                  {errors.password && <span className="text-[10px] text-red-500 font-medium">{errors.password}</span>}
                </div>

                {/* Country (Register Only) */}
                {activeTab === 'register' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Country of Residence</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all cursor-pointer"
                      >
                        {countriesList.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full mt-2"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  {activeTab === 'register' ? 'Register Account' : 'Sign In'}
                </Button>
              </form>

              {/* Disclaimer */}
              <div className="mt-6 text-[10px] text-slate-400 text-center leading-relaxed">
                By registering, you agree to our terms of service and acknowledge the medical disclaimer. Your scan files are stored locally.
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
