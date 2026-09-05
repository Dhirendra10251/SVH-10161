import React, { useState, useEffect } from 'react';
import { TabType, CampusProfile, MetricData, RecommendationItem, SimulatorState } from './types';
import { CAMPUS_LIST, INITIAL_METRICS, INITIAL_RECOMMENDATIONS } from './data/mockData';
import { Landing } from './components/Landing';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LiveOverview } from './components/LiveOverview';
import { Recommendations } from './components/Recommendations';
import { Simulator } from './components/Simulator';
import { ReportsView } from './components/ReportsView';
import { DTEMultiCampus } from './components/DTEMultiCampus';
import { ReportModal } from './components/ReportModal';
import { PrintAuditCertificate } from './components/PrintAuditCertificate';
import { NotificationToast } from './components/NotificationToast';
import { A11yModal } from './components/A11yModal';
import { DistrictNavigatorModal } from './components/DistrictNavigatorModal';
import { DataProvenanceModal } from './components/DataProvenanceModal';
import { ShieldCheck, Zap, HeartPulse, Building2, Eye, Moon, Sun, MessageSquare, HelpCircle } from 'lucide-react';

const getTabFromHash = (): TabType => {
  if (typeof window === 'undefined') return 'landing';
  const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!hash || hash === 'landing') return 'landing';
  if (hash === 'overview' || hash === 'dashboard') return 'overview';
  if (hash === 'recommendations') return 'recommendations';
  if (hash === 'simulator') return 'simulator';
  if (hash === 'reports') return 'reports';
  if (hash === 'dte') return 'dte';
  return 'landing';
};

