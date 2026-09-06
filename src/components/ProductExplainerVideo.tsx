import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Sun,
  Wind,
  BatteryCharging,
  Zap,
  Building2,
  TrendingUp,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Clock,
  IndianRupee,
  Leaf,
  AlertTriangle,
  Info,
  ChevronRight,
  Activity,
  Layers,
  Award,
} from 'lucide-react';

interface Scene {
  id: string;
  number: number;
  title: string;
  tag: string;
  startSec: number;
  durationSec: number;
  narration: string;
  caption: string;
}

const SCENES: Scene[] = [
  {
    id: 'problem',
    number: 1,
    title: 'The Challenge: Disconnected Energy Assets',
    tag: 'SCENE 1 • PROBLEM',
    startSec: 0,
    durationSec: 8,
    narration:
      'Campus energy assets often operate independently, making it difficult to coordinate generation, storage, and demand.',
    caption:
      'Solar panels, wind turbines, battery banks, and campus loads operate in silos without real-time coordination.',
  },
  {
    id: 'connect',
    number: 2,
    title: 'UrjaSetu: The Unified Energy Bridge',
    tag: 'SCENE 2 • VIRTUAL POWER PLANT',
    startSec: 8,
    durationSec: 10,
    narration:
      'UrjaSetu bridges these scattered assets into one coordinated Virtual Power Plant, balancing generation and demand automatically.',
    caption:
      'UrjaSetu connects Solar, Wind, Battery, Grid, and Academic Loads into a single coordinated microgrid.',
  },
  {
    id: 'forecast',
    number: 3,
    title: 'Smart Predictive Forecasting',
    tag: 'SCENE 3 • FORECASTING',
    startSec: 18,
    durationSec: 10,
    narration:
      'By combining weather and satellite data with campus usage patterns, UrjaSetu forecasts generation and demand hours in advance.',
    caption:
      'Ingesting meteorological solar irradiance and institutional load profiles to project 24-hour power curves.',
  },
  {
    id: 'recommend',
    number: 4,
    title: 'Plain-Language Actionable Guidance',
    tag: 'SCENE 4 • RECOMMENDATIONS',
    startSec: 28,
    durationSec: 10,
    narration:
      'Instead of raw charts, it delivers plain-language recommendations to facility staff—optimizing battery charging and shifting flexible loads.',
    caption:
      'Clear, actionable advisories: "Charge battery now", "Shift lab HVAC to 2 PM", and "Hold export until surge tariff".',
  },
  {
    id: 'simulate',
    number: 5,
    title: 'Interactive What-If Simulator',
    tag: 'SCENE 5 • WHAT-IF SCENARIOS',
    startSec: 38,
    durationSec: 8,
    narration:
      'Facility managers can test expansion scenarios in a What-If simulator, projecting financial and carbon savings before investing.',
    caption:
      'Model projected self-consumption and rupee savings when adding rooftop solar or rescheduling lab hours.',
  },
  {
    id: 'results',
    number: 6,
    title: 'Verified Results & Multi-Campus Oversight',
    tag: 'SCENE 6 • AUDIT & DTE VIEW',
    startSec: 46,
    durationSec: 8,
    narration:
      'Operational and compliance reports track verified rupees saved, carbon avoided, and multi-campus coordination for state administrators.',
    caption:
      'Generates official energy audit certificates and provides Directorate-level intelligence across Rajasthan colleges.',
  },
  {
    id: 'identity',
    number: 7,
    title: 'UrjaSetu • Virtual Power Plant',
    tag: 'FINAL • STATE INTELLIGENCE',
    startSec: 54,
    durationSec: 6,
    narration:
      'UrjaSetu: turning scattered campus renewable-energy assets into coordinated campus intelligence.',
    caption:
      'From scattered campus energy assets to coordinated campus intelligence. Government of Rajasthan.',
  },
];

const TOTAL_DURATION_SEC = 60;

interface ProductExplainerVideoProps {
  isDarkMode?: boolean;
  onExploreCommandCenter?: () => void;
}

