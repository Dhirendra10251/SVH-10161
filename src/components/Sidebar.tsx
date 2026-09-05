import React, { useState, useMemo } from 'react';
import { TabType, CampusProfile, RecommendationItem } from '../types';
import { CAMPUS_LIST, INITIAL_RECOMMENDATIONS } from '../data/mockData';
import {
  Activity,
  Sparkles,
  SlidersHorizontal,
  FileText,
  Building2,
  Radio,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  pendingCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  selectedCampus: CampusProfile;
  onSelectCampus?: (campus: CampusProfile) => void;
  campuses?: CampusProfile[];
  recommendations?: RecommendationItem[];
  selectedRecommendationId?: string | null;
  onSelectRecommendation?: (id: string | null) => void;
  isDarkMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onChangeTab,
  pendingCount,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  selectedCampus,
  onSelectCampus,
  campuses = CAMPUS_LIST,
  recommendations = INITIAL_RECOMMENDATIONS,
  selectedRecommendationId = null,
  onSelectRecommendation,
  isDarkMode = false,
}) => {
  // Expandable sections state
  const [isDteExpanded, setIsDteExpanded] = useState<boolean>(() => activeTab === 'dte');
  const [isRecsExpanded, setIsRecsExpanded] = useState<boolean>(() => activeTab === 'recommendations');
  const [campusSearchQuery, setCampusSearchQuery] = useState<string>('');

  // Filter campuses case-insensitively against existing dataset
  const filteredCampuses = useMemo(() => {
    const q = campusSearchQuery.trim().toLowerCase();
    if (!q) return campuses;
    return campuses.filter((campus) => {
      const nameMatch = campus.name.toLowerCase().includes(q);
      const codeMatch = campus.code.toLowerCase().includes(q);
      const idMatch = campus.id.toLowerCase().includes(q);
      const districtMatch = campus.district ? campus.district.toLowerCase().includes(q) : false;
      return nameMatch || codeMatch || idMatch || districtMatch;
    });
  }, [campuses, campusSearchQuery]);

  const handleSelectSimpleTab = (tab: TabType) => {
    onChangeTab(tab);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const handleToggleRecsAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCollapsed) {
      onToggleCollapse();
      setIsRecsExpanded(true);
    } else {
      setIsRecsExpanded((prev) => !prev);
    }
  };

  const handleToggleDteAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCollapsed) {
      onToggleCollapse();
      setIsDteExpanded(true);
    } else {
      setIsDteExpanded((prev) => !prev);
    }
  };

  const handleCampusClick = (campus: CampusProfile) => {
    if (onSelectCampus) {
      onSelectCampus(campus);
    }
    if (activeTab !== 'reports' && activeTab !== 'simulator') {
      onChangeTab('overview');
    }
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const handleRecommendationClick = (recId: string) => {
    if (onSelectRecommendation) {
      onSelectRecommendation(recId);
    }
    onChangeTab('recommendations');
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col transition-all duration-300 ease-in-out border-r ${
          isDarkMode
            ? 'bg-[#080d1a] border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800'
        } ${
          // Mobile state
          isMobileOpen
            ? 'translate-x-0 w-72 sm:w-80 shadow-2xl'
            : '-translate-x-full lg:translate-x-0'
        } ${
          // Desktop collapsed vs expanded
          isCollapsed ? 'lg:w-[68px]' : 'lg:w-64'
        }`}
      >
        {/* Top Branding Section (Matches top header alignment, h-16) */}
        <div
          className={`h-16 flex items-center border-b px-3.5 transition-colors shrink-0 ${
            isDarkMode ? 'border-slate-800' : 'border-slate-200'
          } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!isCollapsed ? (
            <div
              onClick={() => handleSelectSimpleTab('overview')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 transition-transform group-hover:scale-105 ${
                  isDarkMode
                    ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                    : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}
              >
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold text-sm tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    UrjaSetu
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${
                    isDarkMode ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-blue-100 text-blue-900 border-blue-300'
                  }`}>
                    VPP
                  </span>
                </div>
                <span className={`text-[10px] font-semibold truncate max-w-[140px] ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                  Command Center
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => handleSelectSimpleTab('overview')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold cursor-pointer transition-colors ${
                isDarkMode
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                  : 'bg-blue-50 border border-blue-200 text-blue-700'
              }`}
              title="UrjaSetu VPP Command Center"
            >
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          )}

          {/* Desktop Collapse Arrow Button inside sidebar header */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex items-center justify-center w-7 h-7 rounded-md border text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer ${
              isDarkMode ? 'bg-slate-900 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
            } ${isCollapsed ? 'hidden' : ''}`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Campus Badge (when expanded) */}
        {!isCollapsed && (
          <div
            className={`mx-3 mt-3 px-3 py-2 rounded-lg border text-xs flex items-center gap-2 transition-colors ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${isDarkMode ? 'bg-amber-400' : 'bg-blue-600'}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Active Telemetry Node
              </p>
              <p className={`text-xs font-bold truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                {selectedCampus.name}
              </p>
              <p className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {selectedCampus.code}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Items List */}
        <div className="flex-1 py-3 px-2 space-y-1.5 overflow-y-auto overflow-x-hidden">
          <div className="px-2 pb-1">
            {!isCollapsed ? (
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Navigation
              </span>
            ) : (
              <div className="w-full border-t border-slate-200 dark:border-slate-800 my-1" />
            )}
          </div>

          {/* ITEM 1: Live Overview */}
          <div>
            <button
              id="sidebar-nav-overview"
              onClick={() => handleSelectSimpleTab('overview')}
              title={isCollapsed ? 'Live Overview: Real-time telemetry & campus energy flow' : undefined}
              className={`w-full flex items-center rounded-xl transition-all duration-150 cursor-pointer relative group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2.5'
              } ${
                activeTab === 'overview'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-blue-700 text-white font-bold shadow-sm'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-semibold'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <Activity
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    activeTab === 'overview'
                      ? isDarkMode
                        ? 'text-slate-950'
                        : 'text-white'
                      : isDarkMode
                      ? 'text-slate-400 group-hover:text-amber-400'
                      : 'text-slate-700 group-hover:text-blue-700'
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-xs sm:text-[13px] tracking-tight truncate font-semibold">
                    Live Overview
                  </span>
                )}
              </div>

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg bg-slate-900 text-white border border-slate-700">
                  Live Overview
                </div>
              )}
            </button>
          </div>

          {/* ITEM 2: Recommendations (EXPANDABLE ACCORDION GROUP) */}
          <div className="space-y-1">
            <button
              id="sidebar-nav-recommendations"
              onClick={handleToggleRecsAccordion}
              aria-expanded={isRecsExpanded}
              aria-controls="sidebar-nested-recommendations"
              title={isCollapsed ? `Recommendations [${pendingCount > 0 ? pendingCount : recommendations.length}]` : undefined}
              className={`w-full flex items-center rounded-xl transition-all duration-150 cursor-pointer relative group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2.5'
              } ${
                activeTab === 'recommendations' && !isRecsExpanded
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-blue-700 text-white font-bold shadow-sm'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-semibold'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <Sparkles
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    activeTab === 'recommendations' && !isRecsExpanded
                      ? isDarkMode
                        ? 'text-slate-950'
                        : 'text-white'
                      : isDarkMode
                      ? 'text-slate-400 group-hover:text-amber-400'
                      : 'text-slate-700 group-hover:text-blue-700'
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-xs sm:text-[13px] tracking-tight truncate font-semibold">
                    Recommendations
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full font-mono ${
                      activeTab === 'recommendations' && !isRecsExpanded
                        ? isDarkMode
                          ? 'bg-slate-950 text-amber-300'
                          : 'bg-white text-blue-800'
                        : isDarkMode
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {pendingCount > 0 ? pendingCount : recommendations.length}
                  </span>
                  {isRecsExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 opacity-75" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-75" />
                  )}
                </div>
              )}

              {isCollapsed && (
                <>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-slate-900" />
                  <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg bg-slate-900 text-white border border-slate-700">
                    Recommendations [{recommendations.length}]
                  </div>
                </>
              )}
            </button>

            {/* Expanded Pilot Recommendations List */}
            {isRecsExpanded && !isCollapsed && (
              <div
                id="sidebar-nested-recommendations"
                role="region"
                aria-label="Recommendations list"
                className="pl-5 pr-1 py-1 space-y-1"
              >
                {/* View All / Dispatch Center Link */}
                <button
                  onClick={() => {
                    if (onSelectRecommendation) onSelectRecommendation(null);
                    onChangeTab('recommendations');
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    activeTab === 'recommendations' && !selectedRecommendationId
                      ? isDarkMode
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'bg-blue-100 text-blue-900 font-bold'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-medium">All Recommendations</span>
                  <span className="text-[10px] font-mono opacity-80">{recommendations.length}</span>
                </button>

                {/* The 4 Pilot Recommendations */}
                <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
                  {recommendations.map((rec) => {
                    const isSelected = activeTab === 'recommendations' && selectedRecommendationId === rec.id;
                    const isAcknowledged = rec.status === 'acknowledged';

                    return (
                      <button
                        key={rec.id}
                        id={`sidebar-rec-${rec.id}`}
                        onClick={() => handleRecommendationClick(rec.id)}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start gap-2 ${
                          isSelected
                            ? isDarkMode
                              ? 'bg-amber-500/20 text-amber-300 border-l-2 border-amber-400 font-bold'
                              : 'bg-blue-100 text-blue-900 border-l-2 border-blue-600 font-bold'
                            : isDarkMode
                            ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isAcknowledged ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : rec.priority === 'high' ? (
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <span className={`w-2 h-2 rounded-full inline-block ${
                              rec.priority === 'medium' ? 'bg-teal-500' : 'bg-slate-400'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold leading-tight">{rec.title}</p>
                          <p className={`text-[10px] truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {rec.targetDevice}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ITEM 3: What-If Simulator */}
          <div>
            <button
              id="sidebar-nav-simulator"
              onClick={() => handleSelectSimpleTab('simulator')}
              title={isCollapsed ? 'What-If Simulator: Model PV expansion & load shifting' : undefined}
              className={`w-full flex items-center rounded-xl transition-all duration-150 cursor-pointer relative group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2.5'
              } ${
                activeTab === 'simulator'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-blue-700 text-white font-bold shadow-sm'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-semibold'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <SlidersHorizontal
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    activeTab === 'simulator'
                      ? isDarkMode
                        ? 'text-slate-950'
                        : 'text-white'
                      : isDarkMode
                      ? 'text-slate-400 group-hover:text-amber-400'
                      : 'text-slate-700 group-hover:text-blue-700'
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-xs sm:text-[13px] tracking-tight truncate font-semibold">
                    What-If Simulator
                  </span>
                )}
              </div>

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg bg-slate-900 text-white border border-slate-700">
                  What-If Simulator
                </div>
              )}
            </button>
          </div>

          {/* ITEM 4: Reports */}
          <div>
            <button
              id="sidebar-nav-reports"
              onClick={() => handleSelectSimpleTab('reports')}
              title={isCollapsed ? 'Reports: Audit certificates, tariff & CO₂ savings' : undefined}
              className={`w-full flex items-center rounded-xl transition-all duration-150 cursor-pointer relative group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2.5'
              } ${
                activeTab === 'reports'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-blue-700 text-white font-bold shadow-sm'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-semibold'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <FileText
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    activeTab === 'reports'
                      ? isDarkMode
                        ? 'text-slate-950'
                        : 'text-white'
                      : isDarkMode
                      ? 'text-slate-400 group-hover:text-amber-400'
                      : 'text-slate-700 group-hover:text-blue-700'
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-xs sm:text-[13px] tracking-tight truncate font-semibold">
                    Reports
                  </span>
                )}
              </div>

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg bg-slate-900 text-white border border-slate-700">
                  Reports
                </div>
              )}
            </button>
          </div>

          {/* ITEM 5: DTE / Multi-Campus (EXPANDABLE ACCORDION GROUP WITH CAMPUS SEARCH) */}
          <div className="space-y-1">
            <button
              id="sidebar-nav-dte"
              onClick={handleToggleDteAccordion}
              aria-expanded={isDteExpanded}
              aria-controls="sidebar-nested-dte"
              title={isCollapsed ? `DTE / Multi-Campus [${campuses.length}]` : undefined}
              className={`w-full flex items-center rounded-xl transition-all duration-150 cursor-pointer relative group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2.5'
              } ${
                activeTab === 'dte' && !isDteExpanded
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-blue-700 text-white font-bold shadow-sm'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-semibold'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <Building2
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    activeTab === 'dte' && !isDteExpanded
                      ? isDarkMode
                        ? 'text-slate-950'
                        : 'text-white'
                      : isDarkMode
                      ? 'text-slate-400 group-hover:text-amber-400'
                      : 'text-slate-700 group-hover:text-blue-700'
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-xs sm:text-[13px] tracking-tight truncate font-semibold">
                    DTE / Multi-Campus
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full font-mono ${
                      activeTab === 'dte' && !isDteExpanded
                        ? isDarkMode
                          ? 'bg-slate-950 text-amber-300'
                          : 'bg-white text-blue-800'
                        : isDarkMode
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {campuses.length}
                  </span>
                  {isDteExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 opacity-75" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-75" />
                  )}
                </div>
              )}

              {isCollapsed && (
                <>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-slate-900" />
                  <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg bg-slate-900 text-white border border-slate-700">
                    DTE / Multi-Campus [{campuses.length}]
                  </div>
                </>
              )}
            </button>

            {/* Expanded DTE Section: Compact Search + Nested Campuses List */}
            {isDteExpanded && !isCollapsed && (
              <div
                id="sidebar-nested-dte"
                role="region"
                aria-label="Campuses list"
                className="pl-4 pr-1 py-1.5 space-y-2"
              >
                {/* Statewide VPP Grid View Link */}
                <button
                  onClick={() => {
                    onChangeTab('dte');
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between border transition-colors ${
                    activeTab === 'dte'
                      ? isDarkMode
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                        : 'bg-blue-100 border-blue-300 text-blue-900 font-bold'
                      : isDarkMode
                      ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-semibold truncate">Statewide VPP Grid</span>
                  <span className="text-[10px] font-mono opacity-75">Overview</span>
                </button>

                {/* Compact Campus Search Field */}
                <div className="relative">
                  <Search className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`} />
                  <input
                    type="text"
                    value={campusSearchQuery}
                    onChange={(e) => setCampusSearchQuery(e.target.value)}
                    placeholder="Search campus..."
                    aria-label="Search campuses"
                    id="sidebar-campus-search"
                    className={`w-full text-xs py-1.5 pl-8 pr-7 rounded-lg border transition-colors focus:outline-none focus:ring-1 ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-amber-400'
                        : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:ring-blue-600'
                    }`}
                  />
                  {campusSearchQuery && (
                    <button
                      onClick={() => setCampusSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Filtered Campuses List with Independent Scroll */}
                <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
                  {filteredCampuses.length === 0 ? (
                    <div className="py-4 text-center text-xs text-slate-500 font-medium">
                      No campuses found
                    </div>
                  ) : (
                    filteredCampuses.map((campus) => {
                      const isSelected = selectedCampus.id === campus.id;

                      return (
                        <button
                          key={campus.id}
                          id={`sidebar-campus-${campus.id}`}
                          onClick={() => handleCampusClick(campus)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex flex-col justify-start ${
                            isSelected
                              ? isDarkMode
                                ? 'bg-amber-500/20 text-amber-300 border-l-2 border-amber-400 font-bold'
                                : 'bg-blue-100 text-blue-900 border-l-2 border-blue-600 font-bold'
                              : isDarkMode
                              ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <span className="truncate font-semibold leading-tight">
                            {campus.name}
                          </span>
                          <span className={`text-[10px] font-mono mt-0.5 ${
                            isSelected
                              ? isDarkMode ? 'text-amber-400/90' : 'text-blue-700'
                              : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {campus.code}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom System Status Widget (Preserved) */}
        <div
          className={`border-t p-3 transition-colors shrink-0 ${
            isDarkMode ? 'border-slate-800 bg-[#060913]' : 'border-slate-200 bg-slate-50/80'
          }`}
        >
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                  System Status
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              <div
                className={`p-2 rounded-lg border text-xs font-mono space-y-1 ${
                  isDarkMode
                    ? 'bg-slate-950/70 border-slate-800/80 text-slate-300'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-700 font-medium'}>Availability:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">99.8%</span>
                </div>
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-700 font-medium'}>Grid Sync:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-cyan-300' : 'text-blue-700'}`}>50.02 Hz</span>
                </div>
              </div>

              <p className={`text-[10px] font-medium text-center font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                DTE Rajasthan • VPP-RJ-01
              </p>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-1 cursor-pointer"
              title="SYSTEM STATUS: ● Systems Online (Grid Sync 50.02 Hz, Availability 99.8%)"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-[9px] font-mono mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-bold'}`}>99.8%</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
