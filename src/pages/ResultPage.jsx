import React from 'react';
import ResultDisplay from '../components/ResultDisplay';

export default function ResultPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 flex-grow">
      
      {/* Header Area */}
      <div className="text-center max-w-xl mx-auto flex flex-col gap-3 mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
          Skin Scan Diagnostics
        </h1>
        <p className="text-slate-400 text-xs leading-relaxed">
          Here are the findings based on the automated CNN visual mapping. This analysis report is stored in your local scan log.
        </p>
      </div>

      <ResultDisplay />
      
    </div>
  );
}
