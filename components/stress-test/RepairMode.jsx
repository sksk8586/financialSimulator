import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Target, SlidersHorizontal, CheckCircle2, XCircle, RefreshCw, Sparkles } from 'lucide-react';

export default function RepairMode({ 
  baseline,
  calculateRunway,
  calculateHealthScore,
  runStressTests,
  onReset
}) {
  const totalExpenses = baseline.rent + baseline.transportation + baseline.groceries + baseline.other;
  
  // Target runway input
  const [targetRunway, setTargetRunway] = useState('90');
  
  // Equalizer values
  const [sliderIncome, setSliderIncome] = useState(baseline.income);
  const [sliderExpenses, setSliderExpenses] = useState(totalExpenses);
  const [sliderSavings, setSliderSavings] = useState(baseline.savings);

  // Calculate bounds for sliders
  const incomeBounds = { min: Math.max(500, baseline.income * 0.5), max: baseline.income * 2 };
  const expenseBounds = { min: Math.max(200, totalExpenses * 0.5), max: totalExpenses * 1.5 };
  const savingsBounds = { min: 0, max: Math.max(baseline.savings * 3, 5000) };

  // Current metrics based on sliders
  const currentRunway = calculateRunway(sliderExpenses, sliderSavings);
  const currentScore = calculateHealthScore(sliderIncome, sliderExpenses, sliderSavings);
  const currentTests = runStressTests(sliderIncome, sliderExpenses, sliderSavings);
  const passCount = currentTests.filter(t => t.passed).length;

  // Calculate requirements for target runway
  const targetDays = parseInt(targetRunway) || 90;
  const requirements = useMemo(() => {
    // Required savings = (target days / 30) * expenses
    const requiredSavings = Math.ceil((targetDays / 30) * totalExpenses);
    const savingsIncrease = Math.max(0, requiredSavings - baseline.savings);
    
    // Required expense reduction (keeping savings constant)
    // target = (savings / expenses) * 30
    // expenses = (savings * 30) / target
    const requiredExpenses = baseline.savings > 0 ? Math.floor((baseline.savings * 30) / targetDays) : 0;
    const expenseReduction = Math.max(0, totalExpenses - requiredExpenses);
    const expenseReductionPercent = totalExpenses > 0 ? Math.round((expenseReduction / totalExpenses) * 100) : 0;
    
    // Required income increase (to build savings over time)
    // Assuming 6 month timeline to reach target
    const monthsToTarget = 6;
    const monthlySavingsNeeded = savingsIncrease / monthsToTarget;
    const currentMonthlySurplus = baseline.income - totalExpenses;
    const incomeIncrease = Math.max(0, Math.ceil(monthlySavingsNeeded - currentMonthlySurplus));
    
    return {
      savingsIncrease,
      requiredSavings,
      expenseReduction,
      expenseReductionPercent,
      requiredExpenses,
      incomeIncrease,
      requiredIncome: baseline.income + incomeIncrease,
      isAchievable: expenseReductionPercent <= 50 || savingsIncrease <= baseline.income * 3
    };
  }, [targetDays, baseline, totalExpenses]);

  // Recommended configuration based on sliders
  const recommendation = useMemo(() => {
    const runway = calculateRunway(sliderExpenses, sliderSavings);
    const score = calculateHealthScore(sliderIncome, sliderExpenses, sliderSavings);
    
    return {
      income: Math.round(sliderIncome),
      expenses: Math.round(sliderExpenses),
      savings: Math.round(sliderSavings),
      runway,
      score
    };
  }, [sliderIncome, sliderExpenses, sliderSavings, calculateRunway, calculateHealthScore]);

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-emerald-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Stage 4</p>
        <h2 className="text-2xl font-semibold text-slate-900">Repair Mode</h2>
        <p className="text-slate-500 mt-2">Explore what changes affect your runway</p>
      </div>

      {/* A) Target Runway Input */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Target Runway</h3>
        </div>
        
        <div className="flex items-center gap-3 mb-5">
          <span className="text-slate-600">I want</span>
          <Input
            type="number"
            min="7"
            max="365"
            value={targetRunway}
            onChange={(e) => setTargetRunway(e.target.value)}
            className="w-24 h-10 text-center font-semibold text-lg"
          />
          <span className="text-slate-600">days runway</span>
        </div>

        {targetDays > currentRunway && (
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-3">
              To reach <span className="font-semibold">{targetDays} days</span>, achieve ONE of:
            </p>
            <div className="space-y-2">
              {requirements.savingsIncrease > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Increase savings by</span>
                  <span className="font-semibold text-slate-900">+${requirements.savingsIncrease.toLocaleString()}</span>
                </div>
              )}
              {requirements.expenseReductionPercent > 0 && requirements.expenseReductionPercent <= 50 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Reduce expenses by</span>
                  <span className="font-semibold text-slate-900">{requirements.expenseReductionPercent}% (−${requirements.expenseReduction.toLocaleString()}/mo)</span>
                </div>
              )}
              {requirements.incomeIncrease > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Increase income by</span>
                  <span className="font-semibold text-slate-900">+${requirements.incomeIncrease.toLocaleString()}/mo</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {targetDays <= currentRunway && (
          <div className="bg-emerald-50 rounded-lg p-4 text-center">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-sm text-emerald-700 font-medium">Target already achieved with current configuration</p>
          </div>
        )}
      </div>

      {/* B) Equalizer Exploration */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="h-5 w-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Equalizer</h3>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-400 mb-0.5">Runway</p>
            <p className="text-2xl font-bold text-white">{currentRunway}d</p>
          </div>
          <div 
            className={`rounded-lg p-3 text-center transition-colors ${
              currentScore >= 70 ? 'bg-emerald-50' :
              currentScore >= 40 ? 'bg-amber-50' : 'bg-rose-50'
            }`}
          >
            <p className="text-xs text-slate-500 mb-0.5">Score</p>
            <p className={`text-2xl font-bold ${getScoreColor(currentScore)}`}>{currentScore}</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium text-slate-700">Income</Label>
              <span className="text-sm font-semibold text-slate-900">${Math.round(sliderIncome).toLocaleString()}/mo</span>
            </div>
            <Slider
              value={[sliderIncome]}
              onValueChange={([v]) => setSliderIncome(v)}
              min={incomeBounds.min}
              max={incomeBounds.max}
              step={50}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>${Math.round(incomeBounds.min).toLocaleString()}</span>
              <span>${Math.round(incomeBounds.max).toLocaleString()}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium text-slate-700">Expenses</Label>
              <span className="text-sm font-semibold text-slate-900">${Math.round(sliderExpenses).toLocaleString()}/mo</span>
            </div>
            <Slider
              value={[sliderExpenses]}
              onValueChange={([v]) => setSliderExpenses(v)}
              min={expenseBounds.min}
              max={expenseBounds.max}
              step={50}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>${Math.round(expenseBounds.min).toLocaleString()}</span>
              <span>${Math.round(expenseBounds.max).toLocaleString()}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium text-slate-700">Savings</Label>
              <span className="text-sm font-semibold text-slate-900">${Math.round(sliderSavings).toLocaleString()}</span>
            </div>
            <Slider
              value={[sliderSavings]}
              onValueChange={([v]) => setSliderSavings(v)}
              min={savingsBounds.min}
              max={savingsBounds.max}
              step={100}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>$0</span>
              <span>${Math.round(savingsBounds.max).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-slate-600">Stress Tests</p>
            <p className="text-sm text-slate-500">{passCount}/3 passed</p>
          </div>
          <div className="flex gap-2">
            {currentTests.map((test) => (
              <div
                key={test.id}
                className={`flex-1 py-2 px-3 rounded-lg text-center text-xs font-medium ${
                  test.passed 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {test.passed ? <CheckCircle2 className="h-3 w-3 mx-auto mb-0.5" /> : <XCircle className="h-3 w-3 mx-auto mb-0.5" />}
                {test.severity}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C) Concrete Fix Output */}
      <div className="bg-slate-900 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-white">Current Configuration</h3>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Income</span>
            <span className="text-white font-medium">${recommendation.income.toLocaleString()}/mo</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Expenses</span>
            <span className="text-white font-medium">${recommendation.expenses.toLocaleString()}/mo</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Savings</span>
            <span className="text-white font-medium">${recommendation.savings.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Result</span>
            <span className="text-xl font-bold text-white">{recommendation.runway} days runway</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full py-3 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center justify-center gap-2 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Start Over
      </button>
    </motion.div>
  );
}
