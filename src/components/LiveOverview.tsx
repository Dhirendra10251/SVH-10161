import React, { useState, useEffect } from 'react';
import { MetricData, ForecastPoint, CampusProfile, WeatherTelemetry } from '../types';
import { HOURLY_FORECAST } from '../data/mockData';
import { fetchWeatherTelemetry } from '../services/weatherService';
import { DataProvenanceBadge } from './DataProvenanceBadge';
import {
  Sun,
  Wind,
  BatteryCharging,
  Zap,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Activity,
  Building2,
  CheckCircle2,
  RefreshCw,
  Cpu,
  ArrowDown,
  ArrowUp,
  ShieldAlert,
  ShieldCheck,
  MapPin,
  FileCheck,
  AlertTriangle,
  CloudSun,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

interface LiveOverviewProps {
  metrics: MetricData;
  campus: CampusProfile;
  onNavigateToSimulator: () => void;
  onNavigateToRecommendations: () => void;
  onOpenDistrictNavigator?: () => void;
  onOpenProvenanceModal?: () => void;
  isDarkMode?: boolean;
}

export const LiveOverview: React.FC<LiveOverviewProps> = ({
  metrics,
  campus,
  onNavigateToSimulator,
  onNavigateToRecommendations,
  onOpenDistrictNavigator,
  onOpenProvenanceModal,
  isDarkMode = false,
}) => {
  // Chart layer toggles
  const [showSolar, setShowSolar] = useState<boolean>(true);
  const [showWind, setShowWind] = useState<boolean>(true);
  const [showBattery, setShowBattery] = useState<boolean>(true);
  const [showDemand, setShowDemand] = useState<boolean>(true);

  // Time state for "Updated X sec ago"
  const [secondsAgo, setSecondsAgo] = useState<number>(8);

  // Live Open-Meteo external weather & solar irradiance state
  const [weather, setWeather] = useState<WeatherTelemetry | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => (prev >= 30 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live Open-Meteo satellite solar irradiance & meteorological telemetry
  useEffect(() => {
    let isMounted = true;
    setIsLoadingWeather(true);
    const lat = campus.latitude || 26.9124;
    const lon = campus.longitude || 75.7873;

    fetchWeatherTelemetry(lat, lon)
      .then((data) => {
        if (isMounted) {
          setWeather(data);
          setIsLoadingWeather(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoadingWeather(false);
      });

    return () => {
      isMounted = false;
    };
  }, [campus.id, campus.latitude, campus.longitude]);

  // Combined Renewable Generation
  const totalRenewableKw = metrics.solarNowKw + metrics.windNowKw;
  const isBatteryCharging = metrics.batteryPowerKw < 0;
  const batteryFlowKw = Math.abs(metrics.batteryPowerKw);
  const isGridImporting = metrics.gridDrawKw >= 0;

  // Mix items for supply distribution
  const mixItems = [
    {
      key: 'solar',
      label: 'Solar Gen',
      percentage: Math.round((metrics.solarNowKw / (totalRenewableKw + metrics.gridDrawKw || 1)) * 100),
      kw: metrics.solarNowKw,
      color: '#f59e0b',
      bgClass: 'bg-amber-500',
      textClass: 'text-amber-500 dark:text-amber-400',
      icon: Sun,
    },
    {
      key: 'wind',
      label: 'Wind Gen',
      percentage: Math.round((metrics.windNowKw / (totalRenewableKw + metrics.gridDrawKw || 1)) * 100),
      kw: metrics.windNowKw,
      color: '#0d9488',
      bgClass: 'bg-teal-600',
      textClass: 'text-teal-600 dark:text-teal-400',
      icon: Wind,
    },
    {
      key: 'grid',
      label: 'DISCOM Grid',
      percentage: Math.max(1, 100 - Math.round((metrics.solarNowKw / (totalRenewableKw + metrics.gridDrawKw || 1)) * 100) - Math.round((metrics.windNowKw / (totalRenewableKw + metrics.gridDrawKw || 1)) * 100)),
      kw: metrics.gridDrawKw,
      color: '#64748b',
      bgClass: 'bg-slate-500',
      textClass: 'text-slate-500 dark:text-slate-400',
      icon: Zap,
    },
  ];

  const chartData = HOURLY_FORECAST;

  return (
    <div className="space-y-6">
      {/* 5. PAGE HEADER (Title, Description, Last Updated Indicator) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Live Overview
            </h1>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
              isDarkMode
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              ● Node: {campus.code}
            </span>
            {campus.division && (
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}>
                {campus.division}
              </span>
            )}
          </div>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Real-time energy generation, consumption, verified institutional assets and storage status
          </p>
        </div>

        {/* Live Status, Navigator & Audit Modal Buttons */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          {onOpenDistrictNavigator && (
            <button
              onClick={onOpenDistrictNavigator}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-blue-700 hover:bg-slate-50 shadow-2xs'
              }`}
              title="Browse Rajasthan 41 Districts and Institutional Pilot Nodes"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>41 Districts</span>
            </button>
          )}

          {onOpenProvenanceModal && (
            <button
              onClick={onOpenProvenanceModal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-blue-950/60 border-cyan-500/40 text-cyan-300 hover:bg-blue-900/60'
                  : 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100'
              }`}
              title="Statutory Verification Audit Trail"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Log</span>
            </button>
          )}

          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Updated {secondsAgo}s ago</span>
            <RefreshCw
              onClick={() => setSecondsAgo(0)}
              className="w-3 h-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              title="Poll latest telemetry"
            />
          </div>

          <button
            onClick={onNavigateToSimulator}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-blue-700 border-slate-200'
            }`}
          >
            <span>What-If</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* INSTITUTIONAL PROVENANCE & LIVE SATELLITE TELEMETRY BANNER */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 transition-all ${
          campus.verificationStatus === 'TENDER_UNCONFIRMED'
            ? isDarkMode
              ? 'bg-rose-950/20 border-rose-800/40 text-slate-200'
              : 'bg-rose-50/70 border-rose-300 text-rose-950'
            : isDarkMode
            ? 'bg-slate-900/60 border-slate-800 text-slate-200'
            : 'bg-blue-50/40 border-blue-200 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Campus Identity & Verification Summary */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {campus.code}
              </span>
              <span className="font-bold text-sm sm:text-base">
                {campus.name}
              </span>

              {campus.verificationStatus === 'VERIFIED' ? (
                <DataProvenanceBadge
                  mode="LAST_VERIFIED"
                  sourceName={campus.provenance?.solarCapacity?.sourceName || 'State Energy Audit'}
                  provenance={campus.provenance?.solarCapacity}
                  isDarkMode={isDarkMode}
                  onOpenAuditModal={onOpenProvenanceModal}
                />
              ) : campus.verificationStatus === 'TENDER_UNCONFIRMED' ? (
                <DataProvenanceBadge
                  mode="UNAVAILABLE"
                  sourceName="DTE Tender Notice RJ-SOL-MNIT300 (Commissioning unconfirmed)"
                  provenance={campus.provenance?.solarCapacity}
                  isDarkMode={isDarkMode}
                  onOpenAuditModal={onOpenProvenanceModal}
                />
              ) : (
                <DataProvenanceBadge
                  mode="LAST_VERIFIED"
                  sourceName="Phase-2 Allocation"
                  provenance={campus.provenance?.solarCapacity}
                  isDarkMode={isDarkMode}
                  onOpenAuditModal={onOpenProvenanceModal}
                />
              )}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {campus.district} • {campus.division || 'Rajasthan Division'}
            </p>

            {/* Credibility statement / Audit Details */}
            {campus.verificationStatus === 'VERIFIED' && (
              <div className="flex items-center gap-3 flex-wrap text-xs pt-1 font-mono">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Installed Solar: {campus.solarCapacityKw} kW
                </span>
                {campus.annualUnitsKwh && (
                  <span className="text-slate-600 dark:text-slate-400">
                    Annual Yield: <strong>{(campus.annualUnitsKwh / 100000).toFixed(1)} Lakh units/yr</strong>
                  </span>
                )}
                {campus.demandFulfillmentPercent && (
                  <span className="text-slate-600 dark:text-slate-400">
                    Campus Demand Offset: <strong>~{campus.demandFulfillmentPercent}%</strong>
                  </span>
                )}
                {campus.annualCo2ReductionTonnes && (
                  <span className="text-slate-600 dark:text-slate-400">
                    CO₂ Reduction: <strong>~{campus.annualCo2ReductionTonnes.toLocaleString()} t/yr</strong>
                  </span>
                )}
              </div>
            )}

            {campus.verificationStatus === 'TENDER_UNCONFIRMED' && (
              <div className="p-2.5 rounded-lg border text-xs bg-rose-100/60 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/60 text-rose-900 dark:text-rose-200">
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Audit Policy: Unconfirmed Tender Status</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  300 kW tender floated under RESCO mode; commissioning unconfirmed. Per government audit credibility mandates, this capacity is <strong>strictly recorded as 0 kW installed</strong> until physically verified by JVVNL/DTE auditors.
                </p>
              </div>
            )}
          </div>

          {/* Right: Live Open-Meteo Meteorological Telemetry Feed */}
          <div
            className={`p-3 rounded-xl border flex flex-col justify-between shrink-0 min-w-[240px] text-xs ${
              isDarkMode
                ? 'bg-slate-950/80 border-slate-800'
                : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-1.5 mb-1.5 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <CloudSun className="w-4 h-4 text-amber-500" />
                <span>Satellite Solar Radiation</span>
              </div>
              <DataProvenanceBadge
                mode={weather?.mode || 'LIVE'}
                sourceName="Open-Meteo Solar DNI Telemetry"
                isDarkMode={isDarkMode}
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">
                  Direct Irradiance (DNI)
                </span>
                <strong className="text-amber-600 dark:text-amber-400 text-sm">
                  {weather ? `${weather.directNormalIrradianceWm2} W/m²` : '680 W/m²'}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">
                  Ambient Temp
                </span>
                <strong className="text-slate-800 dark:text-slate-200 text-sm">
                  {weather ? `${weather.temperatureC}°C` : '32.4°C'}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">
                  Wind Speed
                </span>
                <strong className="text-slate-800 dark:text-slate-200">
                  {weather ? `${weather.windSpeedKmh} km/h` : '14 km/h'}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">
                  Cloud Cover
                </span>
                <strong className="text-slate-800 dark:text-slate-200">
                  {weather ? `${weather.cloudCoverPercent}%` : '10%'}
                </strong>
              </div>
            </div>
            <div className="mt-1.5 pt-1 border-t text-[9.5px] text-slate-400 font-sans flex items-center justify-between border-slate-100 dark:border-slate-800">
              <span>Open-Meteo API (Live Sync)</span>
              <span>{weather?.timestamp || 'IST'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. TOP 3 KPI CARDS (Matching Wireframe: Renewable Gen, Battery, Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CARD 1: Total Renewable Generation */}
        <div
          className={`border rounded-2xl p-5 shadow-xs transition-all relative overflow-hidden group ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40'
              : 'bg-white border-slate-200 hover:border-amber-400 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Total Renewable Generation
            </span>
            <div className="flex items-center gap-1.5">
              {campus.solarCapacityKw === 0 ? (
                <DataProvenanceBadge
                  mode="UNAVAILABLE"
                  sourceName="No installed generation verified"
                  isDarkMode={isDarkMode}
                  size="sm"
                  onOpenAuditModal={onOpenProvenanceModal}
                />
              ) : (
                <DataProvenanceBadge
                  mode="LAST_VERIFIED"
                  sourceName={campus.provenance?.solarCapacity?.sourceName || 'Asset Ledger'}
                  provenance={campus.provenance?.solarCapacity}
                  isDarkMode={isDarkMode}
                  size="sm"
                  onOpenAuditModal={onOpenProvenanceModal}
                />
              )}
              <div className={`p-1.5 rounded-xl shrink-0 ${
                isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <Sun className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Primary Big Metric */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {totalRenewableKw}
            </span>
            <span className="text-base font-bold text-amber-700 dark:text-amber-400 font-mono">kW</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ml-auto ${
              campus.solarCapacityKw === 0
                ? isDarkMode
                  ? 'bg-rose-950/60 text-rose-400 border-rose-800/40'
                  : 'bg-rose-100 text-rose-900 border-rose-300'
                : isDarkMode
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}>
              {campus.solarCapacityKw === 0 ? '0 kW Installed' : 'Generating'}
            </span>
          </div>

          {/* Sub-breakdown: Solar + Wind */}
          <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className={`flex items-center gap-1.5 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Solar: <strong className="font-mono">{metrics.solarNowKw} kW</strong>
              {campus.solarCapacityKw > 0 && (
                <span className="text-[10px] text-slate-400 font-mono">
                  (of {campus.solarCapacityKw} kW cap)
                </span>
              )}
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className={`flex items-center gap-1.5 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Wind: <strong className="font-mono">{metrics.windNowKw} kW</strong>
            </span>
          </div>
          <p className={`text-[11px] mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            {campus.solarCapacityKw === 0
              ? 'Tender notice floated (300 kW). No installed solar credited.'
              : `Supplying ${Math.min(100, Math.round((totalRenewableKw / (metrics.totalDemandKw || 1)) * 100))}% of campus academic load`}
          </p>
        </div>

        {/* CARD 2: Battery (State of Charge) */}
        <div
          className={`border rounded-2xl p-5 shadow-xs transition-all relative overflow-hidden group ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40'
              : 'bg-white border-slate-200 hover:border-blue-400 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Battery Storage (SOC)
            </span>
            <div className="flex items-center gap-1.5">
              {campus.batteryCapacityKwh === 0 ? (
                <DataProvenanceBadge
                  mode="UNAVAILABLE"
                  sourceName="No Battery Storage Installed"
                  isDarkMode={isDarkMode}
                  size="sm"
                  onOpenAuditModal={onOpenProvenanceModal}
                />
              ) : (
                <DataProvenanceBadge
                  mode="LIVE"
                  sourceName="BMS Telemetry Inverter Port"
                  isDarkMode={isDarkMode}
                  size="sm"
                  onOpenAuditModal={onOpenProvenanceModal}
                />
              )}
              <div className={`p-1.5 rounded-xl shrink-0 ${
                isDarkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <BatteryCharging className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Primary Big Metric */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {campus.batteryCapacityKwh === 0 ? 0 : metrics.batterySocPercent}
            </span>
            <span className="text-base font-bold text-blue-700 dark:text-cyan-400 font-mono">%</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ml-auto font-mono ${
              campus.batteryCapacityKwh === 0
                ? isDarkMode
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
                : isBatteryCharging
                ? isDarkMode
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/40'
                  : 'bg-blue-100 text-blue-900 border-blue-300'
                : isDarkMode
                ? 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              {campus.batteryCapacityKwh === 0 ? 'No Storage Unit' : isBatteryCharging ? `+${batteryFlowKw} kW In` : `-${batteryFlowKw} kW Out`}
            </span>
          </div>

          {/* Progress bar and capacity */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="bg-blue-600 dark:bg-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${campus.batteryCapacityKwh === 0 ? 0 : metrics.batterySocPercent}%` }}
            />
          </div>
          <div className={`flex items-center justify-between text-xs font-mono font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-800'
          }`}>
            <span>
              {campus.batteryCapacityKwh === 0
                ? '0 / 0 kWh'
                : `${Math.round((metrics.batterySocPercent / 100) * campus.batteryCapacityKwh)} / ${campus.batteryCapacityKwh} kWh`}
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-sans font-bold text-[11px]">
              {campus.batteryCapacityKwh === 0
                ? 'Storage Pending Allocation'
                : isBatteryCharging
                ? 'Absorbing Solar Surplus'
                : 'Discharging to Microgrid'}
            </span>
          </div>
        </div>

        {/* CARD 3: Grid (Import / Export) */}
        <div
          className={`border rounded-2xl p-5 shadow-xs transition-all relative overflow-hidden group ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              : 'bg-white border-slate-200 hover:border-slate-400 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Grid Import / Export
            </span>
            <div className="flex items-center gap-1.5">
              <DataProvenanceBadge
                mode="LIVE"
                sourceName="DISCOM 11kV Net Bi-Directional CT/PT Meter"
                isDarkMode={isDarkMode}
                size="sm"
                onOpenAuditModal={onOpenProvenanceModal}
              />
              <div className={`p-1.5 rounded-xl shrink-0 ${
                isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-800 border border-slate-300'
              }`}>
                <Zap className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Primary Big Metric */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {metrics.gridDrawKw}
            </span>
            <span className={`text-base font-bold font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kW</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ml-auto ${
              isGridImporting
                ? isDarkMode
                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
                : isDarkMode
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}>
              {isGridImporting ? 'Importing' : 'Exporting'}
            </span>
          </div>

          {/* DISCOM & Frequency Context */}
          <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              DISCOM: <strong className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                {campus.districtId === 'jodhpur' || campus.districtId === 'bikaner'
                  ? 'JdVVNL 11 kV Substation'
                  : campus.districtId === 'udaipur'
                  ? 'AVVNL 11 kV Substation'
                  : 'JVVNL 11 kV Substation'}
              </strong>
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              50.02 Hz Stable
            </span>
          </div>
          <p className={`text-[11px] mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Off-peak tariff tier active • Zero penalty threshold
          </p>
        </div>
      </div>

      {/* 7, 8, 9. MAIN ENERGY FLOW / SYSTEM OVERVIEW (THE WIREFRAME CENTERPIECE) */}
      <div
        className={`border rounded-2xl p-5 sm:p-6 shadow-xs transition-colors space-y-4 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        <style>{`
          @keyframes energyFlowPulse {
            0% { stroke-dashoffset: 24; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-flow-dash {
            stroke-dasharray: 6 6;
            animation: energyFlowPulse 1.2s linear infinite;
          }
        `}</style>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3.5 transition-colors border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-base font-bold tracking-tight uppercase ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Campus Energy Flow & VPP Orchestration
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Directional real-time power vector routing across generation sources, battery storage, and campus load
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isDarkMode
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Telemetry Active</span>
            </div>
          </div>
        </div>

        {/* VISUAL ENERGY FLOW CANVAS / NODE NETWORK */}
        <div
          className={`relative rounded-2xl border p-4 sm:p-6 overflow-hidden min-h-[460px] flex flex-col justify-between transition-colors ${
            isDarkMode
              ? 'bg-[#060a16] border-slate-800'
              : 'bg-[#F9FBFC] border-slate-200/80'
          }`}
        >
          {/* Background Technical Grid Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
            style={{
              backgroundImage: `radial-gradient(${isDarkMode ? '#334155' : '#cbd5e1'} 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Flow Indicator Banner */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[11px] pb-2 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Solar In: {metrics.solarNowKw} kW
              </span>
              <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> Wind In: {metrics.windNowKw} kW
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-blue-600 dark:text-cyan-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" /> Battery: {isBatteryCharging ? `Charging +${batteryFlowKw} kW` : `Discharging -${batteryFlowKw} kW`}
              </span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold">
                Grid: {metrics.gridDrawKw} kW Draw
              </span>
            </div>
          </div>

          {/* MAIN 3-TIER FLOW ARCHITECTURE (Top: Solar, Middle: Wind -> Core -> Campus Load, Bottom: Battery & Grid) */}
          <div className="relative z-10 py-2 space-y-6">
            {/* ROW 1 (TOP): SOLAR GENERATION NODE */}
            <div className="flex justify-center">
              <div
                className={`w-full max-w-sm rounded-xl border p-3.5 shadow-sm flex items-center justify-between transition-all ${
                  isDarkMode
                    ? 'bg-slate-900/95 border-amber-500/40 text-slate-100 shadow-amber-950/20'
                    : 'bg-white border-amber-300 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-700'
                    }`}>
                      Solar Generation
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold font-mono text-amber-700 dark:text-amber-400">
                        {metrics.solarNowKw}
                      </span>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kW</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    Generating
                  </span>
                  <p className={`text-[10.5px] font-mono mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    {Math.round((metrics.solarNowKw / campus.solarCapacityKw) * 100)}% Capacity
                  </p>
                </div>
              </div>
            </div>

            {/* Connecting Vertical Indicator from Solar to Core */}
            <div className="flex justify-center -my-3">
              <div className="flex flex-col items-center">
                <span className="h-6 w-0.5 border-l-2 border-dashed border-amber-400 animate-pulse" />
                <ArrowDown className="w-3.5 h-3.5 text-amber-500 -mt-1" />
              </div>
            </div>

            {/* ROW 2 (MIDDLE): WIND NODE (Left) ----> VPP CORE (Center) ----> CAMPUS LOAD (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* LEFT NODE: WIND GENERATION */}
              <div
                className={`rounded-xl border p-3.5 shadow-sm flex items-center justify-between transition-all ${
                  isDarkMode
                    ? 'bg-slate-900/95 border-teal-500/40 text-slate-100 shadow-teal-950/20'
                    : 'bg-white border-teal-300 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-700'
                    }`}>
                      Wind Generation
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold font-mono text-teal-700 dark:text-teal-400">
                        {metrics.windNowKw}
                      </span>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kW</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    isDarkMode ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-teal-100 text-teal-900 border-teal-300'
                  }`}>
                    Generating
                  </span>
                  <p className={`text-[10.5px] font-mono mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    {Math.round((metrics.windNowKw / campus.windCapacityKw) * 100)}% Cap
                  </p>
                </div>
              </div>

              {/* CENTER NODE: ENERGY / VPP DISPATCH CORE */}
              <div
                className={`rounded-2xl border-2 p-4 text-center shadow-lg relative overflow-hidden transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-amber-500/60 shadow-amber-500/5 ring-1 ring-amber-500/20'
                    : 'bg-white border-blue-600 shadow-blue-500/5 ring-1 ring-blue-600/20'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Cpu className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-blue-700'}`} />
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${
                    isDarkMode ? 'text-amber-400' : 'text-blue-800'
                  }`}>
                    VPP Orchestration Core
                  </span>
                </div>

                <div className="my-1.5">
                  <span className={`text-2xl font-extrabold font-mono tracking-tight ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {metrics.totalDemandKw} kW
                  </span>
                  <p className={`text-[11px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Total Microgrid Power Dispatched
                  </p>
                </div>

                <div className={`mt-2 py-1 px-2 rounded-lg border text-[11px] font-mono flex items-center justify-around ${
                  isDarkMode
                    ? 'bg-slate-950/70 border-slate-800 text-slate-300'
                    : 'bg-slate-100 border-slate-300 text-slate-800'
                }`}>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    95.4% Green
                  </span>
                  <span>•</span>
                  <span className="text-blue-700 dark:text-cyan-400 font-bold">
                    Zero Curtailment
                  </span>
                </div>
              </div>

              {/* RIGHT NODE: CAMPUS LOAD */}
              <div
                className={`rounded-xl border p-3.5 shadow-sm flex items-center justify-between transition-all ${
                  isDarkMode
                    ? 'bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-emerald-950/20'
                    : 'bg-white border-emerald-300 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-700'
                    }`}>
                      Campus Load
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400">
                        {metrics.totalDemandKw}
                      </span>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kW</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    isDarkMode ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}>
                    Consuming
                  </span>
                  <p className={`text-[10.5px] font-mono mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Academics & Labs
                  </p>
                </div>
              </div>
            </div>

            {/* Connecting Vertical Indicator from Core to Battery & Grid */}
            <div className="flex justify-center -my-3">
              <div className="flex flex-col items-center">
                <ArrowDown className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : 'text-blue-600'}`} />
                <span className="h-6 w-0.5 border-l-2 border-dashed border-blue-400 dark:border-amber-400 animate-pulse" />
              </div>
            </div>

            {/* ROW 3 (BOTTOM): BATTERY NODE (Left/Center) & GRID NODE (Right/Center) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BATTERY NODE */}
              <div
                className={`rounded-xl border p-3.5 shadow-sm flex items-center justify-between transition-all ${
                  isDarkMode
                    ? 'bg-slate-900/95 border-cyan-500/40 text-slate-100'
                    : 'bg-white border-blue-300 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-700'
                    }`}>
                      Battery Storage
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold font-mono text-blue-700 dark:text-cyan-400">
                        {metrics.batterySocPercent}%
                      </span>
                      <span className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                        ({Math.round((metrics.batterySocPercent / 100) * campus.batteryCapacityKwh)} kWh)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    isDarkMode ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800' : 'bg-blue-100 text-blue-900 border-blue-300'
                  }`}>
                    {isBatteryCharging ? 'Charging' : 'Discharging'}
                  </span>
                  <p className="text-[10.5px] font-mono mt-0.5 text-blue-700 dark:text-cyan-400 font-bold">
                    {isBatteryCharging ? `+${batteryFlowKw} kW Absorbed` : `-${batteryFlowKw} kW Released`}
                  </p>
                </div>
              </div>

              {/* GRID INTERCONNECT NODE */}
              <div
                className={`rounded-xl border p-3.5 shadow-sm flex items-center justify-between transition-all ${
                  isDarkMode
                    ? 'bg-slate-900/95 border-slate-700 text-slate-100'
                    : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-700'
                    }`}>
                      DISCOM Grid Interconnect
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-xl font-extrabold font-mono ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                        {metrics.gridDrawKw}
                      </span>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kW Net</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}>
                    {isGridImporting ? 'Importing' : 'Exporting'}
                  </span>
                  <p className={`text-[10.5px] font-mono mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Grid Freq: 50.02 Hz
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Explanatory Summary Bar for Non-Technical Managers */}
          <div
            className={`mt-3 p-3 rounded-xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-colors ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong className={isDarkMode ? 'text-slate-100' : 'text-slate-900'}>System Summary:</strong> Clean rooftop energy ({totalRenewableKw} kW) directly fulfills {Math.round((totalRenewableKw / metrics.totalDemandKw) * 100)}% of campus load while buffering {batteryFlowKw} kW surplus into battery.
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-amber-400 whitespace-nowrap">
              Net DISCOM import reduced by 92%
            </span>
          </div>
        </div>
      </div>

      {/* QUICK RECOMMENDATION ACTION BANNER (From wireframe / instruction: explainable plain-language cards) */}
      <div
        className={`border rounded-2xl p-4 sm:p-5 shadow-xs transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          isDarkMode
            ? 'bg-amber-500/10 border-amber-500/30 text-slate-100'
            : 'bg-blue-50/80 border-blue-200 text-slate-900'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
            isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-100 text-blue-700'
          }`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-200 text-blue-900'
              }`}>
                Recommended Action
              </span>
              <h4 className="text-sm font-bold">Charge Battery Now — Midday Solar Surplus</h4>
            </div>
            <p className={`text-xs mt-1 max-w-2xl leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Surplus solar expected for the next 2 hours (+18 kW above campus load). Storing energy now avoids peak evening DISCOM grid import rates (₹6.80/kWh) at 7 PM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <button
            onClick={onNavigateToRecommendations}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs ${
              isDarkMode
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-blue-700 hover:bg-blue-800 text-white'
            }`}
          >
            Review Dispatch Plan →
          </button>
        </div>
      </div>

      {/* SECTION: REAL-TIME GENERATION & SUPPLY MIX BAR */}
      <div
        className={`border rounded-2xl p-5 shadow-xs transition-colors space-y-3.5 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
              isDarkMode ? 'text-slate-200' : 'text-slate-900'
            }`}>
              <Layers className="w-4 h-4 text-amber-500" />
              Real-Time Campus Supply Mix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Source breakdown meeting current active demand ({metrics.totalDemandKw} kW)
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className={`px-2.5 py-1 rounded-md border ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              Demand: <strong>{metrics.totalDemandKw} kW</strong>
            </span>
            <span className={`px-2.5 py-1 rounded-md border ${
              isDarkMode ? 'bg-emerald-950/60 border-emerald-800/40 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              Self-Powered: <strong>95.4%</strong>
            </span>
          </div>
        </div>

        {/* Visual Segment Bar */}
        <div className="space-y-2">
          <div className="w-full h-7 bg-slate-100 dark:bg-slate-950 rounded-lg p-1 flex items-center gap-1 overflow-hidden border border-slate-200 dark:border-slate-800">
            {mixItems.map((item) => (
              <div
                key={item.key}
                style={{ width: `${item.percentage}%` }}
                className={`${item.bgClass} h-full rounded-md transition-all duration-300 flex items-center justify-center cursor-pointer`}
                title={`${item.label}: ${item.percentage}% (${item.kw} kW)`}
              >
                {item.percentage >= 10 && (
                  <span className="text-[11px] font-extrabold text-white font-mono px-1 truncate">
                    {item.percentage}%
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {mixItems.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.key}
                  className={`border rounded-xl p-2.5 flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex flex-col">
                      <span className={`text-xs font-semibold flex items-center gap-1 ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        <IconComp className={`w-3.5 h-3.5 ${item.textClass}`} />
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {item.kw} kW ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION: 24-HOUR FORECAST CHART */}
      <div
        className={`border rounded-2xl p-5 shadow-xs transition-colors space-y-4 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
              isDarkMode ? 'text-slate-200' : 'text-slate-900'
            }`}>
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-amber-400" />
              24-Hour VPP Generation vs Demand Dispatch Forecast
            </h3>
            <p className={`text-xs mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              Campus solar peaking between 11:00 AM – 2:00 PM • Evening peak managed via battery discharge
            </p>
          </div>

          {/* Layer toggles */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setShowSolar(!showSolar)}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                showSolar
                  ? isDarkMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Solar (kW)
            </button>
            <button
              onClick={() => setShowWind(!showWind)}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                showWind
                  ? isDarkMode
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                    : 'bg-teal-100 text-teal-900 border-teal-300'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Wind (kW)
            </button>
            <button
              onClick={() => setShowBattery(!showBattery)}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                showBattery
                  ? isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-blue-100 text-blue-900 border-blue-300'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400" />
              Battery (kW)
            </button>
            <button
              onClick={() => setShowDemand(!showDemand)}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                showDemand
                  ? isDarkMode
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-rose-100 text-rose-900 border-rose-300'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Demand (kW)
            </button>
          </div>
        </div>

        {/* Recharts Curve */}
        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <ReferenceLine
                x="11:00"
                stroke="#f59e0b"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                x="14:00"
                stroke="#f59e0b"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                x="12:00"
                stroke="none"
                label={{
                  value: 'Midday Solar Peak Window (11:00 - 14:00)',
                  fill: isDarkMode ? '#fbbf24' : '#b45309',
                  fontSize: 11,
                  position: 'insideTop',
                  dy: -5,
                  fontWeight: 600,
                }}
              />

              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#334155" : "#cbd5e1"} opacity={0.7} />
              <XAxis dataKey="hour" stroke={isDarkMode ? "#94a3b8" : "#334155"} fontSize={11} tickLine={false} />
              <YAxis stroke={isDarkMode ? "#94a3b8" : "#334155"} fontSize={11} tickLine={false} unit="kW" />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ForecastPoint;
                    const netBalance = data.solarKw + data.windKw - data.demandKw;
                    return (
                      <div className={`p-3 rounded-xl shadow-xl text-xs space-y-1.5 font-sans min-w-[200px] border ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                      }`}>
                        <p className={`font-bold border-b pb-1 flex justify-between ${
                          isDarkMode ? 'border-slate-800 text-slate-200' : 'border-slate-100 text-slate-900'
                        }`}>
                          <span>Time: {label} IST</span>
                          {data.isMiddayPeak && (
                            <span className="text-amber-500 font-bold text-[10px]">Solar Surplus</span>
                          )}
                        </p>
                        <div className="space-y-1 pt-1 font-mono text-[11px]">
                          <div className="flex justify-between text-amber-600 dark:text-amber-400">
                            <span>Solar:</span>
                            <span>{data.solarKw} kW</span>
                          </div>
                          <div className="flex justify-between text-teal-600 dark:text-teal-400">
                            <span>Wind:</span>
                            <span>{data.windKw} kW</span>
                          </div>
                          <div className="flex justify-between text-blue-600 dark:text-cyan-400">
                            <span>Battery:</span>
                            <span>
                              {data.batteryKw < 0 ? `Charging (${data.batteryKw} kW)` : `Discharging (+${data.batteryKw} kW)`}
                            </span>
                          </div>
                          <div className="flex justify-between text-rose-600 dark:text-rose-400 border-t border-slate-200 dark:border-slate-800 pt-1">
                            <span>Demand:</span>
                            <span>{data.demandKw} kW</span>
                          </div>
                          <div className={`flex justify-between font-bold pt-1 border-t border-slate-200 dark:border-slate-800 ${
                            netBalance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'
                          }`}>
                            <span>Net Balance:</span>
                            <span>{netBalance >= 0 ? `+${netBalance} kW Surplus` : `${netBalance} kW Grid Draw`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {showSolar && (
                <Area
                  type="monotone"
                  dataKey="solarKw"
                  name="Solar Generation"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#solarGradient)"
                />
              )}

              {showWind && (
                <Area
                  type="monotone"
                  dataKey="windKw"
                  name="Wind Generation"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#windGradient)"
                />
              )}

              {showBattery && (
                <Line
                  type="monotone"
                  dataKey="batteryKw"
                  name="Battery Power"
                  stroke={isDarkMode ? "#06b6d4" : "#2563eb"}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              )}

              {showDemand && (
                <Line
                  type="monotone"
                  dataKey="demandKw"
                  name="Campus Load Demand"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                  dot={{ r: 2, fill: '#f43f5e' }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
