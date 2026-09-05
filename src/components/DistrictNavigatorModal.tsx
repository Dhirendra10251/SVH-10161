import React, { useState } from 'react';
import { CampusProfile, RajasthanDistrict } from '../types';
import { RAJASTHAN_DISTRICTS, RAJASTHAN_DIVISIONS } from '../data/rajasthanDistricts';
import { CAMPUS_LIST } from '../data/mockData';
import {
  Building2,
  Search,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface DistrictNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCampus: CampusProfile;
  onSelectCampus: (campus: CampusProfile) => void;
  isDarkMode?: boolean;
}

export const DistrictNavigatorModal: React.FC<DistrictNavigatorModalProps> = ({
  isOpen,
  onClose,
  selectedCampus,
  onSelectCampus,
  isDarkMode = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [activeDistrict, setActiveDistrict] = useState<RajasthanDistrict | null>(null);

  if (!isOpen) return null;

  // Filter districts
  const filteredDistricts = RAJASTHAN_DISTRICTS.filter((d) => {
    const matchesDiv = selectedDivision === 'all' || d.division === selectedDivision;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.headquarters && d.headquarters.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDiv && matchesSearch;
  });

  // Get colleges for currently active district
  const districtCampuses = activeDistrict
    ? CAMPUS_LIST.filter((c) => c.districtId === activeDistrict.id)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="district-modal-title"
    >
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-[#080d1a] border-slate-700 text-slate-100'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        {/* MODAL HEADER */}
        <div className="px-5 sm:px-7 py-4 border-b flex items-center justify-between border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                isDarkMode
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
            >
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="district-modal-title" className="text-base sm:text-lg font-bold">
                  Rajasthan 41-District Administrative Navigator
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300 border border-blue-300 dark:border-blue-800 uppercase">
                  41 Districts
                </span>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Government Workflow: State DTE → District Selection → College Selection → Live VPP Overview
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

        {/* CONTROLS: DIVISION FILTER TABS & SEARCH */}
        <div className="p-4 sm:p-5 border-b space-y-3 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 41 districts (e.g. Jodhpur, Jaipur, Jhunjhunu, Kota)..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none transition-colors ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Summary Pill */}
            <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
              Showing {filteredDistricts.length} of 41 Districts
            </div>
          </div>

          {/* Division Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Division:
            </span>
            <button
              onClick={() => setSelectedDivision('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                selectedDivision === 'all'
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                    : 'bg-blue-700 text-white border-blue-700 font-bold'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              All (41)
            </button>
            {RAJASTHAN_DIVISIONS.map((div) => {
              const isSelected = selectedDivision === div.name;
              return (
                <button
                  key={div.name}
                  onClick={() => setSelectedDivision(div.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                        : 'bg-blue-700 text-white border-blue-700 font-bold'
                      : isDarkMode
                      ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {div.name.replace(' Division', '')} ({div.districts.length})
                </button>
              );
            })}
          </div>
        </div>

        {/* MODAL TWO-COLUMN LAYOUT: DISTRICT LIST (LEFT) + COLLEGE SELECTION (RIGHT) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 min-h-[350px]">
          {/* DISTRICT LIST (7 cols on md) */}
          <div className="md:col-span-7 p-4 sm:p-5 overflow-y-auto max-h-[500px] space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select District ({filteredDistricts.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredDistricts.map((district) => {
                const isCurrentCampusDistrict = selectedCampus.districtId === district.id;
                const isSelectedInModal = activeDistrict?.id === district.id;
                const hasPilots = district.pilotCampusesCount > 0;

                return (
                  <div
                    key={district.id}
                    onClick={() => setActiveDistrict(district)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelectedInModal
                        ? isDarkMode
                          ? 'bg-amber-500/15 border-amber-500/80 ring-1 ring-amber-500/50'
                          : 'bg-blue-50 border-blue-600 ring-1 ring-blue-600/30'
                        : isDarkMode
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-amber-400 shrink-0" />
                          <span className="font-bold text-xs sm:text-sm">{district.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {district.division}
                        </span>
                      </div>

                      {hasPilots ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0 whitespace-nowrap">
                          {district.pilotCampusesCount} Pilot{district.pilotCampusesCount > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[9.5px] font-mono text-slate-400 shrink-0">
                          Phase 3
                        </span>
                      )}
                    </div>

                    {isCurrentCampusDistrict && (
                      <div className="mt-2 text-[10px] font-bold text-blue-700 dark:text-amber-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active Selected Campus</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLLEGE / INSTITUTION SELECTION FOR SELECTED DISTRICT (5 cols on md) */}
          <div className="md:col-span-5 p-4 sm:p-5 overflow-y-auto max-h-[500px] space-y-3 bg-slate-50/40 dark:bg-slate-900/30">
            {activeDistrict ? (
              <div className="space-y-3">
                <div className="border-b pb-2 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Institutions in District
                    </span>
                    <span className="text-xs font-bold font-mono text-blue-700 dark:text-amber-400">
                      {activeDistrict.name}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {activeDistrict.name} District ({activeDistrict.division})
                  </h4>
                </div>

                {districtCampuses.length > 0 ? (
                  <div className="space-y-2.5">
                    {districtCampuses.map((campus) => {
                      const isSelected = selectedCampus.id === campus.id;
                      return (
                        <div
                          key={campus.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isSelected
                              ? isDarkMode
                                ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30'
                                : 'bg-blue-50 border-blue-500 ring-1 ring-blue-500/30'
                              : isDarkMode
                              ? 'bg-slate-900/90 border-slate-800'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                  {campus.code}
                                </span>
                                {campus.verificationStatus === 'VERIFIED' ? (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                    VERIFIED
                                  </span>
                                ) : campus.verificationStatus === 'TENDER_UNCONFIRMED' ? (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                                    TENDER UNCONFIRMED
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                    GATEWAY PENDING
                                  </span>
                                )}
                              </div>
                              <h5 className="text-xs sm:text-sm font-bold mt-1 text-slate-900 dark:text-slate-100">
                                {campus.name}
                              </h5>
                            </div>
                          </div>

                          {/* Solar capacity details */}
                          <div className="mt-2 text-xs font-mono flex items-center justify-between border-t pt-2 border-slate-200 dark:border-slate-800">
                            <div>
                              <span className="text-slate-500 dark:text-slate-400">Solar Cap: </span>
                              <strong className={campus.solarCapacityKw > 0 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-rose-600 dark:text-rose-400'}>
                                {campus.solarCapacityKw > 0 ? `${campus.solarCapacityKw} kW` : '0 kW (300 kW Tender)'}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-500 dark:text-slate-400">Peak Load: </span>
                              <strong>{campus.peakDemandKw} kW</strong>
                            </div>
                          </div>

                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => {
                                onSelectCampus(campus);
                                onClose();
                              }}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                isSelected
                                  ? isDarkMode
                                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                                    : 'bg-blue-700 text-white hover:bg-blue-800'
                                  : isDarkMode
                                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                              }`}
                            >
                              <span>{isSelected ? 'Current Active Node' : 'Connect to Campus'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed text-center space-y-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                    <AlertCircle className="w-6 h-6 mx-auto text-amber-500/70" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      No Active Pilot Node in {activeDistrict.name}
                    </p>
                    <p className="text-[11px] leading-relaxed max-w-xs mx-auto">
                      Phase 1 & 2 state microgrid pilot nodes are operational in Jodhpur, Jhunjhunu, Udaipur, Bikaner, Kota, and Jaipur. Technical survey for {activeDistrict.name} is scheduled under Phase 3.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-2">
                <MapPin className="w-8 h-8 opacity-40" />
                <p className="text-xs font-semibold">Select any of Rajasthan's 41 districts on the left to view institutional pilot nodes.</p>
              </div>
            )}
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 sm:px-7 py-3.5 border-t flex items-center justify-between border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Directorate of Technical Education (DTE) • Government of Rajasthan
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
          >
            Close Navigator
          </button>
        </div>
      </div>
    </div>
  );
};
