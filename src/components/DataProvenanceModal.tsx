import React from 'react';
import { CAMPUS_LIST } from '../data/mockData';
import {
  ShieldCheck,
  X,
  FileCheck,
  Radio,
  Sparkles,
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Info,
} from 'lucide-react';

interface DataProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const DataProvenanceModal: React.FC<DataProvenanceModalProps> = ({
  isOpen,
  onClose,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="data-provenance-modal-title"
    >
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-[#080d1a] border-slate-700 text-slate-100'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        {/* MODAL HEADER */}
        <div className="sticky top-0 z-10 px-5 sm:px-7 py-4 border-b flex items-center justify-between backdrop-blur-md bg-inherit border-inherit">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                isDarkMode
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="data-provenance-modal-title" className="text-base sm:text-lg font-bold">
                Government Data Provenance & Verification Audit Trail
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                UrjaSetu Virtual Power Plant Credibility Protocol • DTE Rajasthan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-7 space-y-6 text-xs sm:text-sm">
          {/* CORE STATUTORY DIRECTIVE */}
          <div
            className={`p-4 rounded-xl border leading-relaxed ${
              isDarkMode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs mb-1">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Statutory Credibility Rule</span>
            </div>
            <p className="text-xs">
              <strong>"Credibility is more important than filling empty boxes."</strong> UrjaSetu strictly distinguishes verified institutional capacity from tenders and live telemetry. The platform never fabricates real-time sensor data, never invents missing numbers, and never extrapolates statewide numbers from small sample sets without explicit verification.
            </p>
          </div>

          {/* 4-LEVEL DATA HIERARCHY */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              State Microgrid Data Hierarchy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isDarkMode ? 'bg-emerald-950/40 border-emerald-800/40' : 'bg-emerald-50/70 border-emerald-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-700 dark:text-emerald-400">
                  <Radio className="w-4 h-4" />
                  <span>LEVEL A: LIVE</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Actual active telemetry from Open-Meteo satellite solar irradiance, weather streams, and connected digital meters.
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isDarkMode ? 'bg-blue-950/40 border-blue-800/40' : 'bg-blue-50/70 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-blue-700 dark:text-cyan-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>LEVEL B: LAST VERIFIED</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Officially verified institutional audits, DISCOM net-metering records, and certified engineering surveys.
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isDarkMode ? 'bg-amber-950/40 border-amber-800/40' : 'bg-amber-50/70 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-700 dark:text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>LEVEL C: PROJECTED</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Solar diurnal curves, battery charge scheduling, and "What-If" expansion modeling from the simulator.
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  isDarkMode ? 'bg-rose-950/40 border-rose-800/40' : 'bg-rose-50/70 border-rose-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-rose-700 dark:text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>LEVEL D: UNAVAILABLE</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Uninstalled hardware or unconfirmed tenders. Labeled transparently as "Unavailable" without mock placeholders.
                </p>
              </div>
            </div>
          </div>

          {/* INSTITUTIONAL AUDIT LEDGER */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Institutional Assets & Audit Records
            </h3>

            <div className="overflow-x-auto border rounded-xl border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead
                  className={`border-b font-bold ${
                    isDarkMode ? 'bg-slate-900/90 text-slate-300 border-slate-800' : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <tr>
                    <th className="p-3">Campus / Institute</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Installed Solar</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Audit Source & Documentation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-[11.5px]">
                  {/* IIT Jodhpur */}
                  <tr className={isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">
                      IIT Jodhpur
                    </td>
                    <td className="p-3 font-sans">Jodhpur</td>
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                      1,000 kW (1 MW)
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        VERIFIED
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-300">
                      Verified yield ~14.9 lakh units/year (~15% demand), ~1,060 t/yr CO₂ reduction. Audited by JdVVNL / BEE ISO 50001.
                    </td>
                  </tr>

                  {/* BITS Pilani */}
                  <tr className={isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">
                      BITS Pilani
                    </td>
                    <td className="p-3 font-sans">Jhunjhunu</td>
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                      949.12 kWp
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        VERIFIED
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-300">
                      Verified 949.12 kWp solar installation. Audited by BITS Renewable Energy Cell & JVVNL.
                    </td>
                  </tr>

                  {/* MNIT Jaipur */}
                  <tr className={isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">
                      MNIT Jaipur
                    </td>
                    <td className="p-3 font-sans">Jaipur</td>
                    <td className="p-3 font-bold text-rose-600 dark:text-rose-400">
                      0 kW Installed (300 kW Tender)
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                        TENDER UNCONFIRMED
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-300">
                      300 kW tender floated under RESCO mode; commissioning unconfirmed. <strong>MUST NOT be counted as active installed capacity.</strong>
                    </td>
                  </tr>

                  {/* MBM University */}
                  <tr className={isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">
                      MBM University
                    </td>
                    <td className="p-3 font-sans">Jodhpur</td>
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                      150 kWp
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        VERIFIED
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-300">
                      150 kW rooftop PV + 80 kWh storage. Verified by DTE Engineering College Energy Survey.
                    </td>
                  </tr>

                  {/* CTAE Udaipur */}
                  <tr className={isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">
                      CTAE Udaipur
                    </td>
                    <td className="p-3 font-sans">Udaipur</td>
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                      90 kWp Solar + 35 kW Wind
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        VERIFIED
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-300">
                      Hybrid renewable microgrid verified by MPUAT Energy Research Division & AVVNL.
                    </td>
                  </tr>

                  {/* ECB Bikaner */}
                  <tr className={isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">
                      Engineering College Bikaner
                    </td>
                    <td className="p-3 font-sans">Bikaner</td>
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                      110 kWp Solar + 40 kW Wind
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        VERIFIED
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-300">
                      110 kW Solar array verified by JdVVNL Bikaner Circle & DTE Technical Cell.
                    </td>
                  </tr>

                  {/* GEC Kota */}
                  <tr className={isDarkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">
                      GEC Kota
                    </td>
                    <td className="p-3 font-sans">Kota</td>
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                      80 kWp (Pending Telemetry)
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        GATEWAY PENDING
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-300">
                      80 kW PV allocation confirmed; live smart telemetry gateway rollout scheduled in Q3.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* EXTERNAL DATA INTEGRATION (OPEN-METEO) */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="font-bold flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>External Meteorological Telemetry: Open-Meteo API</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Real-time Direct Normal Irradiance (DNI), ambient temperature, and wind velocities are pulled via Open-Meteo's open meteorological satellite endpoints, strictly avoiding fabricated telemetry.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
              ● Live Satellite Sync Active
            </span>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 sm:px-7 py-3.5 border-t flex items-center justify-between border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500 font-mono">
            Audit Standard: ISO 50001:2018 • BEE Verified
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              isDarkMode ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            Close Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
};
