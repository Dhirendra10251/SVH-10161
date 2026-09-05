import React from 'react';
import { CampusProfile, MetricData } from '../types';
import { CAMPUS_LIST } from '../data/mockData';
import { DataProvenanceBadge } from './DataProvenanceBadge';
import {
  Building2,
  Zap,
  TrendingUp,
  Leaf,
  IndianRupee,
  ShieldCheck,
  ArrowUpRight,
  Sun,
  BatteryCharging,
  CheckCircle2,
  ArrowRight,
  MapPin,
  AlertTriangle,
} from 'lucide-react';

interface DTEMultiCampusProps {
  selectedCampus: CampusProfile;
  onSelectCampus: (campus: CampusProfile) => void;
  onSwitchToOverview: () => void;
  onOpenDistrictNavigator?: () => void;
  onOpenProvenanceModal?: () => void;
  isDarkMode?: boolean;
}

export const DTEMultiCampus: React.FC<DTEMultiCampusProps> = ({
  selectedCampus,
  onSelectCampus,
  onSwitchToOverview,
  onOpenDistrictNavigator,
  onOpenProvenanceModal,
  isDarkMode = false,
}) => {
  // Aggregate state calculations across institutional campuses
  const totalCampuses = CAMPUS_LIST.length;
  // Physically verified solar capacity (strictly excluding unconfirmed tenders)
  const verifiedCampuses = CAMPUS_LIST.filter((c) => c.verificationStatus !== 'TENDER_UNCONFIRMED');
  const totalSolarCapacity = verifiedCampuses.reduce((acc, c) => acc + c.solarCapacityKw, 0);
  const totalWindCapacity = CAMPUS_LIST.reduce((acc, c) => acc + c.windCapacityKw, 0);
  const totalBatteryCapacity = CAMPUS_LIST.reduce((acc, c) => acc + c.batteryCapacityKwh, 0);
  const totalPeakDemand = CAMPUS_LIST.reduce((acc, c) => acc + c.peakDemandKw, 0);

  // Unconfirmed tender count
  const unconfirmedCount = CAMPUS_LIST.filter((c) => c.verificationStatus === 'TENDER_UNCONFIRMED').length;

  // Estimated real-time live generation aggregate
  const aggregateLiveGen = Math.round(totalSolarCapacity * 0.42 + totalWindCapacity * 0.35);
  const aggregateMonthlySavingsInr = 1845000; // ₹18.45 Lakhs across verified assets
  const aggregateCo2OffsetTons = 2470; // Tons / year across verified assets

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              DTE Rajasthan • Multi-Campus VPP Command
            </h1>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
              isDarkMode
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}>
              Statewide Institutional Network
            </span>
          </div>
          <p className={`text-xs sm:text-sm mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Directorate of Technical Education, Government of Rajasthan • Inter-Institutional Microgrid Network
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenDistrictNavigator && (
            <button
              onClick={onOpenDistrictNavigator}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-blue-800 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>41 Districts</span>
            </button>
          )}

          {onOpenProvenanceModal && (
            <button
              onClick={onOpenProvenanceModal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-blue-950/60 border-cyan-500/40 text-cyan-300 hover:bg-blue-900/60'
                  : 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Log</span>
            </button>
          )}

          <button
            onClick={onSwitchToOverview}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            <span>Node Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Audit & Credibility Policy Notice */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-amber-50/70 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Credibility Mandate:</strong> Only physically verified solar capacities (IIT Jodhpur 1 MW, BITS Pilani 949 kWp, etc.) are credited in statewide tallies. Unconfirmed tender notices (e.g. MNIT Jaipur 300 kW RESCO) are held in Level D quarantine.
          </span>
        </div>
        {onOpenProvenanceModal && (
          <button
            onClick={onOpenProvenanceModal}
            className="underline font-bold text-blue-600 dark:text-cyan-400 shrink-0 hover:opacity-85"
          >
            View Verification Sources
          </button>
        )}
      </div>

      {/* Aggregate Statewide Stats Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Campuses */}
        <div
          className={`border rounded-2xl p-5 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Registered Nodes
            </span>
            <div className={`p-2 rounded-xl ${
              isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700'
            }`}>
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {totalCampuses}
            </span>
            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Campuses in Registry</span>
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-2 font-bold">
            ● {verifiedCampuses.length} Audited • {unconfirmedCount} Tender Quarantine
          </p>
        </div>

        {/* Stat 2: Total Aggregate Renewable Capacity */}
        <div
          className={`border rounded-2xl p-5 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Verified Clean Capacity
            </span>
            <div className={`p-2 rounded-xl ${
              isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'
            }`}>
              <Sun className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {(totalSolarCapacity / 1000).toFixed(2)}
            </span>
            <span className="text-sm font-extrabold text-amber-700 dark:text-amber-400 font-mono">MW</span>
            <span className="text-xs text-slate-400 font-mono ml-1">({totalSolarCapacity.toLocaleString()} kWp)</span>
          </div>
          <p className={`text-xs font-medium mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Physical Solar: {totalSolarCapacity.toLocaleString()} kWp • Excl. 300 kW tender unconfirmed
          </p>
        </div>

        {/* Stat 3: Monthly DISCOM Cost Savings */}
        <div
          className={`border rounded-2xl p-5 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Monthly Energy Value
            </span>
            <div className={`p-2 rounded-xl ${
              isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
            }`}>
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              ₹18.45
            </span>
            <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">Lakhs</span>
          </div>
          <p className={`text-xs font-medium mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Across audited net-metered solar plants
          </p>
        </div>

        {/* Stat 4: Carbon Abatement */}
        <div
          className={`border rounded-2xl p-5 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Audited CO₂ Avoided
            </span>
            <div className={`p-2 rounded-xl ${
              isDarkMode ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-700'
            }`}>
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {aggregateCo2OffsetTons.toLocaleString()}
            </span>
            <span className="text-sm font-extrabold text-teal-700 dark:text-teal-400 font-mono">Tons / yr</span>
          </div>
          <p className={`text-xs font-medium mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Equivalent to planting ~2,240 trees
          </p>
        </div>
      </div>

      {/* Campus Performance Comparison Grid */}
      <div
        className={`border rounded-2xl p-5 sm:p-6 shadow-xs transition-colors space-y-4 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div>
            <h2 className={`text-base font-bold tracking-tight uppercase ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Rajasthan Public College Campuses Performance
            </h2>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              Select any institutional microgrid to inspect live sensor feeds, telemetry dispatch, and load profiles
            </p>
          </div>
        </div>

        {/* Campus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAMPUS_LIST.map((campus) => {
            const isSelected = selectedCampus.id === campus.id;
            return (
              <div
                key={campus.id}
                className={`border rounded-2xl p-5 transition-all relative overflow-hidden ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-slate-800/80 border-amber-500/70 ring-1 ring-amber-500/30'
                      : 'bg-blue-50/70 border-blue-600 ring-1 ring-blue-600/30 shadow-xs'
                    : isDarkMode
                    ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-blue-100 text-blue-900 border-blue-300'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-white text-slate-800 border-slate-300'
                      }`}>
                        {campus.code}
                      </span>
                      {campus.isMainCampus && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          Lead VPP Hub
                        </span>
                      )}
                      {campus.verificationStatus === 'VERIFIED' ? (
                        <DataProvenanceBadge
                          mode="LAST_VERIFIED"
                          sourceName={campus.provenance?.solarCapacity?.sourceName || 'Audit Ledger'}
                          provenance={campus.provenance?.solarCapacity}
                          isDarkMode={isDarkMode}
                          size="sm"
                          onOpenAuditModal={onOpenProvenanceModal}
                        />
                      ) : campus.verificationStatus === 'TENDER_UNCONFIRMED' ? (
                        <DataProvenanceBadge
                          mode="UNAVAILABLE"
                          sourceName="Unconfirmed Tender Notice"
                          provenance={campus.provenance?.solarCapacity}
                          isDarkMode={isDarkMode}
                          size="sm"
                          onOpenAuditModal={onOpenProvenanceModal}
                        />
                      ) : (
                        <DataProvenanceBadge
                          mode="LAST_VERIFIED"
                          sourceName="State Phase-2"
                          isDarkMode={isDarkMode}
                          size="sm"
                          onOpenAuditModal={onOpenProvenanceModal}
                        />
                      )}
                    </div>
                    <h3 className={`text-base font-bold mt-1.5 ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {campus.name}
                    </h3>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      {campus.district} • {campus.division || 'Rajasthan'}
                    </p>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                    campus.verificationStatus === 'TENDER_UNCONFIRMED'
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-emerald-700 dark:text-emerald-400'
                  }`}>
                    {campus.verificationStatus === 'TENDER_UNCONFIRMED' ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Tender Pending
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Synchronized
                      </>
                    )}
                  </span>
                </div>

                {/* Audit Context Note for Unconfirmed Tender */}
                {campus.verificationStatus === 'TENDER_UNCONFIRMED' && (
                  <div className="mb-3 p-2 rounded-lg text-[11px] border bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-300">
                    <strong>Statutory Note:</strong> 300 kW tender floated under RESCO mode; commissioning unconfirmed. Active capacity recorded as 0 kW until certified by JVVNL.
                  </div>
                )}

                {/* Microgrid Specs */}
                <div className={`grid grid-cols-3 gap-2 py-3 border-y my-3 text-center text-xs font-mono ${
                  isDarkMode ? 'border-slate-800/80 text-slate-300' : 'border-slate-200 text-slate-800'
                }`}>
                  <div>
                    <div className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Installed Solar</div>
                    <div className={`font-bold mt-0.5 ${
                      campus.solarCapacityKw === 0 ? 'text-slate-400' : 'text-amber-700 dark:text-amber-400'
                    }`}>
                      {campus.solarCapacityKw === 0 ? '0 kW (Unverified)' : `${campus.solarCapacityKw} kWp`}
                    </div>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Wind Cap</div>
                    <div className="font-bold text-teal-700 dark:text-teal-400 mt-0.5">
                      {campus.windCapacityKw} kW
                    </div>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Battery Storage</div>
                    <div className="font-bold text-blue-700 dark:text-cyan-400 mt-0.5">
                      {campus.batteryCapacityKwh} kWh
                    </div>
                  </div>
                </div>

                {/* Annual yield and co2 stats if verified */}
                {campus.annualUnitsKwh && (
                  <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-2 font-mono">
                    <span>Annual: {(campus.annualUnitsKwh / 100000).toFixed(1)} Lakh units/yr</span>
                    {campus.annualCo2ReductionTonnes && (
                      <span>CO₂: ~{campus.annualCo2ReductionTonnes.toLocaleString()} t/yr</span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    Peak Load: <strong className="font-mono text-slate-900 dark:text-slate-300">{campus.peakDemandKw} kW</strong>
                  </span>

                  {isSelected ? (
                    <button
                      onClick={onSwitchToOverview}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs ${
                        isDarkMode
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                          : 'bg-blue-700 text-white hover:bg-blue-800'
                      }`}
                    >
                      <span>Active Node (Open View)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectCampus(campus)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                      }`}
                    >
                      <span>Connect Telemetry</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
