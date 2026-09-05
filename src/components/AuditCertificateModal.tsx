import React, { useEffect } from 'react';
import { CampusProfile, MetricData } from '../types';
import { AuditCertificateDocument } from './AuditCertificateDocument';
import { X, Printer, ShieldCheck, Download } from 'lucide-react';

interface AuditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  campus: CampusProfile;
  metrics: MetricData;
  isDarkMode?: boolean;
}

export const AuditCertificateModal: React.FC<AuditCertificateModalProps> = ({
  isOpen,
  onClose,
  campus,
  metrics,
  isDarkMode = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Native browser print request failed:', err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-cert-modal-title"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs overflow-y-auto"
    >
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isDarkMode
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-slate-100 border-slate-300 text-slate-900'
        }`}
      >
        {/* Top Control Header Bar */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b shrink-0 ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isDarkMode
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h2
                id="audit-cert-modal-title"
                className="text-sm sm:text-base font-bold truncate leading-tight"
              >
                Official Audit Certificate • {campus.name}
              </h2>
              <p
                className={`text-[11px] truncate ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                VPP Node: <span className="font-mono font-bold">{campus.code}</span> • {campus.district}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Print / Save as PDF Primary Action */}
            <button
              id="modal-print-btn"
              onClick={handlePrint}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isDarkMode
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
              title="Open browser print dialog (choose Save as PDF or physical printer)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            {/* Close Button (Close / Return) */}
            <button
              id="close-audit-certificate-btn"
              onClick={onClose}
              aria-label="Close certificate preview"
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
              title="Close and return to Reports"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Canvas (Simulates A4 Paper Layout) */}
        <div
          className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
            isDarkMode ? 'bg-slate-950/60' : 'bg-slate-200/70'
          }`}
        >
          <div className="max-w-[210mm] mx-auto shadow-xl rounded-xl overflow-hidden">
            <AuditCertificateDocument campus={campus} metrics={metrics} isPrintVersion={false} />
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div
          className={`flex items-center justify-between px-5 py-3 border-t shrink-0 text-xs ${
            isDarkMode
              ? 'bg-slate-950 border-slate-800 text-slate-400'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <span className="text-[11px] font-mono hidden sm:inline">
            A4 Portrait formatted • Ready for statutory submission
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Close & Return to Reports
            </button>

            <button
              onClick={handlePrint}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isDarkMode
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