export const ProductExplainerVideo: React.FC<ProductExplainerVideoProps> = ({
  isDarkMode = false,
  onExploreCommandCenter,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastNarratedSceneRef = useRef<string | null>(null);

  // Check speech synthesis support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Determine active scene based on currentTimeSec
  const currentSceneIndex = SCENES.findIndex(
    (scene) =>
      currentTimeSec >= scene.startSec &&
      currentTimeSec < scene.startSec + scene.durationSec
  );
  const activeScene = currentSceneIndex >= 0 ? SCENES[currentSceneIndex] : SCENES[SCENES.length - 1];

  // Stop speech helper
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }, []);

  // Play narration for current scene
  const playNarration = useCallback(
    (text: string) => {
      if (!isVoiceoverEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.02 * playbackSpeed;
        utterance.pitch = 1.0;
        utterance.lang = 'en-IN'; // Indian English cadence suited for Rajasthan govt platform

        // Try to select an articulate voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find((v) => v.lang.startsWith('en-IN')) ||
          voices.find((v) => v.lang.startsWith('en-GB')) ||
          voices.find((v) => v.lang.startsWith('en-US')) ||
          voices[0];
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech narration notice:', err);
      }
    },
    [isVoiceoverEnabled, playbackSpeed]
  );

  // Timer loop for video playback
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number | null = null;

    if (isPlaying) {
      const step = (timestamp: number) => {
        if (lastTimestamp !== null) {
          const deltaSec = ((timestamp - lastTimestamp) / 1000) * playbackSpeed;
          setCurrentTimeSec((prev) => {
            const next = prev + deltaSec;
            if (next >= TOTAL_DURATION_SEC) {
              setIsPlaying(false);
              stopSpeech();
              return TOTAL_DURATION_SEC;
            }
            return next;
          });
        }
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(step);
      };
      animationFrameId = requestAnimationFrame(step);
    } else {
      stopSpeech();
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, playbackSpeed, stopSpeech]);

  // Trigger narration when entering a new scene during active playback
  useEffect(() => {
    if (isPlaying && isVoiceoverEnabled && activeScene) {
      if (lastNarratedSceneRef.current !== activeScene.id) {
        lastNarratedSceneRef.current = activeScene.id;
        playNarration(activeScene.narration);
      }
    } else if (!isPlaying) {
      lastNarratedSceneRef.current = null;
      stopSpeech();
    }
  }, [activeScene, isPlaying, isVoiceoverEnabled, playNarration, stopSpeech]);

  // Play / Pause toggle
  const togglePlayPause = () => {
    if (currentTimeSec >= TOTAL_DURATION_SEC) {
      // Replay from start
      setCurrentTimeSec(0);
      lastNarratedSceneRef.current = null;
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // Seek to specific timestamp
  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION_SEC, seconds));
    setCurrentTimeSec(clamped);
    lastNarratedSceneRef.current = null;
    stopSpeech();
    if (isPlaying && isVoiceoverEnabled) {
      const targetScene = SCENES.find(
        (s) => clamped >= s.startSec && clamped < s.startSec + s.durationSec
      );
      if (targetScene) {
        playNarration(targetScene.narration);
        lastNarratedSceneRef.current = targetScene.id;
      }
    }
  };

  // Jump to specific scene
  const selectScene = (scene: Scene) => {
    seekTo(scene.startSec);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate scene progress percentage
  const sceneProgress = Math.min(
    1,
    Math.max(0, (currentTimeSec - activeScene.startSec) / activeScene.durationSec)
  );

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border shadow-xl overflow-hidden transition-all duration-300 flex flex-col ${
        isDarkMode
          ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-slate-950/60'
          : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
      } ${isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : 'w-full'}`}
    >
      {/* TOP BAR: Video Status & Scene Badges */}
      <div
        className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/90 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/10 dark:bg-amber-400/10 text-blue-700 dark:text-amber-400 border border-blue-500/20 dark:border-amber-400/20 font-bold uppercase tracking-wider text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Official Product Explainer
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="font-semibold text-slate-600 dark:text-slate-300 text-xs hidden sm:inline">
            45–75 Second Walkthrough
          </span>
        </div>

        {/* Scene Navigation Chips */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {SCENES.map((scene, idx) => {
            const isCurrent = activeScene.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => selectScene(scene)}
                title={`Scene ${scene.number}: ${scene.title}`}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isCurrent
                    ? isDarkMode
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-blue-700 text-white font-bold shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>{scene.number}</span>
                <span className="hidden md:inline font-medium">
                  {idx === 0
                    ? 'Problem'
                    : idx === 1
                    ? 'Connect'
                    : idx === 2
                    ? 'Forecast'
                    : idx === 3
                    ? 'Guidance'
                    : idx === 4
                    ? 'Simulator'
                    : idx === 5
                    ? 'Reports'
                    : 'UrjaSetu'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN SCREEN / ANIMATED CANVAS CONTAINER (16:9 aspect ratio container) */}
      <div className="relative w-full aspect-video min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] bg-slate-950 overflow-hidden flex flex-col justify-between select-none">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* TOP OVERLAY: Current Scene Header Tag */}
        <div className="relative z-20 px-4 sm:px-8 pt-4 sm:pt-6 flex items-start justify-between gap-4 pointer-events-none">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[11px] font-mono font-bold tracking-wider text-amber-400 backdrop-blur-md">
              <Activity className="w-3 h-3" />
              <span>{activeScene.tag}</span>
            </div>
            <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-md">
              {activeScene.title}
            </h3>
          </div>

          {/* Institutional Pilot Badge in Top Right */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 backdrop-blur-md text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Platform</span>
              <span className="text-xs font-bold text-slate-100">UrjaSetu • DTE RJ</span>
            </div>
          </div>
        </div>

        {/* DYNAMIC SCENE CONTENT */}
        <div className="relative z-10 flex-1 px-4 sm:px-8 py-2 flex items-center justify-center">
          {/* ========================================================================= */}
          {/* SCENE 1: THE PROBLEM — DISCONNECTED CAMPUS ASSETS                         */}
          {/* ========================================================================= */}
          {activeScene.id === 'problem' && (
            <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-6 animate-fadeIn">
              {/* Status Header Callout */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Uncoordinated Campus Assets • High Peak Discom Charges</span>
              </div>

              {/* 5 Disconnected Energy Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
                {[
                  {
                    title: 'Solar PV Array',
                    spec: '1,000 kW Installed',
                    status: 'Surplus Uncoordinated',
                    icon: Sun,
                    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
                  },
                  {
                    title: 'Wind Turbine',
                    spec: '35 kW Peak',
                    status: 'Intermittent Output',
                    icon: Wind,
                    color: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
                  },
                  {
                    title: 'Battery Bank',
                    spec: '250 kWh Storage',
                    status: 'Idle Substation State',
                    icon: BatteryCharging,
                    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                  },
                  {
                    title: 'DISCOM Grid',
                    spec: 'Net-Metering Feed',
                    status: '₹6.80/kWh Peak Tariff',
                    icon: Zap,
                    color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
                  },
                  {
                    title: 'Campus Loads',
                    spec: 'Computing & Labs',
                    status: '650 kW Peak Demand',
                    icon: Building2,
                    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
                  },
                ].map((node) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.title}
                      className="border border-dashed border-slate-700 rounded-xl p-3.5 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center text-center space-y-2 relative group hover:border-slate-500 transition-colors"
                    >
                      <div className={`p-2.5 rounded-lg border ${node.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100">{node.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{node.spec}</div>
                      </div>
                      <div className="text-[10px] px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40 font-medium">
                        {node.status}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Problem Explanation Box */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 max-w-2xl text-center">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  "Campus energy assets often operate independently, making it difficult to coordinate generation, storage, and demand."
                </p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCENE 2: URJASETU CONNECTS EVERYTHING — VIRTUAL POWER PLANT               */}
          {/* ========================================================================= */}
          {activeScene.id === 'connect' && (
            <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-6 animate-fadeIn">
              {/* Visual Bridge / Connection Animation */}
              <div className="relative w-full flex flex-col items-center">
                {/* 5 Input Sources converging into UrjaSetu */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4">
                  {[
                    { label: 'Solar', icon: Sun, color: 'text-amber-400' },
                    { label: 'Wind', icon: Wind, color: 'text-teal-400' },
                    { label: 'Battery', icon: BatteryCharging, color: 'text-emerald-400' },
                    { label: 'Grid', icon: Zap, color: 'text-purple-400' },
                    { label: 'Campus Load', icon: Building2, color: 'text-blue-400' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs text-slate-200 font-semibold"
                      >
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Animated Bridge Connectors (SVG) */}
                <div className="w-full max-w-md h-12 flex items-center justify-center relative">
                  <svg className="w-full h-full" viewBox="0 0 400 48" fill="none">
                    <path
                      d="M 50 4 C 150 4, 150 44, 200 44"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                    <path
                      d="M 125 4 C 160 4, 180 44, 200 44"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 200 4 L 200 44"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 275 4 C 240 4, 220 44, 200 44"
                      stroke="#a855f7"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 350 4 C 250 4, 250 44, 200 44"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  </svg>
                </div>

                {/* Central UrjaSetu VPP Hub */}
                <div className="relative mt-2 p-5 rounded-2xl bg-gradient-to-b from-blue-950/80 to-slate-900/95 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 flex flex-col items-center text-center max-w-md w-full">
                  <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    Central Orchestrator
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-6 h-6 text-amber-400" />
                    <span className="text-xl font-extrabold text-white tracking-tight">
                      URJASETU
                    </span>
                  </div>
                  <div className="text-sm font-bold text-amber-300 uppercase tracking-widest">
                    VIRTUAL POWER PLANT (VPP)
                  </div>
                  <p className="text-xs text-slate-300 mt-2 font-medium">
                    "Urja" (Energy) + "Setu" (Bridge) — Unifying scattered generation, storage, and demand into one coordinated system.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCENE 3: SMART FORECASTING                                                */}
          {/* ========================================================================= */}
          {activeScene.id === 'forecast' && (
            <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-4 animate-fadeIn">
              {/* Dual Ingestion Layer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Weather & Satellite Data */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">Weather & Irradiance Telemetry</div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Direct Normal Irradiance (DNI) + Temperature satellite feeds
                    </div>
                  </div>
                </div>

                {/* Campus Demand Data */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">Campus Metering Telemetry</div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Academic class schedule, lab loads & evening hostel peaks
                    </div>
                  </div>
                </div>
              </div>

              {/* 24-Hour Projected Forecast Chart Simulation */}
              <div className="w-full p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    24-Hour Day-Ahead Predictive Forecast
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-semibold">
                    <span className="flex items-center gap-1 text-amber-400">
                      <span className="w-2.5 h-1 bg-amber-400 rounded-full inline-block" />
                      Solar Gen Forecast
                    </span>
                    <span className="flex items-center gap-1 text-blue-400">
                      <span className="w-2.5 h-1 bg-blue-400 rounded-full inline-block" />
                      Campus Demand
                    </span>
                  </div>
                </div>

                {/* SVG Curve Representation */}
                <div className="w-full h-28 relative">
                  <svg className="w-full h-full" viewBox="0 0 600 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="25" x2="600" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="600" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="600" y2="75" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />

                    {/* Solar Generation Curve (Peaks midday 11:00-15:00) */}
                    <path
                      d="M 0 95 Q 150 95, 200 65 Q 300 5, 400 65 Q 450 95, 600 95"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />
                    {/* Solar Fill Gradient */}
                    <path
                      d="M 0 95 Q 150 95, 200 65 Q 300 5, 400 65 Q 450 95, 600 95 L 600 100 L 0 100 Z"
                      fill="#f59e0b"
                      fillOpacity="0.1"
                    />

                    {/* Campus Demand Curve (Active academic morning + evening hostel surge) */}
                    <path
                      d="M 0 75 Q 100 70, 200 40 Q 300 35, 420 45 Q 500 20, 600 65"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />

                    {/* Indicator markers */}
                    <circle cx="300" cy="18" r="4" fill="#f59e0b" />
                    <circle cx="500" cy="22" r="4" fill="#38bdf8" />
                  </svg>

                  {/* Callout tags */}
                  <div className="absolute top-1 left-[45%] -translate-x-1/2 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                    Midday Solar Peak (Surplus +18 kW)
                  </div>
                  <div className="absolute top-2 right-4 px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/40 text-[10px] font-bold text-blue-300">
                    Hostel Peak (7:00 PM)
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span>00:00 (Night)</span>
                  <span>06:00 (Sunrise)</span>
                  <span>12:00 (Solar Peak)</span>
                  <span>18:00 (Evening)</span>
                  <span>23:00 (Night)</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCENE 4: ACTIONABLE RECOMMENDATIONS                                       */}
          {/* ========================================================================= */}
          {activeScene.id === 'recommend' && (
            <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <div className="text-xs font-semibold text-amber-400">
                  Not just complex graphs — clear plain-language advisories
                </div>
              </div>

              {/* 3 Real Supported Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                {/* Recommendation 1 */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 shadow-lg shadow-emerald-500/5 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                        High Priority
                      </span>
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-sm font-bold text-white">Charge battery now</div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Solar surplus (+18 kW) before afternoon clouds. Store now to avoid DISCOM evening tariff.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono font-semibold text-emerald-400">
                    <span>Saves ₹420 / peak cycle</span>
                    <span>18.5 kg CO₂</span>
                  </div>
                </div>

                {/* Recommendation 2 */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-blue-500/40 shadow-lg shadow-blue-500/5 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                        Medium Priority
                      </span>
                      <Building2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-sm font-bold text-white">Shift lab HVAC to 2 PM</div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Pre-cool computing and mechanical lab block during peak midday rooftop solar generation.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono font-semibold text-blue-400">
                    <span>Saves ₹310 / day</span>
                    <span>14.2 kg CO₂</span>
                  </div>
                </div>

                {/* Recommendation 3 */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/40 shadow-lg shadow-amber-500/5 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        Tariff Window
                      </span>
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-sm font-bold text-white">Hold export decision</div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Grid feed-in tariff steps up at 5:00 PM (Surge: ₹6.80 vs ₹4.20/kWh standard rate).
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono font-semibold text-amber-400">
                    <span>Adds ₹280 net revenue</span>
                    <span>+61% Yield</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCENE 5: WHAT-IF SIMULATOR                                                */}
          {/* ========================================================================= */}
          {activeScene.id === 'simulate' && (
            <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-4 animate-fadeIn">
              {/* Scenario Sliders Simulation */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      Add Solar Capacity
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 font-mono font-bold text-xs">
                      +10 kW
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[45%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-400" />
                      Shift Lab HVAC Hours
                    </span>
                    <span className="px-2 py-0.5 rounded bg-teal-400/10 text-teal-400 font-mono font-bold text-xs">
                      +2 Hours
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full w-[60%]" />
                  </div>
                </div>
              </div>

              {/* Baseline vs Projected Comparison Box */}
              <div className="w-full p-4 rounded-xl bg-slate-900/95 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Baseline */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold text-slate-400">
                    Current Baseline
                  </div>
                  <div className="text-2xl font-extrabold text-slate-200">62.0%</div>
                  <div className="text-[11px] text-slate-400">Self-Consumption</div>
                </div>

                {/* Transition Indicator */}
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-slate-800 border border-slate-700 text-amber-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 mt-1 uppercase font-bold">
                    +12.5% Gain
                  </span>
                </div>

                {/* Projected Result */}
                <div className="flex-1 text-center sm:text-right space-y-1">
                  <div className="inline-flex items-center gap-1 text-[10px] uppercase font-mono font-bold text-emerald-400">
                    <Sparkles className="w-3 h-3" />
                    Projected Scenario
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400">74.5%</div>
                  <div className="text-[11px] text-emerald-300/80 font-medium">
                    Est. ₹1,020 / day savings
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-center font-mono">
                * Note: Simulator results are model projections based on solar irradiation and load shift parameters, not measured baselines.
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCENE 6: RESULTS / REPORTING / DTE MULTI-CAMPUS                           */}
          {/* ========================================================================= */}
          {activeScene.id === 'results' && (
            <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-4 animate-fadeIn">
              {/* 4 Core Verifiable Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <IndianRupee className="w-4 h-4 text-amber-400 mx-auto" />
                  <div className="text-base sm:text-lg font-extrabold text-white">₹18.45 Lakhs</div>
                  <div className="text-[10px] text-slate-400 font-medium">Monthly Savings</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <Sun className="w-4 h-4 text-teal-400 mx-auto" />
                  <div className="text-base sm:text-lg font-extrabold text-teal-300">2,329 kW</div>
                  <div className="text-[10px] text-slate-400 font-medium">Verified Solar</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <Leaf className="w-4 h-4 text-emerald-400 mx-auto" />
                  <div className="text-base sm:text-lg font-extrabold text-emerald-300">2,470 Tons</div>
                  <div className="text-[10px] text-slate-400 font-medium">CO₂ Avoided / yr</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <Zap className="w-4 h-4 text-blue-400 mx-auto" />
                  <div className="text-base sm:text-lg font-extrabold text-blue-300">7 Campuses</div>
                  <div className="text-[10px] text-slate-400 font-medium">State Pilot Network</div>
                </div>
              </div>

              {/* Two Column Output: Audit Certificate & DTE View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Energy Audit Certificates</div>
                    <div className="text-[11px] text-slate-400">
                      BEE standard audit documents ready for institutional compliance & print
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Directorate (DTE) Multi-Campus View</div>
                    <div className="text-[11px] text-slate-400">
                      Statewide aggregation across Jodhpur, Jaipur, Udaipur, Bikaner & Kota
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* FINAL SCENE: URJASETU IDENTITY                                            */}
          {/* ========================================================================= */}
          {activeScene.id === 'identity' && (
            <div className="w-full max-w-2xl flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn">
              {/* Emblem / Logo */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-amber-500 p-0.5 shadow-2xl shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Zap className="w-8 h-8 text-amber-400 fill-amber-400/20" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <span>Virtual Power Plant Platform</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  UrjaSetu
                </h2>
                <p className="text-base sm:text-lg font-medium text-slate-200 max-w-lg leading-snug">
                  "From scattered energy assets to coordinated campus intelligence."
                </p>
                <div className="text-xs text-slate-400">
                  Directorate of Technical Education • Government of Rajasthan
                </div>
              </div>

              {onExploreCommandCenter && (
                <button
                  onClick={onExploreCommandCenter}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <span>Launch Live Command Center</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM SUBTITLE / CLOSED CAPTIONS BANNER */}
        {showCaptions && (
          <div className="relative z-20 px-4 sm:px-8 py-3 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex items-start gap-2.5">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 shrink-0 font-bold">
                CC
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{activeScene.narration}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* VIDEO CONTROLS & TIMELINE SCRUBBER */}
      <div
        className={`px-4 sm:px-6 py-3 border-t space-y-2.5 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Interactive Scrubber Bar with Scene Tick Markers */}
        <div className="relative w-full group">
          {/* Chapter Tick Marks */}
          <div className="absolute inset-x-0 -top-1.5 flex justify-between pointer-events-none z-10">
            {SCENES.map((scene) => (
              <div
                key={scene.id}
                style={{ left: `${(scene.startSec / TOTAL_DURATION_SEC) * 100}%` }}
                className="absolute w-1 h-3 -ml-0.5 bg-slate-600/70 rounded-full"
                title={`${scene.title} (${formatTime(scene.startSec)})`}
              />
            ))}
          </div>

          <input
            type="range"
            min={0}
            max={TOTAL_DURATION_SEC}
            step={0.1}
            value={currentTimeSec}
            onChange={(e) => seekTo(Number(e.target.value))}
            aria-label="Video timeline scrubber"
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-amber-400 bg-slate-200 dark:bg-slate-800"
          />
        </div>

        {/* Playback Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Play/Pause, Replay, Timecode */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className={`p-2 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                isDarkMode
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                  : 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">
                    {currentTimeSec >= TOTAL_DURATION_SEC ? 'Replay' : 'Play'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => seekTo(0)}
              title="Restart from beginning"
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Timecode display */}
            <div className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>{formatTime(currentTimeSec)}</span>
              <span className="text-slate-400 mx-1">/</span>
              <span className="text-slate-400">{formatTime(TOTAL_DURATION_SEC)}</span>
            </div>
          </div>

          {/* Center: Current Scene Title */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="text-amber-500 font-bold">Scene {activeScene.number}/7:</span>
            <span>{activeScene.title}</span>
          </div>

          {/* Right: Audio / Voiceover, Speed, Captions, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Speed Control */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              aria-label="Playback speed"
              className={`px-2 py-1 rounded text-xs font-semibold border cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              <option value={0.75}>0.75x</option>
              <option value={1}>1.0x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>

            {/* Voiceover Speech Toggle */}
            <button
              onClick={() => {
                const next = !isVoiceoverEnabled;
                setIsVoiceoverEnabled(next);
                if (!next) stopSpeech();
              }}
              title={
                isVoiceoverEnabled
                  ? 'Voiceover narration enabled'
                  : 'Voiceover narration muted'
              }
              className={`px-2 py-1 rounded border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                isVoiceoverEnabled
                  ? isDarkMode
                    ? 'bg-amber-400/10 text-amber-300 border-amber-500/30'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              {isVoiceoverEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isVoiceoverEnabled ? 'Voice' : 'Muted'}</span>
            </button>

            {/* Closed Captions Toggle */}
            <button
              onClick={() => setShowCaptions((prev) => !prev)}
              title={showCaptions ? 'Hide Subtitles' : 'Show Subtitles'}
              className={`px-2 py-1 rounded border text-xs font-bold font-mono transition-colors cursor-pointer ${
                showCaptions
                  ? isDarkMode
                    ? 'bg-slate-700 text-amber-300 border-slate-600'
                    : 'bg-slate-200 text-blue-800 border-slate-300'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-500 border-slate-700'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              CC
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              className={`p-1.5 rounded border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
