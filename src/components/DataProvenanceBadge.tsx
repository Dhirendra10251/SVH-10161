import React, { useState, useRef, useEffect } from 'react';
import { DataMode, ProvenanceInfo } from '../types';
import { ShieldCheck, Radio, Sparkles, AlertCircle, Info, ExternalLink, X } from 'lucide-react';

interface DataProvenanceBadgeProps {
  mode: DataMode;
  sourceName?: string;
  provenance?: ProvenanceInfo;
  isDarkMode?: boolean;
  size?: 'sm' | 'md';
  onOpenAuditModal?: () => void;
}

export const DataProvenanceBadge: React.FC<DataProvenanceBadgeProps> = ({
  mode,
  sourceName,
  provenance,
  isDarkMode = false,
  size = 'sm',
  onOpenAuditModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const config = {
    LIVE: {
      label: 'LIVE',
      sublabel: 'Level A: Real-time Feed',
      icon: Radio,
      badgeClass: isDarkMode
        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
        : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100',
      dotClass: 'bg-emerald-500 animate-pulse',
    },
    LAST_VERIFIED: {
      label: 'LAST VERIFIED',
      sublabel: 'Level B: Government / Institutional Audit',
      icon: ShieldCheck,
      badgeClass: isDarkMode
        ? 'bg-blue-950/80 text-cyan-300 border-cyan-500/40 hover:bg-blue-900/60'
        : 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100',
      dotClass: 'bg-cyan-500',
    },
    PROJECTED: {
      label: 'PROJECTED',
      sublabel: 'Level C: Physics / Dispatch Model',
      icon: Sparkles,
      badgeClass: isDarkMode
        ? 'bg-amber-950/80 text-amber-300 border-amber-500/40 hover:bg-amber-900/60'
        : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100',
      dotClass: 'bg-amber-500',
    },
    UNAVAILABLE: {
      label: 'UNAVAILABLE',
      sublabel: 'Level D: Unverified / Pending Sensor',
      icon: AlertCircle,
      badgeClass: isDarkMode
        ? 'bg-rose-950/80 text-rose-300 border-rose-500/40 hover:bg-rose-900/60'
        : 'bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100',
      dotClass: 'bg-rose-500',
    },
  }[mode] || {
    label: mode,
    sublabel: 'Data Record',
    icon: Info,
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    dotClass: 'bg-slate-500',
  };

  const IconComp = config.icon;

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Click to inspect data provenance & verification audit trail"
        className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs ${
          size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        } ${config.badgeClass}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
        <IconComp className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>{config.label}</span>
      </button>

      {/* Provenance Detail Popover */}
      {isOpen && (
        <div
          className={`absolute z-50 left-0 sm:left-auto sm:right-0 mt-2 w-72 sm:w-80 rounded-xl p-3.5 shadow-xl border text-xs text-left backdrop-blur-md transition-all ${
            isDarkMode
              ? 'bg-slate-950/95 border-slate-700 text-slate-200 shadow-cyan-950/50'
              : 'bg-white/95 border-slate-300 text-slate-900 shadow-slate-300'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-2 mb-2 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
              <span className="font-extrabold uppercase tracking-wider">{config.label}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
            {config.sublabel}
          </p>

          <div className="space-y-1.5 text-[11px]">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">Data Source: </span>
              <span className="text-slate-900 dark:text-slate-100">
                {provenance?.sourceName || sourceName || 'Institutional Telemetry Feed'}
              </span>
            </div>

            {provenance?.verifiedBy && (
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Verified By: </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  {provenance.verifiedBy}
                </span>
              </div>
            )}

            {provenance?.sourceDate && (
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Audit Date: </span>
                <span className="font-mono">{provenance.sourceDate}</span>
              </div>
            )}

            {provenance?.auditStandard && (
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Standard: </span>
                <span className="font-medium text-blue-700 dark:text-cyan-400">
                  {provenance.auditStandard}
                </span>
              </div>
            )}

            {provenance?.notes && (
              <div className="pt-1 border-t border-slate-200 dark:border-slate-800 text-[10.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                <span className="font-bold">Audit Note: </span>
                {provenance.notes}
              </div>
            )}
          </div>

          {onOpenAuditModal && (
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuditModal();
                }}
                className={`inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
                  isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-blue-700 hover:text-blue-900'
                }`}
              >
                <span>View Full State Audit Log</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
