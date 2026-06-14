import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, ArrowRight, ShieldAlert, Sparkles, RefreshCw, Eye } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import { useScan } from '../context/ScanContext';

export default function ResultDisplay() {
  const { activeScan, clearActiveScan } = useScan();
  const navigate = useNavigate();

  if (!activeScan) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No active scan report found. Please upload a scan first.</p>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const {
    diseaseName,
    confidenceScore,
    status,
    description,
    recommendation,
    date,
    imageUrl,
    severityColor
  } = activeScan;

  // Custom colors matching severity
  const colors = {
    emerald: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      fill: 'text-emerald-500',
      track: 'bg-emerald-50',
      border: 'border-emerald-500'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      fill: 'text-amber-500',
      track: 'bg-amber-50',
      border: 'border-amber-500'
    },
    red: {
      bg: 'bg-red-50 text-red-700 border-red-100',
      fill: 'text-red-500',
      track: 'bg-red-50',
      border: 'border-red-500'
    }
  };

  const activeColor = colors[severityColor] || colors.amber;

  const handleScanAgain = () => {
    clearActiveScan();
    navigate('/upload');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Uploaded Image Card */}
        <div className="md:col-span-5">
          <Card className="p-4 overflow-hidden border-slate-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Scanned Sample Area
            </h3>
            <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/50 aspect-square flex items-center justify-center p-1.5 shadow-inner">
              <img
                src={imageUrl}
                alt="Uploaded skin concern"
                className="w-full h-full object-cover rounded-xl shadow-sm"
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Scanned: {date}
              </span>
              <span className="font-semibold uppercase text-brand-500">CNN-PROCESSED</span>
            </div>
          </Card>
        </div>

        {/* Right Side: Analysis Breakdown Card */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <Card className="relative overflow-hidden border-slate-100">
            {/* Top color strip */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${severityColor === 'red' ? 'bg-red-400' : severityColor === 'amber' ? 'bg-amber-400' : 'bg-emerald-400'}`} />

            <div className="flex flex-col gap-5 pt-2">
              
              {/* Badge & Disease Name */}
              <div>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${activeColor.bg}`}>
                    {status} Severity
                  </span>
                  <span className="text-xs text-slate-400">Model: ResNet50 Classifier</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  {diseaseName}
                </h2>
              </div>

              {/* Confidence Circle Progress & Detail */}
              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                {/* Visual Circle Indicator */}
                <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#f1f5f9"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="transparent"
                      strokeDasharray={175}
                      initial={{ strokeDashoffset: 175 }}
                      animate={{ strokeDashoffset: 175 - (175 * confidenceScore) / 100 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={activeColor.fill}
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-slate-800">{confidenceScore}%</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800">AI Confidence Classification</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    The convolutional neural network detected characteristic visual patterns with {confidenceScore}% certainty.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="text-sm">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Condition Description</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {description}
                </p>
              </div>

              {/* Recommendation */}
              <div className="text-sm">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Suggested Steps</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {recommendation}
                </p>
              </div>

              <hr className="border-slate-100" />

              {/* Liability Disclaimer Warning */}
              <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/60 flex items-start gap-2.5 text-[11px] text-amber-800">
                <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  <strong>Important Disclaimer:</strong> This response is generated automatically via a visual classifier and does not take into account physical palpability, medical history, or laboratory data. It is NOT a substitute for professional clinical advice.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleScanAgain}
                  className="flex-grow sm:flex-grow-0"
                  iconLeft={<RefreshCw className="w-4 h-4" />}
                >
                  Scan Another Patch
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-grow"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                  onClick={() => navigate('/history')}
                >
                  View Scan Log History
                </Button>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
