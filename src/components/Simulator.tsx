import React from 'react';
import { SimulatorState, SimulationResult } from '../types';
import {
  SlidersHorizontal,
  Sun,
  Clock,
  TrendingUp,
  IndianRupee,
  Leaf,
  RotateCcw,
  Zap,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';

interface SimulatorProps {
  simulatorState: SimulatorState;
  onChangeState: (newState: SimulatorState) => void;
  isDarkMode?: boolean;
}

export const Simulator: React.FC<SimulatorProps> = ({
  simulatorState,
  onChangeState,
  isDarkMode = false,
}) => {
  const { additionalSolarKw, shiftLabHours } = simulatorState;

  // Formula recalculations
  const baselineSelfConsumption = 62; // 62% baseline self-consumption
  const projectedSelfConsumption = Math.min(
    90,
    Number((baselineSelfConsumption + additionalSolarKw * 0.9 + shiftLabHours * 3.5).toFixed(1))
  );

  const gain = Number((projectedSelfConsumption - baselineSelfConsumption).toFixed(1));
  const dailySavingsInr = Math.round((projectedSelfConsumption - baselineSelfConsumption) * 45 + additionalSolarKw * 85);
  const monthlySavingsInr = dailySavingsInr * 30;
  const co2AvoidedKgDay = Number(((projectedSelfConsumption - baselineSelfConsumption) * 1.8 + additionalSolarKw * 3.2).toFixed(1));
  const gridDependencePercent = Math.max(10, Math.round(100 - projectedSelfConsumption));

  const handleSolarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeState({
      ...simulatorState,
      additionalSolarKw: Number(e.target.value),
    });
  };

  const handleShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeState({
      ...simulatorState,
      shiftLabHours: Number(e.target.value),
    });
  };

  const applyPreset = (solar: number, shift: number) => {
    onChangeState({
      additionalSolarKw: solar,
      shiftLabHours: shift,
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div
        className={`border rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-amber-400 border border-blue-500/20 dark:border-amber-500/20">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Interactive "What-If" Expansion & Load-Shift Simulator
            </h2>
          </div>
          <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Model the immediate financial and carbon impact of adding rooftop solar capacity or shifting heavy computing lab HVAC loads.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`font-bold hidden sm:inline ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Quick Presets:
          </span>
          <button
            onClick={() => applyPreset(10, 0)}
            className={`px-2.5 py-1 rounded-md border font-bold transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/30'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
            }`}
          >
            +10 kW Solar
          </button>
          <button
            onClick={() => applyPreset(0, 2.5)}
            className={`px-2.5 py-1 rounded-md border font-bold transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-teal-500/30'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-900 border-teal-300'
            }`}
          >
            +2.5h Load Shift
          </button>
          <button
            onClick={() => applyPreset(20, 4.0)}
            className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-blue-700 hover:bg-blue-800 text-white'
            }`}
          >
            Max Green Campus
          </button>
          <button
            onClick={() => applyPreset(0, 0)}
            className={`p-1 rounded-md border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title="Reset to Baseline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TWO SLIDERS & LIVE IMPACT SUMMARY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: THE TWO SLIDERS (5 Cols) */}
        <div
          className={`lg:col-span-5 border rounded-xl p-5 shadow-sm space-y-6 ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <h3 className={`text-sm font-bold uppercase tracking-wider border-b pb-3 flex items-center gap-2 ${
            isDarkMode ? 'text-slate-200 border-slate-800' : 'text-slate-900 border-slate-200'
          }`}>
            <SlidersHorizontal className="w-4 h-4 text-blue-700 dark:text-amber-400" />
            Adjust VPP Expansion Variables
          </h3>

          {/* SLIDER 1: Additional Solar Panels (0 - 20 kW) */}
          <div className={`space-y-3 p-4 rounded-xl border ${
            isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold flex items-center gap-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Additional Solar Panels
              </label>
              <span className="text-sm font-extrabold text-amber-800 dark:text-amber-400 font-mono bg-amber-100 dark:bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-300 dark:border-amber-500/20">
                +{additionalSolarKw} kW
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={additionalSolarKw}
              onChange={handleSolarChange}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className={`flex justify-between text-[11px] font-bold font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              <span>0 kW (Baseline)</span>
              <span>10 kW</span>
              <span>20 kW (Max Upgrade)</span>
            </div>
            <p className={`text-[11px] font-medium leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              Simulates expanding rooftop PV on Electrical & Civil Engineering department blocks.
            </p>
          </div>

          {/* SLIDER 2: Shift Lab Load Later (0 - 4 hrs) */}
          <div className={`space-y-3 p-4 rounded-xl border ${
            isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold flex items-center gap-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Shift Lab Load Later
              </label>
              <span className="text-sm font-extrabold text-teal-800 dark:text-teal-400 font-mono bg-teal-100 dark:bg-teal-500/10 px-2.5 py-0.5 rounded border border-teal-300 dark:border-teal-500/20">
                +{shiftLabHours} hrs
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="4"
              step="0.5"
              value={shiftLabHours}
              onChange={handleShiftChange}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />

            <div className={`flex justify-between text-[11px] font-bold font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              <span>0h (Standard)</span>
              <span>2.0h</span>
              <span>4.0h (Max Shift)</span>
            </div>
            <p className={`text-[11px] font-medium leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              Pre-cools lab blocks during peak 1-3 PM solar surplus to avoid 6-9 PM grid demand surcharges.
            </p>
          </div>

          {/* Formula Callout Note */}
          <div className={`p-3 rounded-lg border text-[11px] flex items-start gap-2 ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-800'
          }`}>
            <Info className="w-4 h-4 text-blue-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Formula logic:</strong> Baseline self-consumption (62%) + (Solar kW × 0.9) + (Shift hrs × 3.5), capped at 90% peak system efficiency.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE RECALCULATION & BEFORE/AFTER COMPARISON (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* TOP THREE METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* CARD 1: Self-Consumption */}
            <div className={`border rounded-xl p-4 shadow-sm relative overflow-hidden ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className={`flex items-center justify-between text-xs font-bold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                <span>Self-Consumption</span>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 font-mono">
                  +{gain}%
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-2xl font-extrabold font-mono ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {projectedSelfConsumption}%
                </span>
              </div>
              <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Baseline: <span className="font-mono font-bold">62.0%</span>
              </p>
            </div>

            {/* CARD 2: Daily Savings */}
            <div className={`border rounded-xl p-4 shadow-sm relative overflow-hidden ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className={`flex items-center justify-between text-xs font-bold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                <span>Est. Daily Savings</span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                  ₹{dailySavingsInr.toLocaleString('en-IN')}/day
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                  ₹{monthlySavingsInr.toLocaleString('en-IN')}
                </span>
                <span className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>/mo</span>
              </div>
              <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                DISCOM Tariff Avoidance
              </p>
            </div>

            {/* CARD 3: CO2 Avoided */}
            <div className={`border rounded-xl p-4 shadow-sm relative overflow-hidden ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className={`flex items-center justify-between text-xs font-bold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                <span>CO₂ Avoided</span>
                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 font-mono">
                  Daily Offset
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-extrabold text-teal-700 dark:text-teal-300 font-mono">
                  {co2AvoidedKgDay}
                </span>
                <span className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kg/day</span>
              </div>
              <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                ~{(co2AvoidedKgDay * 0.365).toFixed(1)} Tons / year
              </p>
            </div>
          </div>

          {/* VISUAL BEFORE / AFTER BAR COMPARISON (REQUIRED PRODUCT FEATURE) */}
          <div className={`border rounded-xl p-5 shadow-sm space-y-5 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                <TrendingUp className="w-4 h-4 text-blue-700 dark:text-amber-400" />
                Before / After VPP Self-Consumption Comparison
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/80">
                Live Projected Growth
              </span>
            </div>

            {/* BAR 1: BASELINE SELF-CONSUMPTION (62%) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Baseline Campus Self-Consumption</span>
                <span className={`font-bold font-mono ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>62.0%</span>
              </div>
              <div className={`w-full h-5 rounded-lg p-1 border overflow-hidden ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <div
                  className="bg-slate-500 dark:bg-slate-600 h-full rounded-md transition-all duration-300 flex items-center justify-end pr-2 text-[10px] font-bold text-white font-mono"
                  style={{ width: '62%' }}
                >
                  62%
                </div>
              </div>
            </div>

            {/* BAR 2: PROJECTED SELF-CONSUMPTION (GROWING LIVE) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-blue-800 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
                  Projected Campus Self-Consumption
                </span>
                <span className="font-extrabold text-blue-800 dark:text-amber-300 font-mono">
                  {projectedSelfConsumption}%
                  {gain > 0 && <span className="text-emerald-700 dark:text-emerald-400 ml-1.5 text-[11px]">(+{gain}%)</span>}
                </span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-950 h-7 rounded-lg p-1 border border-blue-300 dark:border-amber-500/30 overflow-hidden relative shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-600 to-teal-500 dark:from-amber-500 dark:via-amber-400 dark:to-emerald-400 h-full rounded-md transition-all duration-300 flex items-center justify-end pr-3 text-xs font-extrabold text-white dark:text-slate-950 font-mono shadow-md"
                  style={{ width: `${projectedSelfConsumption}%` }}
                >
                  {projectedSelfConsumption}%
                </div>
              </div>
            </div>

            {/* BAR 3: GRID DEPENDENCE REDUCTION */}
            <div className={`space-y-1.5 pt-2 border-t ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <div className="flex justify-between text-xs">
                <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Campus DISCOM Grid Reliance</span>
                <span className={`font-bold font-mono ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                  38% Baseline → <strong className="text-emerald-700 dark:text-emerald-400">{gridDependencePercent}% Projected</strong>
                </span>
              </div>
              <div className={`w-full h-4 rounded-lg p-1 border overflow-hidden ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <div
                  className="bg-slate-600 dark:bg-cyan-600/80 h-full rounded-md transition-all duration-300 text-[10px] font-bold text-white font-mono flex items-center pl-2"
                  style={{ width: `${gridDependencePercent}%` }}
                >
                  {gridDependencePercent}% Grid Draw
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className={`border rounded-lg p-3.5 text-xs flex items-center gap-3 ${
              isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}>
              <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <div>
                <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                  Simulation Outcome:
                </p>
                <p className={`text-[11px] mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                  Adding <strong>+{additionalSolarKw} kW solar</strong> with a <strong>+{shiftLabHours} hour load shift</strong> increases campus green energy utilization by <strong>+{gain}%</strong> and generates <strong>₹{monthlySavingsInr.toLocaleString('en-IN')}/month</strong> in direct bill savings for the university budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
