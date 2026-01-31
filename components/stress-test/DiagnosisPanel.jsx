import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Wallet, DollarSign, CheckCircle2 } from 'lucide-react';

const diagnosisIcons = {
  fixed: Home,
  buffer: Wallet,
  income: DollarSign
};

const diagnosisLabels = {
  fixed: 'Fixed expenses too high',
  buffer: 'Insufficient savings buffer',
  income: 'Income too low for expense structure'
};

const diagnosisDescriptions = {
  fixed: 'Rent and transportation consume a large portion of income, leaving little flexibility.',
  buffer: 'Your savings cannot absorb unexpected costs or income gaps.',
  income: 'Current income cannot sustainably support your expense structure.'
};

export default function DiagnosisPanel({ diagnoses }) {
  if (diagnoses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Stage 3</p>
          <h2 className="text-2xl font-semibold text-slate-900">Diagnosis</h2>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-emerald-900 mb-2">No Critical Weaknesses Detected</h3>
          <p className="text-emerald-700">Your financial foundation passed all stress tests.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Stage 3</p>
        <h2 className="text-2xl font-semibold text-slate-900">Diagnosis</h2>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 mb-6">
        <p className="text-slate-400 text-sm font-medium mb-4">Primary Weaknesses Detected</p>
        <div className="space-y-4">
          {diagnoses.map((diagnosis, index) => {
            const Icon = diagnosisIcons[diagnosis];
            return (
              <motion.div
                key={diagnosis}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Icon className="h-5 w-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{diagnosisLabels[diagnosis]}</p>
                  <p className="text-slate-400 text-sm mt-1">{diagnosisDescriptions[diagnosis]}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
