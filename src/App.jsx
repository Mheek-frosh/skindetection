import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ScanProvider } from './context/ScanContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import AuthModal from './components/AuthModal';
import CookieConsent from './components/CookieConsent';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <ScanProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50/30 selection:bg-brand-100 selection:text-brand-900 font-sans">
          
          {/* Global Header Navigation */}
          <Navbar />
          
          {/* Dynamic App Pages wrapper */}
          <div className="flex-grow flex flex-col">
            <AppRoutes />
          </div>
          
          {/* Global Footer Area */}
          <Footer />

          {/* Floating Toast Alert Banner */}
          <ToastContainer />

          {/* Authentication Modal Dialog */}
          <AuthModal />

          {/* Cookie Acceptance Dialog */}
          <CookieConsent />
          
        </div>
      </Router>
    </ScanProvider>
  );
}
