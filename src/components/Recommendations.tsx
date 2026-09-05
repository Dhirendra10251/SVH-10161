import React, { useState, useEffect } from 'react';
import { RecommendationItem } from '../types';
import {
  Sparkles,
  BatteryCharging,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Info,
  Sliders,
  ShieldAlert,
  SlidersHorizontal,
  Flame,
  Zap,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface RecommendationsProps {
  recommendations: RecommendationItem[];
  onAcknowledge: (id: string) => void;
  onNavigateToSimulatorWithPreset?: (solarKw: number, shiftHours: number) => void;
  selectedRecId?: string | null;
  isDarkMode?: boolean;
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  onAcknowledge,
  onNavigateToSimulatorWithPreset,
  selectedRecId,
  isDarkMode = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'pending'>('all');

  // Auto-scroll and ensure visibility when selectedRecId changes
  useEffect(() => {
    if (selectedRecId) {
      setFilter('all');
      setTimeout(() => {
        const el = document.getElementById(`recommendation-${selectedRecId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedRecId]);

  const filteredRecs = recommendations.filter((item) => {
    if (filter === 'high') return item.priority === 'high';
    if (filter === 'medium') return item.priority === 'medium';
    if (filter === 'pending') return item.status === 'pending';
    return true;
  });

  const getPriorityBadge = (priority: RecommendationItem['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
            isDarkMode
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <Flame className={`w-3 h-3 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`} /> High Priority
          </span>
        );
      case 'medium':
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
            isDarkMode
              ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
              : 'bg-teal-100 text-teal-900 border-teal-300'
          }`}>
            <Sparkles className={`w-3 h-3 ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`} /> Optimization
          </span>
        );
      case 'low':
      default:
        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
            isDarkMode
              ? 'bg-slate-800 text-slate-300 border-slate-700'
              : 'bg-slate-100 text-slate-800 border-slate-300'
          }`}>
            <Info className={`w-3 h-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} /> Advisory
          </span>
        );
    }
  };

  const getActionIcon = (type: RecommendationItem['actionType']) => {
    switch (type) {
      case 'charge':
        return <BatteryCharging className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />;
      case 'shift_load':
        return <Clock className={`w-5 h-5 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />;
      case 'hold_export':
        return <Zap className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />;
      case 'load_stagger':
      default:
        return <SlidersHorizontal className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
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
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Plain-Language Explainable Dispatch Recommendations
            </h2>
          </div>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Automated microgrid orchestration rules for campus facility staff — zero specialized engineering training required.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
              filter === 'all'
                ? isDarkMode
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                  : 'bg-blue-700 text-white font-bold border-blue-700'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            All Recommendations ({recommendations.length})
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
              filter === 'high'
                ? isDarkMode
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                  : 'bg-blue-700 text-white font-bold border-blue-700'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            High Priority
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
              filter === 'pending'
                ? isDarkMode
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                  : 'bg-blue-700 text-white font-bold border-blue-700'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            Action Required
          </button>
        </div>
      </div>

      {/* List of Recommendation Cards */}
      <div className="space-y-4">
        {filteredRecs.map((rec) => {
          const isAcknowledged = rec.status === 'acknowledged';
          const isSelected = selectedRecId === rec.id;

          return (
            <div
              key={rec.id}
              id={`recommendation-${rec.id}`}
              className={`border rounded-xl p-5 transition-all duration-200 shadow-sm relative overflow-hidden ${
                isSelected
                  ? isDarkMode
                    ? 'ring-2 ring-amber-400 border-amber-400/90 bg-slate-900 shadow-lg shadow-amber-500/10'
                    : 'ring-2 ring-blue-600 border-blue-500 bg-blue-50/30 shadow-md shadow-blue-500/10'
                  : isAcknowledged
                  ? isDarkMode
                    ? 'border-emerald-800/60 bg-slate-900/50 text-slate-300'
                    : 'border-emerald-200 bg-emerald-50/40 text-slate-800'
                  : isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-100'
                  : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3.5">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-blue-100 border-blue-300 text-blue-800'
                      : isDarkMode
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    {getActionIcon(rec.actionType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {rec.title}
                      </h3>
                      {getPriorityBadge(rec.priority)}
                      {isSelected && (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          isDarkMode
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-blue-700 text-white'
                        }`}>
                          Active in Navigation
                        </span>
                      )}
                      {isAcknowledged && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/80 text-xs font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Scheduled & Dispatched
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      Target Equipment: <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{rec.targetDevice}</span>
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border self-start ${
                  isDarkMode ? 'text-slate-300 bg-slate-950/80 border-slate-800/80' : 'text-slate-800 bg-slate-100 border-slate-300'
                }`}>
                  <Clock className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
                  <span>Window: <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-950'}>{rec.timeWindow}</strong></span>
                </div>
              </div>

              {/* CORE DIFFERENTIATOR: PROMINENT VISUAL EXPLAINABILITY CALLOUT BOX */}
              <div className={`border rounded-xl p-4 my-3.5 relative ${
                isDarkMode ? 'bg-slate-950/90 border-amber-500/20' : 'bg-blue-50/40 border-blue-200'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-blue-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-800 dark:text-amber-400" />
                    PLAIN-LANGUAGE EXPLANATION ("WHY THIS ACTION MATTERS")
                  </span>
                  <span className={`text-[10px] font-mono font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Suggested at {rec.suggestedAt} IST
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {rec.reasoning}
                </p>
              </div>

              {/* Impact Badges & Action Controls Footer */}
              <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t ${
                isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                {/* Financial & Carbon Impact */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className={`px-2.5 py-1 rounded-md border font-semibold font-mono ${
                    isDarkMode ? 'bg-emerald-950/60 border-emerald-800/50 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    {rec.financialImpact}
                  </div>
                  <div className={`px-2.5 py-1 rounded-md border font-semibold font-mono ${
                    isDarkMode ? 'bg-teal-950/60 border-teal-800/50 text-teal-300' : 'bg-teal-50 border-teal-200 text-teal-800'
                  }`}>
                    {rec.co2Impact}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  {onNavigateToSimulatorWithPreset && rec.actionType === 'shift_load' && (
                    <button
                      onClick={() => onNavigateToSimulatorWithPreset(0, 2.0)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>Simulate Load Shift</span>
                    </button>
                  )}

                  <button
                    onClick={() => onAcknowledge(rec.id)}
                    disabled={isAcknowledged}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-sm ${
                      isAcknowledged
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
                        : isDarkMode
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-blue-700 hover:bg-blue-800 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isAcknowledged ? 'Command Dispatched' : 'Acknowledge & Schedule'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