export default function App() {
  const [selectedCampus, setSelectedCampus] = useState<CampusProfile>(() => {
    try {
      const savedId = localStorage.getItem('urjasetu_selected_campus_id');
      if (savedId) {
        const found = CAMPUS_LIST.find((c) => c.id === savedId);
        if (found) return found;
      }
    } catch {}
    return CAMPUS_LIST[0];
  });
  const [metrics, setMetrics] = useState<MetricData>(INITIAL_METRICS);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);
  const [simulatorState, setSimulatorState] = useState<SimulatorState>({
    additionalSolarKw: 0,
    shiftLabHours: 0,
  });

  // Root entry point is the Landing Page (as requested by user architecture)
  const [activeTab, setActiveTab] = useState<TabType>(getTabFromHash);
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState<boolean>(false);
  const [isProvenanceModalOpen, setIsProvenanceModalOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('urjasetu_dark_mode') === 'true';
    } catch {
      return false; // Default: LIGHT theme
    }
  });

  // Text size state with persistence and CSS variable scaling
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>(() => {
    try {
      const saved = localStorage.getItem('urjasetu_font_size');
      if (saved === 'sm' || saved === 'md' || saved === 'lg') return saved;
    } catch {}
    return 'md';
  });

  // Screen Reader Access state with persistence & enhanced a11y styling
  const [screenReaderActive, setScreenReaderActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('urjasetu_screen_reader') === 'true';
    } catch {
      return false;
    }
  });
  const [isA11yModalOpen, setIsA11yModalOpen] = useState<boolean>(false);
  const [a11yAnnouncement, setA11yAnnouncement] = useState<string>('');

  // Sidebar responsive & collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false); // Default expanded on desktop
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Count pending recommendations
  const pendingCount = recommendations.filter((r) => r.status === 'pending').length;

  // Apply font scale to document root
  useEffect(() => {
    const scaleMap = {
      sm: 0.9,
      md: 1.0,
      lg: 1.15,
    };
    const scale = scaleMap[fontSize];
    document.documentElement.style.setProperty('--app-font-scale', scale.toString());
    document.documentElement.style.fontSize = `${scale * 100}%`;
    try {
      localStorage.setItem('urjasetu_font_size', fontSize);
    } catch {}
  }, [fontSize]);

  // Apply screen reader enhanced accessibility class to body
  useEffect(() => {
    if (screenReaderActive) {
      document.body.classList.add('enhanced-a11y');
    } else {
      document.body.classList.remove('enhanced-a11y');
    }
    try {
      localStorage.setItem('urjasetu_screen_reader', screenReaderActive ? 'true' : 'false');
    } catch {}
  }, [screenReaderActive]);

  // Apply dark mode class to documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('urjasetu_dark_mode', isDarkMode ? 'true' : 'false');
    } catch {}
  }, [isDarkMode]);

  // Global keyboard shortcuts (Alt+1..5, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          handleNavigateTab('overview');
        } else if (e.key === '2') {
          e.preventDefault();
          handleNavigateTab('recommendations');
        } else if (e.key === '3') {
          e.preventDefault();
          handleNavigateTab('simulator');
        } else if (e.key === '4') {
          e.preventDefault();
          handleNavigateTab('reports');
        } else if (e.key === '5') {
          e.preventDefault();
          handleNavigateTab('dte');
        } else if (e.key === '0') {
          e.preventDefault();
          handleNavigateTab('landing');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync route and hash navigation
  const handleNavigateTab = (tab: TabType) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const targetHash = tab === 'landing' ? '#/' : `#/${tab}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    }
    const tabLabels: Record<TabType, string> = {
      landing: 'Public Landing Portal',
      overview: 'Live Overview Node Telemetry',
      recommendations: 'Explainable AI Recommendations',
      simulator: 'What-If Expansion Simulator',
      reports: 'Compliance and Energy Reports',
      dte: 'Directorate Multi-Campus Command',
    };
    setA11yAnnouncement(`Navigated to ${tabLabels[tab]}`);
  };

  // Browser back/forward (popstate & hashchange) support
  useEffect(() => {
    const handleHashChange = () => {
      const currentTab = getTabFromHash();
      setActiveTab(currentTab);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handler: Toggle Screen Reader mode
  const handleToggleScreenReader = () => {
    const next = !screenReaderActive;
    setScreenReaderActive(next);
    const msg = next
      ? 'Screen Reader & Enhanced Accessibility Mode enabled (WCAG 2.1 AAA).'
      : 'Standard Navigation Mode enabled.';
    setToastMessage(msg);
    setA11yAnnouncement(msg);
  };

  // Handler: Change font size
  const handleChangeFontSize = (size: 'sm' | 'md' | 'lg') => {
    setFontSize(size);
    const labels = {
      sm: 'Compact (90% scale)',
      md: 'Standard (100% scale)',
      lg: 'Large (115% scale)',
    };
    const msg = `Text size set to ${labels[size]}`;
    setToastMessage(msg);
    setA11yAnnouncement(msg);
  };

  // Handler: Select Campus
  const handleSelectCampus = (campus: CampusProfile) => {
    setSelectedCampus(campus);
    try {
      localStorage.setItem('urjasetu_selected_campus_id', campus.id);
    } catch {}
    setMetrics({
      ...INITIAL_METRICS,
      solarNowKw: Math.round(campus.solarCapacityKw * 0.35),
      windNowKw: Math.round(campus.windCapacityKw * 0.32),
      batteryCapacityKwh: campus.batteryCapacityKwh,
    });
    const msg = `Connected to VPP Telemetry Node: ${campus.name} (${campus.code})`;
    setToastMessage(msg);
    setA11yAnnouncement(msg);
  };

  // Handler: Enter Command Center from Landing Page
  const handleEnterDashboard = (campus?: CampusProfile) => {
    if (campus) {
      handleSelectCampus(campus);
    }
    handleNavigateTab('overview');
  };

  // Handler: Return to Landing Page from Command Center
  const handleNavigateHome = () => {
    handleNavigateTab('landing');
  };

  // Handler: Acknowledge Recommendation
  const handleAcknowledgeRecommendation = (id: string) => {
    const updated = recommendations.map((item) => {
      if (item.id === id) {
        return { ...item, status: 'acknowledged' as const };
      }
      return item;
    });
    setRecommendations(updated);
    const target = recommendations.find((r) => r.id === id);
    const msg = `Command dispatched for "${target?.title || 'Action'}". Microgrid controller target: ${target?.targetDevice || 'Main Gateway'}`;
    setToastMessage(msg);
    setA11yAnnouncement(msg);
  };

  // Handler: Select specific recommendation from sidebar
  const handleSelectRecommendation = (id: string | null) => {
    setSelectedRecommendationId(id);
    handleNavigateTab('recommendations');
  };

  // Handler: Select campus from sidebar (maintains tab if on reports or simulator, otherwise navigates to live overview)
  const handleSelectCampusFromSidebar = (campus: CampusProfile) => {
    handleSelectCampus(campus);
    if (activeTab !== 'reports' && activeTab !== 'simulator') {
      handleNavigateTab('overview');
    }
  };

  // Handler: Navigate to Simulator with Preset
  const handleNavigateToSimulatorWithPreset = (solarKw: number, shiftHours: number) => {
    setSimulatorState({
      additionalSolarKw: solarKw,
      shiftLabHours: shiftHours,
    });
    handleNavigateTab('simulator');
    setToastMessage(`Applied preset to simulator: +${solarKw} kW Solar & +${shiftHours}h Shift`);
  };

  // Toggle sidebar function
  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  // Check if current view is the public landing page outside dashboard shell
  const isLandingView = activeTab === 'landing';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#050811] text-slate-100 selection:bg-amber-500 selection:text-slate-950'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white'
      }`}
    >
      {/* Invisible Screen Reader Live Announcer */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {a11yAnnouncement}
      </div>

      {/* 1. GOVERNMENT ACCESSIBILITY TOOLBAR (Sticky at top for screen reader & compliance) */}
      <div
        role="region"
        aria-label="Accessibility and Display Controls"
        className={`no-print text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b flex flex-wrap items-center justify-between gap-2 z-40 transition-all duration-300 ${
          isLandingView
            ? 'w-full'
            : isSidebarCollapsed
            ? 'lg:pl-[84px]'
            : 'lg:pl-72'
        } ${
          isDarkMode
            ? 'bg-[#04060e] text-slate-300 border-slate-800/80'
            : 'bg-slate-100 text-slate-800 border-slate-300'
        }`}
      >
        {/* Left: Skip Link */}
        <div className="flex items-center gap-2">
          <a
            href="#main-content"
            className="hover:underline font-bold text-blue-700 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-blue-600 px-1 py-0.5 rounded"
          >
            Skip to Main Content
          </a>
        </div>

        {/* Right: Screen Reader, Font Controls, Contrast */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Screen Reader Access Toggle Button & Guide */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleScreenReader}
              role="switch"
              aria-checked={screenReaderActive}
              aria-label="Toggle Screen Reader Access Mode"
              className={`font-bold inline-flex items-center gap-1.5 px-2 py-0.5 rounded border transition-all cursor-pointer ${
                screenReaderActive
                  ? isDarkMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                    : 'bg-blue-100 text-blue-900 border-blue-600 font-extrabold shadow-2xs'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
              title="Toggle Screen Reader Access Mode"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Screen Reader Access:</span>
              <span className={`px-1 rounded text-[10px] font-mono uppercase ${
                screenReaderActive
                  ? isDarkMode ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-blue-700 text-white font-bold'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
              }`}>
                {screenReaderActive ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={() => setIsA11yModalOpen(true)}
              aria-label="Open Accessibility & Keyboard Shortcuts Guide"
              className={`p-1 rounded border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
              }`}
              title="Accessibility & Keyboard Shortcuts Guide"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className={isDarkMode ? 'text-slate-700' : 'text-slate-400'} aria-hidden="true">|</span>

          {/* Text Size Controls: A- A A+ */}
          <div className="flex items-center gap-1" role="group" aria-label="Text Size Controls">
            <span className={`text-[10.5px] font-bold mr-0.5 hidden sm:inline ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              Text Size:
            </span>
            <button
              onClick={() => handleChangeFontSize('sm')}
              aria-pressed={fontSize === 'sm'}
              className={`px-2 py-0.5 rounded border text-[11px] font-extrabold cursor-pointer transition-colors ${
                fontSize === 'sm'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-blue-700 text-white border-blue-800 font-black'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
              title="Decrease Font Size (90%)"
            >
              A-
            </button>
            <button
              onClick={() => handleChangeFontSize('md')}
              aria-pressed={fontSize === 'md'}
              className={`px-2 py-0.5 rounded border text-[11px] font-extrabold cursor-pointer transition-colors ${
                fontSize === 'md'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-blue-700 text-white border-blue-800 font-black'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
              title="Standard Font Size (100%)"
            >
              A
            </button>
            <button
              onClick={() => handleChangeFontSize('lg')}
              aria-pressed={fontSize === 'lg'}
              className={`px-2 py-0.5 rounded border text-[11px] font-extrabold cursor-pointer transition-colors ${
                fontSize === 'lg'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-blue-700 text-white border-blue-800 font-black'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
              title="Increase Font Size (115%)"
            >
              A+
            </button>
          </div>

          <span className={isDarkMode ? 'text-slate-700' : 'text-slate-400'} aria-hidden="true">|</span>

          {/* Light / Night Ops Toggle */}
          <button
            onClick={() => {
              const next = !isDarkMode;
              setIsDarkMode(next);
              const msg = next ? 'Switched to Night Ops Dark Mode.' : 'Switched to Official Light Theme.';
              setToastMessage(msg);
              setA11yAnnouncement(msg);
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10.5px] font-bold border cursor-pointer transition-colors ${
              isDarkMode
                ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
            title="Toggle Light / Night Ops Mode"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            <span>{isDarkMode ? 'Light Mode' : 'Night Ops'}</span>
          </button>
        </div>
      </div>

      {/* 2. TOP-LEVEL VIEW ROUTING */}
      {isLandingView ? (
        /* ============================================================ */
        /* LANDING PAGE EXPERIENCE: OUTSIDE DASHBOARD SHELL             */
        /* No sidebar, no dashboard header, separate top-level page     */
        /* ============================================================ */
        <main id="main-content" className="no-print flex-1 w-full flex flex-col">
          <Landing
            onEnterDashboard={handleEnterDashboard}
            onOpenDistrictNavigator={() => setIsDistrictModalOpen(true)}
            onOpenProvenanceModal={() => setIsProvenanceModalOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        </main>
      ) : (
        /* ============================================================ */
        /* COMMAND CENTER EXPERIENCE: INSIDE DASHBOARD SHELL            */
        /* Collapsible Sidebar + Header with controls + KPI views       */
        /* ============================================================ */
        <div id="dashboard-shell" className="no-print flex-1 flex relative">
          {/* COLLAPSIBLE LEFT SIDEBAR (Wireframe Region B) */}
          <Sidebar
            activeTab={activeTab}
            onChangeTab={handleNavigateTab}
            pendingCount={pendingCount}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            selectedCampus={selectedCampus}
            onSelectCampus={handleSelectCampusFromSidebar}
            campuses={CAMPUS_LIST}
            recommendations={recommendations}
            selectedRecommendationId={selectedRecommendationId}
            onSelectRecommendation={handleSelectRecommendation}
            isDarkMode={isDarkMode}
          />

          {/* MAIN COLUMN (HEADER + DYNAMIC MAIN CONTENT + FOOTER) */}
          <div
            className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
              // Offset for fixed sidebar on desktop
              isSidebarCollapsed ? 'lg:pl-[68px]' : 'lg:pl-64'
            }`}
          >
            {/* TOP HEADER / NAVBAR (Wireframe Region A) */}
            <Header
              selectedCampus={selectedCampus}
              onSelectCampus={handleSelectCampus}
              onOpenReport={() => setIsReportOpen(true)}
              onNavigateHome={handleNavigateHome}
              onOpenDistrictNavigator={() => setIsDistrictModalOpen(true)}
              onOpenProvenanceModal={() => setIsProvenanceModalOpen(true)}
              activeTab={activeTab}
              onChangeTab={handleNavigateTab}
              pendingCount={pendingCount}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onToggleSidebar={handleToggleSidebar}
              isSidebarCollapsed={isSidebarCollapsed}
            />

            {/* MAIN CONTENT AREA (Wireframe Region C) */}
            <main id="main-content" className="flex-1 w-full p-4 sm:p-6 lg:p-8">
              {/* View 1: Live Overview Dashboard (Primary Dashboard Screen) */}
              {activeTab === 'overview' && (
                <LiveOverview
                  metrics={metrics}
                  campus={selectedCampus}
                  onNavigateToSimulator={() => handleNavigateTab('simulator')}
                  onNavigateToRecommendations={() => handleNavigateTab('recommendations')}
                  onOpenDistrictNavigator={() => setIsDistrictModalOpen(true)}
                  onOpenProvenanceModal={() => setIsProvenanceModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* View 2: Recommendations (Explainable AI Dispatch) */}
              {activeTab === 'recommendations' && (
                <Recommendations
                  recommendations={recommendations}
                  onAcknowledge={handleAcknowledgeRecommendation}
                  onNavigateToSimulatorWithPreset={handleNavigateToSimulatorWithPreset}
                  selectedRecId={selectedRecommendationId}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* View 3: What-If Simulator */}
              {activeTab === 'simulator' && (
                <Simulator
                  simulatorState={simulatorState}
                  onChangeState={setSimulatorState}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* View 4: Reports (Audit Certificates, Tariff & Carbon Savings) */}
              {activeTab === 'reports' && (
                <ReportsView
                  campus={selectedCampus}
                  metrics={metrics}
                  recommendations={recommendations}
                  onOpenAuditModal={() => setIsReportOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )}

              {/* View 5: DTE / Multi-Campus Overview */}
              {activeTab === 'dte' && (
                <DTEMultiCampus
                  selectedCampus={selectedCampus}
                  onSelectCampus={handleSelectCampus}
                  onSwitchToOverview={() => handleNavigateTab('overview')}
                  onOpenDistrictNavigator={() => setIsDistrictModalOpen(true)}
                  onOpenProvenanceModal={() => setIsProvenanceModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )}
            </main>

            {/* Institutional Footer */}
            <footer
              className={`border-t py-6 mt-auto text-xs transition-colors ${
                isDarkMode
                  ? 'bg-[#080d1a] border-slate-800 text-slate-400'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 ${
                        isDarkMode
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          : 'bg-blue-100 border border-blue-200 text-blue-700'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        UrjaSetu • Virtual Power Plant Orchestration Platform
                      </p>
                      <p className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                        Directorate of Technical Education, Government of Rajasthan • Inter-Campus Clean Energy Pilot
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap gap-4 text-[11px]">
                    <span className={`flex items-center gap-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      <Building2 className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
                      Node: <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-900'}>{selectedCampus.code}</strong>
                    </span>
                    <span className={isDarkMode ? 'text-slate-800' : 'text-slate-300'}>|</span>
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                      <HeartPulse className="w-3.5 h-3.5" />
                      VPP Telemetry 100% Operational
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800/80 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono">
                  <div className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Prepared for: <strong className={`font-semibold font-serif ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>Directorate of Technical Education, Government of Rajasthan</strong> · Status: <span className="text-blue-700 dark:text-amber-400 font-bold">Hackathon Pilot Submission</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setToastMessage('Feedback portal initialized. Query logged with DTE Energy Operations Desk.')}
                      className="hover:underline text-blue-700 dark:text-amber-400 font-sans inline-flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Feedback / Report an Issue</span>
                    </button>
                    <span className={isDarkMode ? 'text-slate-800' : 'text-slate-300'}>•</span>
                    <span className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Last Updated: August 1, 2026</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Executive Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        campus={selectedCampus}
        metrics={metrics}
        recommendations={recommendations}
        simulatorState={simulatorState}
        isDarkMode={isDarkMode}
      />

      {/* Dedicated Print Layout for Official UrjaSetu Audit Certificate */}
      <PrintAuditCertificate
        campus={selectedCampus}
        metrics={metrics}
      />

      {/* Rajasthan 41-District Administrative Navigator Modal */}
      <DistrictNavigatorModal
        isOpen={isDistrictModalOpen}
        onClose={() => setIsDistrictModalOpen(false)}
        selectedCampus={selectedCampus}
        onSelectCampus={(campus) => {
          handleSelectCampus(campus);
          setIsDistrictModalOpen(false);
          if (activeTab === 'landing') {
            handleNavigateTab('overview');
          }
        }}
        isDarkMode={isDarkMode}
      />

      {/* Data Provenance & Verification Audit Ledger Modal */}
      <DataProvenanceModal
        isOpen={isProvenanceModalOpen}
        onClose={() => setIsProvenanceModalOpen(false)}
        selectedCampus={selectedCampus}
        isDarkMode={isDarkMode}
      />

      {/* Accessibility & Screen Reader Options Modal */}
      <A11yModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        screenReaderActive={screenReaderActive}
        onToggleScreenReader={handleToggleScreenReader}
        fontSize={fontSize}
        onChangeFontSize={handleChangeFontSize}
        isDarkMode={isDarkMode}
      />

      {/* Confirmation Toast */}
      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

