import React from 'react';
import { TabType } from '../types';
import { Activity, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  pendingCount: number;
  isDarkMode?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onChangeTab,
  pendingCount,
  isDarkMode = false,
}) => {
  return (
    <nav className={`py-2 border-t ${isDarkMode ? 'border-slate-800/60' : 'border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Segmented Control Buttons */}
          <div
            className={`inline-flex p-1 rounded-xl border w-full sm:w-auto overflow-x-auto ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800/80 shadow-inner'
                : 'bg-slate-100 border-slate-200 shadow-inner'
            }`}
          >
            {/* Tab 1: Live Overview */}
            <button
              onClick={() => onChangeTab('overview')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                activeTab === 'overview'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-blue-700 text-white shadow-sm font-bold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span>Live Overview</span>
            </button>

            {/* Tab 2: Recommendations */}
            <button
              onClick={() => onChangeTab('recommendations')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                activeTab === 'recommendations'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-blue-700 text-white shadow-sm font-bold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Recommendations</span>
              {pendingCount > 0 && (
                <span
                  className={`ml-0.5 px-1.5 py-0.2 text-[11px] font-bold rounded-full ${
                    activeTab === 'recommendations'
                      ? isDarkMode
                        ? 'bg-slate-950 text-amber-400'
                        : 'bg-white text-blue-800'
                      : isDarkMode
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-blue-700 text-white'
                  }`}
                >
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Tab 3: What-If Simulator */}
            <button
              onClick={() => onChangeTab('simulator')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                activeTab === 'simulator'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-blue-700 text-white shadow-sm font-bold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span>What-If Simulator</span>
            </button>
          </div>

          {/* Quick Context Pill */}
          <div
            className={`hidden lg:flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border ${
              isDarkMode
                ? 'text-slate-400 bg-slate-800/40 border-slate-800'
                : 'text-slate-600 bg-slate-50 border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>VPP Optimization Engine Online</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </nav>
  );
};

