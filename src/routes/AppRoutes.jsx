import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from '../pages/LandingPage';
import UploadPage from '../pages/UploadPage';
import ResultPage from '../pages/ResultPage';
import HistoryPage from '../pages/HistoryPage';
import AboutPage from '../pages/AboutPage';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <LandingPage />
            </PageWrapper>
          }
        />
        <Route
          path="/upload"
          element={
            <PageWrapper>
              <UploadPage />
            </PageWrapper>
          }
        />
        <Route
          path="/result"
          element={
            <PageWrapper>
              <ResultPage />
            </PageWrapper>
          }
        />
        <Route
          path="/history"
          element={
            <PageWrapper>
              <HistoryPage />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <AboutPage />
            </PageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageWrapper>
              <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
                <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
                <p className="text-slate-400 mt-2">The requested path does not exist.</p>
              </div>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.main>
  );
};
