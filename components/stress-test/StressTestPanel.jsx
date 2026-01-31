import React from 'react';
import { motion } from 'framer-motion';
import StressTestCard from './StressTestCard';

export default function StressTestPanel({ tests }) {
  const passCount = tests.filter(t => t.passed).length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Stage 2</p>
        <h2 className="text-2xl font-semibold text-slate-900">Stress Tests</h2>
        <p className="text-slate-500 mt-2">
          {passCount} of {tests.length} tests passed
        </p>
      </div>

      <div className="space-y-4">
        {tests.map((test, index) => (
          <StressTestCard key={test.id} test={test} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
