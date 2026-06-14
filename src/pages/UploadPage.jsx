import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, HeartPulse } from 'lucide-react';
import { useScan } from '../context/ScanContext';
import UploadBox from '../components/UploadBox';

export default function UploadPage() {
  const { loading, loadingMessage, activeScan } = useScan();
  const navigate = useNavigate();

  // Automatically navigate to results page when scan completes
  useEffect(() => {
    if (activeScan && !loading) {
      navigate('/result');
    }
  }, [activeScan, loading, navigate]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 flex-grow flex items-center justify-center min-h-[70vh]">
      {!loading ? (
        <div className="w-full flex flex-col gap-8">
          
          {/* Header Area */}
          <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
              Analyze Skin Concern
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              Upload a clear closeup image of your skin concern. The Convolutional Neural Network (CNN) will run automated feature classification.
            </p>
          </div>

          {/* Upload Component */}
          <UploadBox />
          
        </div>
      ) : (
        /* CNN Processing Spinner screen */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto"
        >
          {/* Scanning Radar Visual */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Pulsing border circles */}
            <div className="absolute inset-0 rounded-full border-4 border-brand-500/10 animate-ping [animation-duration:2.5s]" />
            <div className="absolute inset-2 rounded-full border-4 border-medgreen-500/20 animate-pulse [animation-duration:1.5s]" />
            
            {/* Spinning indicator */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-t-4 border-l-4 border-brand-500 border-r-4 border-r-transparent border-b-4 border-b-transparent"
            />

            {/* Center medical heart icon */}
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-brand-500/10">
              <HeartPulse className="w-8 h-8 text-brand-400 animate-pulse" />
            </div>
          </div>

          <h3 className="font-semibold text-slate-800 text-lg mb-1">
            Analyzing Skin Layers
          </h3>
          
          {/* Dynamic loading text */}
          <div className="h-6 mt-1 mb-8 overflow-hidden">
            <motion.p
              key={loadingMessage}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              className="text-brand-600 text-xs font-semibold tracking-wide uppercase"
            >
              {loadingMessage}
            </motion.p>
          </div>

          {/* Progress loader bar */}
          <div className="w-full max-w-xs bg-slate-100 rounded-full h-1.5 overflow-hidden mb-6">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              className="bg-gradient-to-r from-brand-500 to-medgreen-500 h-full rounded-full"
            />
          </div>

          <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
            Please keep your browser tab active. All scan logs are encrypted end-to-end.
          </p>
        </motion.div>
      )}
    </div>
  );
}
