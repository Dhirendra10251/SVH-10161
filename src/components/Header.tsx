import React, { useEffect, useState } from 'react';
import { CampusProfile, TabType } from '../types';
import { CAMPUS_LIST } from '../data/mockData';
import { RajasthanBrandingLogo } from './RajasthanBrandingLogo';
import { UrjaSetuBrandWordmark } from './UrjaSetuBrandWordmark';
import {
  Menu,
  Building2,
  Bell,
  Sun,
  Moon,
  Zap,
  FileText,
  Clock,
  UserCheck,
  CheckCircle2,
  ChevronDown,
  Home,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  selectedCampus: CampusProfile;
  onSelectCampus: (campus: CampusProfile) => void;
  onOpenReport: () => void;
  onNavigateHome?: () => void;
  onOpenDistrictNavigator?: () => void;
  onOpenProvenanceModal?: () => void;
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  pendingCount: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCampus,
  onSelectCampus,
  onOpenReport,
  onNavigateHome,
  onOpenDistrictNavigator,
  onOpenProvenanceModal,
  activeTab,
  onChangeTab,
  pendingCount,
  isDarkMode = false,
  onToggleDarkMode,
  onToggleSidebar,
  isSidebarCollapsed,
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 h-16 border-b transition-colors ${
        isDarkMode
          ? 'bg-[#080d1a]/95 border-slate-800 text-slate-100 backdrop-blur-md'
          : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur-md'
      }`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* LEFT REGION: HAMBURGER TOGGLE & URJASETU WORDMARK */}
        <div className="flex items-center gap-3">
          {/* Hamburger / Menu Icon (Always accessible!) */}
          <button
            id="sidebar-toggle-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation sidebar"
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* UrjaSetu Logo & Wordmark (Returns to Landing Page) */}
          <div
            id="header-urjasetu-brand"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            title="UrjaSetu Home • Return to Landing Page"
          >
            <RajasthanBrandingLogo
              variant="icon"
              isDarkMode={isDarkMode}
            />

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2">
                <UrjaSetuBrandWordmark
                  size="header"
                  isDarkMode={isDarkMode}
                />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  isDarkMode ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-blue-100 text-blue-900 border-blue-300'
                }`}>
                  Govt. Pilot
                </span>
              </div>
              <span className={`text-[10.5px] font-medium leading-tight ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Campus Virtual Power Plant • DTE Rajasthan
              </span>
            </div>
          </div>

          {/* Rajasthan Government Authenticity Mark */}
          <div className="hidden sm:flex items-center pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800 shrink-0">
            <RajasthanBrandingLogo
              variant="header"
              isDarkMode={isDarkMode}
              onClick={onNavigateHome}
            />
          </div>

          {/* Secondary UrjaSetu Home Action (Returns to Landing Page) */}
          <button
            id="header-home-action-btn"
            onClick={onNavigateHome}
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-300 text-slate-800 hover:text-slate-950 hover:bg-slate-100'
            }`}
            title="Return to UrjaSetu Landing Page"
          >
            <Home className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
            <span>Home</span>
          </button>
        </div>

        {/* CENTER / RIGHT REGION: DISTRICT, CAMPUS SELECTOR, NOTIFICATIONS, AUDIT & THEME */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Government District Navigator Button */}
          {onOpenDistrictNavigator && (
            <button
              onClick={onOpenDistrictNavigator}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-amber-500/50'
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-blue-500'
              }`}
              title="Browse Rajasthan 41 Districts & Institutional Pilot Nodes"
            >
              <MapPin className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-blue-700'}`} />
              <div className="flex flex-col text-left">
                <span className="text-[8.5px] uppercase font-mono tracking-wider opacity-75">
                  Rajasthan (41)
                </span>
                <span className="text-[11px] font-bold truncate max-w-[90px] md:max-w-[120px]">
                  {selectedCampus.district.split(',')[0]}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
            </button>
          )}

          {/* Institution / Campus Selector */}
          <div className="relative">
            <div
              className={`flex items-center border rounded-xl px-2.5 sm:px-3 py-1.5 transition-colors shadow-xs ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-700 text-slate-200 focus-within:border-amber-500/50'
                  : 'bg-white border-slate-300 text-slate-900 focus-within:border-blue-600'
              }`}
            >
              <Building2 className={`w-4 h-4 mr-2 shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-blue-700'}`} />
              <div className="flex flex-col text-left mr-1">
                <span className={`text-[9px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                  Institute / Campus Node
                </span>
                <select
                  id="header-campus-selector"
                  value={selectedCampus.id}
                  onChange={(e) => {
                    const found = CAMPUS_LIST.find((c) => c.id === e.target.value);
                    if (found) onSelectCampus(found);
                  }}
                  className="bg-transparent text-xs sm:text-[13px] font-bold focus:outline-none cursor-pointer pr-4 text-inherit appearance-none max-w-[140px] sm:max-w-[210px] md:max-w-[260px] truncate"
                  aria-label="Select Institute or Campus"
                >
                  {CAMPUS_LIST.map((campus) => {
                    const statusLabel =
                      campus.verificationStatus === 'VERIFIED'
                        ? `[Verified ${campus.solarCapacityKw} kW]`
                        : campus.verificationStatus === 'TENDER_UNCONFIRMED'
                        ? '[Tender 300 kW Unconfirmed]'
                        : '[Gateway Pending]';
                    return (
                      <option
                        key={campus.id}
                        value={campus.id}
                        className={isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800'}
                      >
                        {campus.name} {statusLabel}
                      </option>
                    );
                  })}
                </select>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 pointer-events-none -ml-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            </div>
          </div>

          {/* Provenance Audit Modal Action Button */}
          {onOpenProvenanceModal && (
            <button
              onClick={onOpenProvenanceModal}
              className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border transition-colors cursor-pointer shadow-2xs ${
                isDarkMode
                  ? 'bg-blue-950/60 border-cyan-500/40 text-cyan-300 hover:bg-blue-900/60'
                  : 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100'
              }`}
              title="Inspect Data Provenance & Statutory Verification Audit Trail"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Trail</span>
            </button>
          )}

          {/* Real-time Clock Indicator (Tablet/Desktop) */}
          <div
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            <span>{timeString || '12:00 PM'} IST</span>
          </div>

          {/* Notification / Alert Icon Button with Badge */}
          <div className="relative">
            <button
              id="header-notifications-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
              }}
              className={`relative p-2 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-300 text-slate-800 hover:text-slate-950 hover:bg-slate-100'
              }`}
              title="System Alerts & Dispatch Recommendations"
              aria-label="Open notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-blue-700 text-white dark:bg-amber-500 dark:text-slate-950 text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Notifications Flyout Dropdown */}
            {showNotifications && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-xl border p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-slate-100'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">VPP Orchestration Alerts</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-100 text-blue-900'
                    }`}>
                      {pendingCount} Pending
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div
                    onClick={() => {
                      onChangeTab('recommendations');
                      setShowNotifications(false);
                    }}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      isDarkMode
                        ? 'bg-slate-950/60 border-slate-800 hover:border-amber-500/40'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-900 dark:text-slate-100">Midday Solar Surplus Optimization</p>
                    <p className={`text-[11px] mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      Recommendation: Charge 50 kWh battery now before 2 PM to avoid peak DISCOM rates.
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      onChangeTab('recommendations');
                      setShowNotifications(false);
                    }}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      isDarkMode
                        ? 'bg-slate-950/60 border-slate-800 hover:border-amber-500/40'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-900 dark:text-slate-100">Shift Lab HVAC Load</p>
                    <p className={`text-[11px] mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      Mechanical block computing lab schedule can be shifted 2 hours forward.
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t flex justify-end">
                  <button
                    onClick={() => {
                      onChangeTab('recommendations');
                      setShowNotifications(false);
                    }}
                    className={`text-xs font-bold transition-colors ${
                      isDarkMode ? 'text-amber-400 hover:underline' : 'text-blue-700 hover:underline'
                    }`}
                  >
                    View All {pendingCount} Recommendations →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Reports / Audit Action Button */}
          <button
            onClick={onOpenReport}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-950'
            }`}
            title="View & Download Official VPP Audit Report"
          >
            <FileText className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`} />
            <span>Audit</span>
          </button>

          {/* Theme Toggle (Light / Night Ops) */}
          {onToggleDarkMode && (
            <button
              id="header-theme-toggle"
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Night Ops Mode'}
              aria-label="Toggle dark/light mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          )}

          {/* Facility Operator / User Badge */}
          <div
            className={`hidden lg:flex items-center gap-2 pl-2 border-l ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                isDarkMode
                  ? 'bg-slate-800 text-slate-200 border border-slate-700'
                  : 'bg-slate-200 text-slate-800 border border-slate-300'
              }`}
              title="Chief Facility Manager • Jaipur Node"
            >
              <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                Er. R. K. Sharma
              </span>
              <span className={`text-[10px] font-medium leading-tight ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Chief Electrical Engr
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
