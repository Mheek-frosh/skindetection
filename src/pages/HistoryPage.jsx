import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Calendar, FileText, ChevronRight, ShieldAlert, Lock, UserPlus } from 'lucide-react';
import { useScan } from '../context/ScanContext';
import Card from '../components/Card';
import Button from '../components/Button';

export default function HistoryPage() {
  const { history, deleteHistoryItem, clearHistory, setActiveScan, user, setAuthModalOpen } = useScan();
  const navigate = useNavigate();

  const handleCardClick = (scan) => {
    setActiveScan(scan);
    navigate('/result');
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'red':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'amber':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  // 1. Auth check: If user is not logged in, render the professional auth locking prompt
  if (!user) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 flex-grow flex items-center justify-center min-h-[65vh]">
        <Card className="max-w-md w-full text-center p-8 border-slate-100 shadow-xl relative overflow-hidden">
          {/* Top color strip */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-400 to-medgreen-400" />
          
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="w-6.5 h-6.5" />
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-2">
            History Log is Locked
          </h2>
          
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto mb-8">
            To view, manage, and log your diagnostic history reports, you must have an active session. Create an account or sign in to proceed.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              size="md"
              iconLeft={<UserPlus className="w-4 h-4" />}
              onClick={() => setAuthModalOpen(true)}
            >
              Sign Up or Sign In
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="text-slate-500 text-xs"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-50 text-[10px] text-slate-400 leading-relaxed">
            All records are stored within your client local storage and linked to your registered profile details.
          </div>
        </Card>
      </div>
    );
  }

  // 2. Normal render for logged in users
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 flex-grow">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Scan History Logs
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Browse through previous skin scan diagnostics processed locally.
          </p>
        </div>
        
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            iconLeft={<Trash2 className="w-4 h-4" />}
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all scan logs? This cannot be undone.')) {
                clearHistory();
              }
            }}
          >
            Clear All Logs
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <Card className="text-center py-16 border-dashed border-2 border-slate-200 shadow-none">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 text-lg mb-1">No Scans Recorded</h3>
          <p className="text-slate-400 text-xs max-w-xs mx-auto mb-6">
            You haven't scanned any skin concern yet. Run your first analysis to begin tracking logs.
          </p>
          <Button variant="primary" onClick={() => navigate('/upload')}>
            Scan Skin Now
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((scan) => (
            <Card
              key={scan.id}
              onClick={() => handleCardClick(scan)}
              className="flex flex-col h-full border-slate-100 hover:border-brand-100 transition-colors"
            >
              {/* Thumbnail header */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 mb-4">
                <img
                  src={scan.imageUrl}
                  alt={scan.diseaseName}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getSeverityStyles(scan.severityColor)}`}>
                  {scan.status}
                </span>
              </div>

              {/* Scan description */}
              <div className="flex-grow flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {scan.date}
                  </span>
                  <span className="text-xs font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                    {scan.confidenceScore}% Acc
                  </span>
                </div>
                
                <h3 className="font-semibold text-slate-800 text-base group-hover:text-brand-500 transition-colors">
                  {scan.diseaseName}
                </h3>
                
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {scan.description}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between border-t border-slate-50 mt-5 pt-4" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => deleteHistoryItem(scan.id)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Delete scan record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleCardClick(scan)}
                  className="text-brand-500 hover:text-brand-600 text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  View Report
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* disclaimer */}
      <div className="mt-12 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3 text-xs text-slate-500 max-w-2xl">
        <ShieldAlert className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-slate-700">Storage Information</p>
          <p className="mt-0.5 leading-relaxed">
            All reports are saved locally inside your browser's client storage (LocalStorage). Clearing cookies, switching devices, or resetting app cache will remove this history log.
          </p>
        </div>
      </div>

    </div>
  );
}
