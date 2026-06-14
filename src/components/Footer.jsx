import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse } from 'lucide-react';
import { useScan } from '../context/ScanContext';

export default function Footer() {
  const { country } = useScan();

  return (
    <footer className="border-t border-slate-100 bg-slate-50/50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Slogan */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-slate-800">
                DermaScan<span className="text-brand-500">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Empowering individuals with instant, convolutional neural network (CNN) powered insights on dermatological conditions.
            </p>
            <div className="text-[11px] text-slate-400">
              Serving: <span className="font-semibold text-slate-500">{country}</span> (Regional Server)
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-brand-600 transition-colors">Home Page</Link>
              <Link to="/upload" className="hover:text-brand-600 transition-colors">Scan Upload</Link>
              <Link to="/history" className="hover:text-brand-600 transition-colors">Scan History</Link>
              <Link to="/about" className="hover:text-brand-600 transition-colors">About System</Link>
            </div>
          </div>

          {/* Legal / Policy */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <a href="#privacy" className="hover:text-brand-600 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-brand-600 transition-colors">Terms of Service</a>
              <a href="#disclaimer" className="hover:text-brand-600 transition-colors">Medical Disclaimer</a>
            </div>
          </div>

        </div>

        {/* Disclaimer Area */}
        <div className="mt-10 pt-6 border-t border-slate-100/80 flex flex-col md:flex-row items-start md:items-center gap-4 text-[11px] text-slate-400 bg-white/50 p-4 rounded-xl border border-slate-100">
          <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-600">Medical Disclaimer:</span> This software is a demonstration of Convolutional Neural Networks (CNNs) in dermatology. The predictions and scores generated are purely informational and do not represent a professional clinical diagnosis. Always consult a certified healthcare professional or dermatologist for any skin concerns.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>&copy; {new Date().getFullYear()} DermaScanAI. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Powered by ResNet50 Classifier</span>
            <span>&bull;</span>
            <span>Vite + React</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
