import React, { useState, useRef } from 'react';
import { Upload, Camera, Trash2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import { useScan } from '../context/ScanContext';

const mockCameraImages = [
  'https://images.unsplash.com/photo-1607606320832-2968c70d90ed?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508186227448-7a6cf626504c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13edd793be?w=600&auto=format&fit=crop&q=80'
];

export default function UploadBox() {
  const { startScan, loading } = useScan();
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCameraActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCameraMock = () => {
    setCameraActive(true);
    setSelectedImage(null);
    setPreviewUrl('');
  };

  const captureCameraMock = () => {
    // Select a random mock camera image (skin texture / closeups)
    const randomIdx = Math.floor(Math.random() * mockCameraImages.length);
    const mockImgUrl = mockCameraImages[randomIdx];
    
    setSelectedImage(mockImgUrl);
    setPreviewUrl(mockImgUrl);
    setCameraActive(false);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setCameraActive(false);
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      startScan(selectedImage);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="relative overflow-hidden border-slate-100">
        
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 to-medgreen-400" />
        
        <div className="p-2">
          {/* Active Upload Area */}
          {!previewUrl && !cameraActive && (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[300px] ${
                dragActive
                  ? 'border-brand-500 bg-brand-50/20 scale-[0.99]'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4 shadow-sm">
                <Upload className="w-8 h-8" />
              </div>

              <h3 className="font-semibold text-slate-800 text-lg mb-1">
                Drag and drop your skin image here
              </h3>
              <p className="text-slate-400 text-xs max-w-sm mb-6 leading-relaxed">
                Supports JPG, PNG formats. Please ensure the area is well lit and centered for optimal accuracy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-center" onClick={e => e.stopPropagation()}>
                <Button variant="outline" size="sm" onClick={triggerFileInput}>
                  Browse Files
                </Button>
                <Button variant="secondary" size="sm" iconLeft={<Camera className="w-3.5 h-3.5" />} onClick={handleCameraMock}>
                  Use Camera (Mock)
                </Button>
              </div>
            </div>
          )}

          {/* Camera Viewport Simulation */}
          {cameraActive && (
            <div className="rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden relative min-h-[350px] flex flex-col justify-between">
              
              {/* Overlay guides */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-10">
                <div className="w-64 h-64 border-2 border-dashed border-medgreen-400/70 rounded-full flex items-center justify-center relative">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-medgreen-400 absolute top-0 left-0" />
                  <div className="w-4 h-4 border-t-2 border-r-2 border-medgreen-400 absolute top-0 right-0" />
                  <div className="w-4 h-4 border-b-2 border-l-2 border-medgreen-400 absolute bottom-0 left-0" />
                  <div className="w-4 h-4 border-b-2 border-r-2 border-medgreen-400 absolute bottom-0 right-0" />
                  <span className="text-[10px] text-medgreen-400 uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded-full font-semibold">
                    Align Lesion
                  </span>
                </div>
              </div>

              {/* simulated camera static */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

              {/* Status Header */}
              <div className="bg-slate-950/80 px-4 py-3 border-b border-white/5 flex justify-between items-center text-xs text-white z-10">
                <span className="flex items-center gap-1.5 font-medium text-medgreen-400">
                  <span className="w-2 h-2 rounded-full bg-medgreen-500 animate-pulse" />
                  WEB-CAMERA MODE
                </span>
                <span className="text-white/40">Focal length: 35mm</span>
              </div>

              {/* Center message */}
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-white/80 gap-3">
                <Camera className="w-12 h-12 text-slate-600 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold">Camera Feeder Active</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Please position your device camera so that the skin concern fits within the guidelines.
                  </p>
                </div>
              </div>

              {/* Camera Actions Footer */}
              <div className="bg-slate-950/80 px-4 py-4 border-t border-white/5 flex justify-between gap-3 items-center z-10">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={handleClear}>
                  Cancel
                </Button>
                <Button variant="medical" size="md" iconLeft={<Sparkles className="w-4 h-4" />} onClick={captureCameraMock}>
                  Simulate Capture
                </Button>
                <div className="w-10" />
              </div>

            </div>
          )}

          {/* Image Preview Area */}
          {previewUrl && (
            <div className="flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-2 min-h-[300px]">
                <img
                  src={previewUrl}
                  alt="Skin Scan Preview"
                  className="max-h-[320px] rounded-xl object-contain shadow-sm"
                />
                <button
                  onClick={handleClear}
                  className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-90 hover:scale-105 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* File Info & Analysis Prompt */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">Scan Ready for Processing</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      CNN will run a feature classifier to check for matching patterns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="md" className="flex-grow sm:flex-grow-0" onClick={handleClear} disabled={loading}>
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-grow sm:flex-grow-0"
                    loading={loading}
                    onClick={handleAnalyze}
                    iconRight={<Sparkles className="w-4 h-4" />}
                  >
                    Analyze Skin
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
