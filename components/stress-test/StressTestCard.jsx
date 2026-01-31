import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Zap, Flame } from 'lucide-react';

const severityIcons = {
  mild: AlertTriangle,
  moderate: Zap,
  severe: Flame
};

const severityColors = {
  mild: 'text-amber-500',
  moderate: 'text-orange-500',
  severe: 'text-rose-500'
};

export default function StressTestCard({ test, index }) {
  const Icon = severityIcons[test.severity];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={`rounded-xl border-2 p-5 ${
        test.passed 
          ? 'bg-white border-emerald-200' 
          : 'bg-white border-rose-200'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            test.severity === 'mild' ? 'bg-amber-50' :
            test.severity === 'moderate' ? 'bg-orange-50' : 'bg-rose-50'
          }`}>
            <Icon className={`h-5 w-5 ${severityColors[test.severity]}`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{test.name}</h3>
            <p className="text-sm text-slate-500">{test.severity.charAt(0).toUpperCase() + test.severity.slice(1)} Shock</p>
          </div>
        </div>
        
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
          test.passed 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-rose-100 text-rose-700'
        }`}>
          {test.passed ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              PASS
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              FAIL
            </>
          )}
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-3">{test.scenario}</p>
      
      <div className={`rounded-lg p-3 text-sm ${
        test.passed ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
      }`}>
        {test.consequence}
      </div>
    </motion.div>
  );
}
