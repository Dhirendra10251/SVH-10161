import React, { useState, useEffect } from 'react';
import { CampusProfile } from '../types';
import { CAMPUS_LIST } from '../data/mockData';
import { ProductExplainerVideo } from './ProductExplainerVideo';
import { RajasthanBrandingLogo } from './RajasthanBrandingLogo';
import { UrjaSetuBrandWordmark } from './UrjaSetuBrandWordmark';
import {
  ArrowRight,
  Network,
  TrendingUp,
  MessageSquareText,
  Building2,
  Zap,
  Sparkles,
  ChevronRight,
  Leaf,
  Sun,
  Moon,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

interface LandingProps {
  onEnterDashboard: (campus?: CampusProfile) => void;
  onOpenDistrictNavigator?: () => void;
  onOpenProvenanceModal?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const HERO_SLIDES = [
  {
    name: 'Indian Institute of Technology — Jodhpur',
    code: 'RJ-VPP-01',
    photoUrl: '/campuses/iit-jodhpur.jpg',
    overlayGradient: 'from-slate-950 via-slate-950/80 to-slate-900/60',
    campusData: CAMPUS_LIST[0],
  },
  {
    name: 'Birla Institute of Technology and Science — Pilani',
    code: 'RJ-VPP-02',
    photoUrl: '/campuses/bits-pilani.jpg',
    overlayGradient: 'from-slate-950 via-slate-950/85 to-slate-900/65',
    campusData: CAMPUS_LIST[1],
  },
  {
    name: 'Malaviya National Institute of Technology — Jaipur',
    code: 'RJ-VPP-03',
    photoUrl: '/campuses/mnit-jaipur.jpg',
    overlayGradient: 'from-slate-950 via-slate-950/80 to-slate-900/60',
    campusData: CAMPUS_LIST[2],
  },
  {
    name: 'MBM University — Jodhpur',
    code: 'RJ-VPP-04',
    photoUrl: '/campuses/mbm-jodhpur.jpg',
    overlayGradient: 'from-slate-950 via-slate-950/85 to-slate-900/65',
    campusData: CAMPUS_LIST[3],
  },
  {
    name: 'College of Technology & Agricultural Engineering — Udaipur',
    code: 'RJ-VPP-05',
    photoUrl: '/campuses/ctae-udaipur.png',
    overlayGradient: 'from-slate-950 via-slate-950/80 to-slate-900/60',
    campusData: CAMPUS_LIST[4],
  },
];

export const Landing: React.FC<LandingProps> = ({
  onEnterDashboard,
  onOpenDistrictNavigator,
  onOpenProvenanceModal,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Unified Connection',
      text: "We connect your solar panels, wind turbine, battery, and grid meter into one system.",
      icon: Network,
      color: isDarkMode ? 'text-amber-400' : 'text-blue-700',
      bg: isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-blue-50 border-blue-200',
    },
    {
      number: '02',
      title: 'Smart Forecasts',
      text: "It predicts how much power you'll make and use — hours before it happens.",
      icon: TrendingUp,
      color: 'text-teal-600 dark:text-teal-400',
      bg: isDarkMode ? 'bg-teal-500/10 border-teal-500/30' : 'bg-teal-50 border-teal-200',
    },
    {
      number: '03',
      title: 'Plain Guidance',
      text: "It tells your staff exactly what to do next, in plain language.",
      icon: MessageSquareText,
      color: isDarkMode ? 'text-cyan-400' : 'text-indigo-700',
      bg: isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-indigo-50 border-indigo-200',
    },
    {
      number: '04',
      title: 'Clear Results',
      text: "You see the money saved and carbon avoided, in real numbers.",
      icon: Leaf,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: isDarkMode ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200',
    },
  ];

  // Authoritative pilot campuses derived dynamically from CAMPUS_LIST
  // Displays ALL pilot VPPs with verified authentic institutional imagery
  const pilotCampuses = CAMPUS_LIST.map((campus) => ({
    ...campus,
    photoUrl: campus.imageUrl || `/campuses/${campus.id}.jpg`,
  }));

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* PUBLIC LANDING TOP HEADER / NAVBAR */}
      <header
        className={`sticky top-0 z-30 w-full h-16 border-b transition-colors backdrop-blur-md ${
          isDarkMode
            ? 'bg-[#080d1a]/95 border-slate-800 text-slate-100'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3">
            <RajasthanBrandingLogo
              variant="icon"
              isDarkMode={isDarkMode}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <UrjaSetuBrandWordmark
                  size="header"
                  isDarkMode={isDarkMode}
                />
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  isDarkMode ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  Govt. Pilot
                </span>
              </div>
              <span className={`text-[10.5px] font-medium leading-tight hidden sm:inline ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Campus Virtual Power Plant • DTE Rajasthan
              </span>
            </div>
          </div>

          {/* Nav Links & CTA Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
              <a
                href="#how-it-works"
                className={`transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'text-slate-200 hover:text-amber-400'
                    : 'text-slate-800 hover:text-blue-700'
                }`}
              >
                How It Works
              </a>
              <a
                href="#pilot-campuses"
                className={`transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'text-slate-200 hover:text-amber-400'
                    : 'text-slate-800 hover:text-blue-700'
                }`}
              >
                Pilot Campuses
              </a>
            </nav>

            {onOpenDistrictNavigator && (
              <button
                onClick={onOpenDistrictNavigator}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-blue-900 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>41 Districts</span>
              </button>
            )}

            {onOpenProvenanceModal && (
              <button
                onClick={onOpenProvenanceModal}
                className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-blue-950/60 border-cyan-500/40 text-cyan-300 hover:bg-blue-900/60'
                    : 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Audit Ledger</span>
              </button>
            )}

            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                aria-label="Toggle Night Ops Theme"
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
                title={isDarkMode ? 'Switch to Official Light Theme' : 'Switch to Night Ops Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-800" />}
              </button>
            )}

            <button
              id="landing-header-enter-btn"
              onClick={() => onEnterDashboard()}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-sm group ${
                isDarkMode
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10'
                  : 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-900/20'
              }`}
            >
              <span>Enter Command Center</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <div className="w-full flex-1 pb-16 space-y-16">
        {/* 1. HERO SECTION - FULL BLEED ROTATING CAROUSEL */}
        <section className="relative w-full overflow-hidden bg-slate-950 min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex items-center border-b border-slate-800">
          {/* Background Rotating Images Layer */}
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.name}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                }`}
              >
                <img
                  src={slide.photoUrl}
                  alt={slide.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center transform transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                />
                {/* Per-slide Dark Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlayGradient}`} />
              </div>
            );
          })}

          {/* Hero Content Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/40 text-blue-100 text-xs font-semibold backdrop-blur-md shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-blue-300" />
                  <span>Virtual Power Plant Pilot • Government of Rajasthan</span>
                </div>
              </div>

              {/* Official Rajasthan-themed UrjaSetu Logo Integration */}
              <div className="pt-1">
                <RajasthanBrandingLogo
                  variant="hero"
                  isDarkMode={true}
                />
              </div>

              <div className="space-y-4">
                <h1 className="sr-only">UrjaSetu</h1>
                <div className="pt-1">
                  <UrjaSetuBrandWordmark
                    size="hero"
                    isDarkMode={true}
                  />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-100 leading-relaxed max-w-2xl">
                  Making every campus's solar, wind, and battery power work together — automatically.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-normal">
                Designed for public college campuses in Rajasthan to orchestrate microgrid assets, eliminate peak DISCOM tariffs, and automate clean energy recommendations.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="hero-enter-command-center-btn"
                  onClick={() => onEnterDashboard(HERO_SLIDES[currentSlideIndex].campusData)}
                  className={`inline-flex items-center gap-3 px-6 py-3.5 text-sm sm:text-base font-extrabold rounded-xl transition-all duration-200 cursor-pointer group shadow-lg ${
                    isDarkMode
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-900/40'
                  }`}
                >
                  <span>Enter Command Center</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {onOpenDistrictNavigator && (
                  <button
                    onClick={onOpenDistrictNavigator}
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold rounded-xl border border-slate-600 bg-slate-900/80 hover:bg-slate-800 text-slate-100 transition-all cursor-pointer backdrop-blur-md shadow-md"
                  >
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Browse 41 Districts</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Small Dot Indicators (Bottom-Center) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlideIndex
                    ? isDarkMode
                      ? 'w-8 bg-amber-400 shadow-sm'
                      : 'w-8 bg-blue-500 shadow-sm'
                    : 'w-2.5 bg-slate-500/60 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Small Fading Caption Tag (Bottom-Right) */}
          <div className="absolute bottom-6 right-4 sm:right-8 z-20 max-w-[85vw] sm:max-w-md">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-950/85 border border-slate-700/80 backdrop-blur-md shadow-lg flex items-center gap-2.5 transition-all duration-500">
              <span className="w-2 h-2 rounded-full bg-blue-400 dark:bg-amber-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-slate-100 truncate">
                {HERO_SLIDES[currentSlideIndex].name}
              </span>
              <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
                PILOT SITE
              </span>
            </div>
          </div>
        </section>

        {/* LOWER SECTIONS CONSTRAINED IN MAX-W-7XL GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 2. HOW IT WORKS SECTION */}
          <section id="how-it-works" className="space-y-6 scroll-mt-24">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                Simple Orchestration
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                How UrjaSetu Works
              </h2>
              <p className={`text-xs sm:text-sm mt-1 max-w-2xl font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Watch how UrjaSetu turns scattered campus renewable-energy assets into one coordinated Virtual Power Plant in under one minute.
              </p>
            </div>

            {/* EMBEDDED PRODUCT EXPLAINER VIDEO */}
            <div className="w-full">
              <ProductExplainerVideo
                isDarkMode={isDarkMode}
                onExploreCommandCenter={() => onEnterDashboard()}
              />
            </div>

            {/* ARCHITECTURAL 4-STEP BREAKDOWN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.number}
                    className={`border rounded-xl p-5 transition-all duration-200 shadow-sm flex flex-col justify-between space-y-4 ${
                      isDarkMode
                        ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-100'
                        : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 rounded-lg border ${step.bg}`}>
                          <IconComponent className={`w-5 h-5 ${step.color}`} />
                        </div>
                        <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                          STEP {step.number}
                        </span>
                      </div>
                      <h3 className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. PILOT CAMPUSES SECTION */}
          <section id="pilot-campuses" className="space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4" />
                  Active Deployment
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  Pilot University Campuses
                </h2>
              </div>

              <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                State Microgrid Pilot Sites • Rajasthan
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pilotCampuses.map((campus) => (
                <div
                  key={campus.id}
                  onClick={() => onEnterDashboard(campus)}
                  className={`border rounded-xl overflow-hidden group transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col ${
                    isDarkMode
                      ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
                  }`}
                >
                  {/* Photo */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img
                      src={campus.photoUrl}
                      alt={campus.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider backdrop-blur-md ${
                      isDarkMode
                        ? 'bg-amber-500/90 text-slate-950'
                        : 'bg-blue-700 text-white'
                    }`}>
                      Pilot Site
                    </span>
                    <span className="absolute bottom-3 right-3 text-[11px] font-mono text-white bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700">
                      {campus.code}
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className={`text-sm font-bold transition-colors ${
                        isDarkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-blue-700'
                      }`}>
                        {campus.name}
                      </h3>
                      <p className={`text-xs mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                        {campus.district}
                      </p>
                    </div>

                    <div className={`pt-2 border-t flex items-center justify-between text-xs font-semibold ${
                      isDarkMode ? 'border-slate-800/80 text-amber-400' : 'border-slate-100 text-blue-700'
                    }`}>
                      <span>Enter Command Center</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* PUBLIC INSTITUTIONAL FOOTER */}
      <footer
        className={`border-t py-8 text-xs transition-colors mt-auto ${
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
                  Directorate of Technical Education, Government of Rajasthan • State Clean Energy Initiative
                </p>
              </div>
            </div>

            <button
              onClick={() => onEnterDashboard()}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-blue-700 hover:bg-slate-50'
              }`}
            >
              <span>Access Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`border-t pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono ${
            isDarkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-700'
          }`}>
            <div>
              State Pilot • Government of Rajasthan Technical Colleges
            </div>
            <div>
              Platform Status: <span className="text-emerald-700 dark:text-emerald-400 font-bold">Ready for Operations</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

