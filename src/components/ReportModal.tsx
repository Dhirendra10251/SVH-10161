import React from 'react';
import { CampusProfile, MetricData, RecommendationItem, SimulatorState } from '../types';
import { X, Printer, ShieldCheck, Zap, Download, Building2, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campus: CampusProfile;
  metrics: MetricData;
  recommendations: RecommendationItem[];
  simulatorState: SimulatorState;
  isDarkMode?: boolean;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  campus,
  metrics,
  recommendations,
  simulatorState,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className={`border rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors cursor-pointer ${
            isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Report Header */}
        <div className={`border-b pb-5 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2 text-blue-700 dark:text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Government of Rajasthan • VPP Campus Energy Audit
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            {campus.name}
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            District: {campus.district} • VPP Node ID: <span className={`font-mono font-bold ${isDarkMode ? 'text-amber-300' : 'text-blue-700'}`}>{campus.code}</span> • Report Date: {new Date().toLocaleDateString('en-IN')}
          </p>
        </div>

        {/* Capacity Overview */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border text-xs font-mono ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <span className={`block font-semibold uppercase text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Rooftop Solar</span>
            <span className={`font-bold text-sm ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>{campus.solarCapacityKw} kWp</span>
          </div>
          <div>
            <span className={`block font-semibold uppercase text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Wind Turbine</span>
            <span className={`font-bold text-sm ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>{campus.windCapacityKw} kW</span>
          </div>
          <div>
            <span className={`block font-semibold uppercase text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Battery Storage</span>
            <span className={`font-bold text-sm ${isDarkMode ? 'text-cyan-400' : 'text-blue-700'}`}>{campus.batteryCapacityKwh} kWh</span>
          </div>
          <div>
            <span className={`block font-semibold uppercase text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Peak Demand Cap</span>
            <span className={`font-bold text-sm ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{campus.peakDemandKw} kW</span>
          </div>
        </div>

        {/* Live Snapshot */}
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
            Live VPP Performance Snapshot
          </h3>
          <div className={`p-4 rounded-xl border text-xs space-y-2 font-mono ${
            isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`flex justify-between border-b pb-1.5 ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-700 font-semibold'}>Solar Generation Now:</span>
              <span className={`font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>{metrics.solarNowKw} kW</span>
            </div>
            <div className={`flex justify-between border-b pb-1.5 ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-700 font-semibold'}>Wind Generation Now:</span>
              <span className={`font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>{metrics.windNowKw} kW</span>
            </div>
            <div className={`flex justify-between border-b pb-1.5 ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-700 font-semibold'}>Battery State of Charge (SOC):</span>
              <span className={`font-bold ${isDarkMode ? 'text-cyan-400' : 'text-blue-700'}`}>{metrics.batterySocPercent}% ({metrics.batteryCapacityKwh * 0.68} kWh)</span>
            </div>
            <div className={`flex justify-between border-b pb-1.5 ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-700 font-semibold'}>Total Campus Demand:</span>
              <span className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{metrics.totalDemandKw} kW</span>
            </div>
            <div className={`flex justify-between font-bold pt-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              <span>Campus Green Self-Sufficiency:</span>
              <span>{metrics.selfSufficiencyPercent}%</span>
            </div>
          </div>
        </div>

        {/* Recommended Dispatch Schedule */}
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
            Active Plain-Language Dispatch Recommendations
          </h3>
          <div className="space-y-2">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                  isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{rec.title}</span>
                    <span className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>[{rec.timeWindow}]</span>
                  </div>
                  <p className={`text-[11px] mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>{rec.reasoning}</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 font-bold ${
                  isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'
                }`}>
                  {rec.financialImpact}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <p className={`text-[11px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Official Rajasthan Clean Energy VPP Prototype • Department of Energy
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-blue-700 text-white hover:bg-blue-800 shadow-sm'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
