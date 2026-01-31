import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Zap } from 'lucide-react';

export default function BaselineInput({ onSubmit, onDemo }) {
  const [income, setIncome] = useState('');
  const [rent, setRent] = useState('');
  const [transportation, setTransportation] = useState('');
  const [groceries, setGroceries] = useState('');
  const [other, setOther] = useState('');
  const [savings, setSavings] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income && rent && transportation && groceries && other && savings) {
      onSubmit({
        income: parseFloat(income),
        rent: parseFloat(rent),
        transportation: parseFloat(transportation),
        groceries: parseFloat(groceries),
        other: parseFloat(other),
        savings: parseFloat(savings)
      });
    }
  };

  const renderInput = (id, label, value, onChange, helper) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
        <Input
          id={id}
          type="number"
          min="0"
          step="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-7 h-12 text-base font-medium bg-white border-slate-200 focus:border-slate-400 focus:ring-slate-400"
          placeholder="0"
          required
        />
      </div>
      {helper && <p className="text-xs text-slate-400">{helper}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-3">
          Financial Stress Test
        </h1>
        <p className="text-slate-500 text-base">
          We stress-test your finances the same way engineers stress-test bridges.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Income Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Income</p>
          {renderInput("income", "Monthly Income", income, setIncome, "Take-home pay after taxes")}
        </div>

        {/* Expenses Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Expenses</p>
          
          {/* Fixed Expenses */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Fixed (cannot reduce easily)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {renderInput("rent", "Rent / Mortgage", rent, setRent)}
              {renderInput("transportation", "Transportation", transportation, setTransportation)}
            </div>
          </div>

          {/* Flexible Expenses */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Flexible (can be reduced)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {renderInput("groceries", "Groceries", groceries, setGroceries)}
              {renderInput("other", "Other", other, setOther)}
            </div>
          </div>
        </div>

        {/* Savings Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Savings</p>
          {renderInput("savings", "Current Savings", savings, setSavings, "Money accessible within 24 hours")}
        </div>

        <div className="pt-2 space-y-3">
          <Button 
            type="submit" 
            className="w-full h-14 text-base font-medium bg-slate-900 hover:bg-slate-800 transition-all"
          >
            Run Stress Test
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onDemo}
            className="w-full h-12 text-sm font-medium border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <Zap className="mr-2 h-4 w-4" />
            Use Demo Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
