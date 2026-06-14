import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Brain, Server, ShieldAlert, Cpu, Eye, BookOpen, Layers } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function AboutPage() {
  const [activeLayer, setActiveLayer] = useState(0);

  const cnnLayers = [
    {
      title: '01. Input Skin Patch',
      icon: <Eye className="w-5 h-5 text-brand-500" />,
      desc: 'The original closeup image of the lesion is normalized to standard coordinates (224x224 pixels) and color channels are calibrated for analysis.'
    },
    {
      title: '02. Convolutional Layers',
      icon: <Layers className="w-5 h-5 text-medgreen-500" />,
      desc: 'Dozens of small matrix filters slide across the image, identifying basic geometric features like borders, shadows, pigmentation gradients, and texture scales.'
    },
    {
      title: '03. Max-Pooling Reduction',
      icon: <Cpu className="w-5 h-5 text-brand-500" />,
      desc: 'The spatial resolution of the feature maps is down-sampled, keeping only the most dominant markers and making the classifier invariant to scaling or rotation.'
    },
    {
      title: '04. Dense Classification',
      icon: <Brain className="w-5 h-5 text-medgreen-500" />,
      desc: 'The high-level abstract features are flattened and fed into standard fully-connected nodes, which map the weights to clinical classification probabilities.'
    },
    {
      title: '05. Softmax Output',
      icon: <Server className="w-5 h-5 text-brand-500" />,
      desc: 'The network outputs final diagnosis confidence scores (e.g. Acne: 92%, Eczema: 3%), selecting the highest percentage as the recommendation.'
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 flex-grow flex flex-col gap-16">
      
      {/* Hero Banner Section */}
      <section className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <div className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full border border-slate-100 bg-slate-50 text-slate-600 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          Technical Overview & Architecture
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
          How the CNN Works
        </h1>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
          Understanding the deep learning classification model behind DermaScanAI. Our system employs pre-trained ResNet50 architectures optimized for computer vision in dermatology.
        </p>
      </section>

      {/* CNN Layers Visualization Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left column: explanation list */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-500" />
            CNN Pipeline Architecture
          </h2>
          <div className="flex flex-col gap-3">
            {cnnLayers.map((layer, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLayer(idx)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                  activeLayer === idx
                    ? 'border-brand-100 bg-brand-50/30 shadow-apple-hover scale-[1.01]'
                    : 'border-slate-100 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeLayer === idx ? 'bg-brand-500 text-white' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {layer.icon}
                  </div>
                  <h3 className={`font-semibold text-sm ${activeLayer === idx ? 'text-brand-600' : 'text-slate-700'}`}>
                    {layer.title}
                  </h3>
                </div>
                {activeLayer === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-[11px] text-slate-400 mt-2.5 leading-relaxed"
                  >
                    {layer.desc}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column: visual canvas */}
        <div className="lg:col-span-6 flex justify-center">
          <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-950 text-white min-h-[360px] flex flex-col justify-between shadow-xl">
            <div className="flex justify-between items-center text-xs text-white/50 border-b border-white/5 pb-3 mb-4">
              <span>ACTIVE MODEL VIEWPORT</span>
              <span>Layer: {activeLayer + 1} / 5</span>
            </div>

            {/* Neural network graph nodes mock */}
            <div className="flex-grow flex items-center justify-center p-6 relative">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:12px_12px]" />
              
              <div className="relative flex flex-col gap-6 w-full items-center">
                {/* Node simulator depending on active layer */}
                {activeLayer === 0 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-3">
                    <div className="w-28 h-28 border border-white/10 rounded-xl overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1522337360788-8b13edd793be?w=200" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-brand-500/10 border-2 border-brand-400 animate-pulse" />
                    </div>
                    <span className="text-xs text-white/60 font-medium">Input Skin Matrix (224x224x3)</span>
                  </motion.div>
                )}

                {activeLayer === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-3 w-full max-w-xs">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="border border-white/10 bg-slate-950 rounded-lg p-2 flex flex-col items-center gap-1">
                        <div className="w-full aspect-square bg-brand-500/5 rounded border border-brand-500/20 relative overflow-hidden">
                          <div className="absolute w-full h-0.5 bg-brand-400/40 top-1/2 animate-[bounce_1.5s_infinite]" />
                        </div>
                        <span className="text-[9px] text-white/40">Filt_{i}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeLayer === 2 && (
                  <motion.div initial={{ y: 10 }} animate={{ y: 0 }} className="flex items-center gap-4">
                    <div className="flex flex-col gap-1 bg-slate-950 p-2 rounded border border-white/5">
                      <div className="w-10 h-10 bg-slate-800 rounded border border-white/10" />
                      <span className="text-[8px] text-white/40 text-center">8x8x64</span>
                    </div>
                    <span className="text-white/40">&rarr;</span>
                    <div className="flex flex-col gap-1 bg-slate-950 p-2 rounded border border-brand-500/20 shadow-md shadow-brand-500/5">
                      <div className="w-6 h-6 bg-brand-500/20 rounded border border-brand-500/40" />
                      <span className="text-[8px] text-brand-400 text-center">4x4x64</span>
                    </div>
                  </motion.div>
                )}

                {activeLayer === 3 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col gap-3 w-full max-w-xs bg-slate-950/80 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between text-[10px] text-white/40 mb-1">
                      <span>Flatten Layer</span>
                      <span>1,024 Neurons</span>
                    </div>
                    <div className="flex gap-1 overflow-hidden h-2.5 items-center bg-slate-900 border border-white/5 p-0.5 rounded">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((n) => (
                        <div key={n} className={`flex-grow h-full rounded-sm ${n % 3 === 0 ? 'bg-brand-500' : 'bg-slate-800'}`} />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40 mt-1">
                      <span>Fully-Connected Dense</span>
                      <span>256 Neurons</span>
                    </div>
                  </motion.div>
                )}

                {activeLayer === 4 && (
                  <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="flex flex-col gap-2 w-full max-w-xs">
                    <div className="flex justify-between text-xs font-semibold text-white/60 mb-1">
                      <span>Condition probabilities</span>
                      <span>Output</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 w-16 text-right">Acne</span>
                        <div className="flex-grow bg-slate-950 h-2 rounded overflow-hidden">
                          <div className="bg-brand-500 h-full rounded" style={{ width: '92%' }} />
                        </div>
                        <span className="text-[10px] font-bold text-brand-400 w-8">92%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 w-16 text-right">Eczema</span>
                        <div className="flex-grow bg-slate-950 h-2 rounded overflow-hidden">
                          <div className="bg-slate-800 h-full rounded" style={{ width: '4%' }} />
                        </div>
                        <span className="text-[10px] text-white/40 w-8">4%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 w-16 text-right">Melasma</span>
                        <div className="flex-grow bg-slate-950 h-2 rounded overflow-hidden">
                          <div className="bg-slate-800 h-full rounded" style={{ width: '2%' }} />
                        </div>
                        <span className="text-[10px] text-white/40 w-8">2%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>

            {/* Layer description info footer */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-white/5 text-[11px] text-white/60 leading-relaxed mt-4">
              <strong>Interactive Preview:</strong> Click any step on the left to see the data transformation in the model visualization viewport.
            </div>
          </Card>
        </div>

      </section>

      {/* Trust & Scientific Rigor Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-16">
        
        {/* Security & Integrity */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            Security & Trust
          </h2>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            Privacy and compliance represent our core development focus. Image transfers are protected via Secure Sockets Layer (SSL) protocols, and no uploaded skin diagnostic samples are associated with personal identification details or stored longer than required to generate output.
          </p>
        </div>

        {/* Clinical Limitations warning */}
        <div className="flex flex-col gap-4 bg-slate-50 border border-slate-100 p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-slate-500" />
            Clinical Limitations
          </h2>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            Visual algorithms are trained to find matches based on geometric skin textures. They cannot replicate the physical exam methods or diagnostic expertise of a dermatologist, including palpability assessment or history evaluation. Always seek professional advice for skin concerns.
          </p>
        </div>

      </section>

    </div>
  );
}
