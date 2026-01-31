import React from 'react';
import { motion } from 'framer-motion';

export default function HealthScoreDisplay({ score, runway, baseline }) {
  const { income, rent, transportation, groceries, other, savings } = baseline;
  const fixedExpenses = rent + transportation;
  const flexibleExpenses = groceries + other;
  const totalExpenses = fixedExpenses + flexibleExpenses;
  const burnRate = totalExpenses;

  const getScoreColor = () => {
    if (score >= 70) return 'text-emerald-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getScoreLabel = () => {
    if (score >= 70) return 'Stable';
    if (score >= 40) return 'Vulnerable';
    return 'At Risk';
  };

  const getScoreBg = () => {
    if (score >= 70) return 'bg-emerald-50 border-emerald-100';
    if (score >= 40) return 'bg-amber-50 border-amber-100';
    return 'bg-rose-50 border-rose-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Stage 1</p>
        <h2 className="text-2xl font-semibold text-slate-900">Baseline Assessment</h2>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 rounded-2xl p-6 text-center">
          <p className="text-slate-400 text-sm font-medium mb-1">Runway</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold text-white tracking-tight">
              {runway}
            </span>
            <span className="text-xl text-slate-400 font-medium">days</span>
          </div>
          <p className="text-slate-500 text-xs mt-2">
            Until savings reach $0
          </p>
        </div>

        <div className={`rounded-2xl border-2 ${getScoreBg()} p-6 text-center`}>
          <p className="text-sm font-medium text-slate-500 mb-1">Health Score</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-5xl font-bold tracking-tight ${getScoreColor()}`}>
              {score}
            </span>
            <span className="text-xl text-slate-400 font-medium">/ 100</span>
          </div>
          <p className={`text-sm font-medium mt-2 ${getScoreColor()}`}>
            {getScoreLabel()}
          </p>
        </div>
      </div>

      {/* Burn Rate */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-600">Monthly Burn Rate</p>
          <p className="text-2xl font-bold text-slate-900">${burnRate.toLocaleString()}</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Breakdown</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">Income</span>
            <span className="text-sm font-semibold text-slate-900">${income.toLocaleString()}/mo</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Fixed Expenses
            </span>
            <span className="text-sm font-semibold text-slate-900">${fixedExpenses.toLocaleString()}/mo</span>
          </div>
          
          <div className="pl-4 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Rent / Mortgage</span>
              <span>${rent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Transportation</span>
              <span>${transportation.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Flexible Expenses
            </span>
            <span className="text-sm font-semibold text-slate-900">${flexibleExpenses.toLocaleString()}/mo</span>
          </div>
          
          <div className="pl-4 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Groceries</span>
              <span>${groceries.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Other</span>
              <span>${other.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2 border-t border-slate-100">
            <span className="text-sm text-slate-600">Savings Buffer</span>
            <span className="text-sm font-semibold text-slate-900">${savings.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
