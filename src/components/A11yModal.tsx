import React, { useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Eye,
  Keyboard,
  Sliders,
  Check,
  X,
  Volume2,
  Maximize2
} from 'lucide-react';

interface A11yModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenReaderActive: boolean;
  onToggleScreenReader: () => void;
  fontSize: 'sm' | 'md' | 'lg';
  onChangeFontSize: (size: 'sm' | 'md' | 'lg') => void;
  isDarkMode: boolean;
}

export const A11yModal: React.FC<A11yModalProps> = ({
  isOpen,
  onClose,
  screenReaderActive,
  onToggleScreenReader,
  fontSize,
  onChangeFontSize,
  isDarkMode,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
    >
      <div
        ref={modalRef}
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200 ${
          isDarkMode
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="a11y-modal-title" className="text-base font-bold tracking-tight">
                Accessibility & Screen Reader Access
              </h2>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Government of India GIGW & WCAG 2.1 AAA Compliance Suite
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close accessibility options"
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Screen Reader Mode Active Toggle */}
          <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
            screenReaderActive
              ? isDarkMode
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                : 'bg-blue-50 border-blue-300 text-blue-900'
              : isDarkMode
              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Volume2 className={`w-4 h-4 ${screenReaderActive ? (isDarkMode ? 'text-amber-400' : 'text-blue-700') : 'text-slate-500'}`} />
                <span className="text-sm font-bold">
                  Enhanced Screen Reader & Navigation Mode
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono ${
                  screenReaderActive
                    ? isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-200 text-blue-900'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                }`}>
                  {screenReaderActive ? 'Active' : 'Standard'}
                </span>
              </div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Enables high-contrast focus rings (3px solid), ARIA live notifications for dynamic sensor changes, and full tabular descriptors.
              </p>
            </div>

            <button
              onClick={onToggleScreenReader}
              role="switch"
              aria-checked={screenReaderActive}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                screenReaderActive
                  ? isDarkMode
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 border-amber-400'
                    : 'bg-blue-700 text-white hover:bg-blue-800 border-blue-800'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700'
                  : 'bg-white text-slate-800 hover:bg-slate-100 border-slate-300'
              }`}
            >
              {screenReaderActive ? 'Disable' : 'Enable'}
            </button>
          </div>

          {/* Section 2: Global Text Scaling */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider block">
              Global Typography Scaling (A- / A / A+)
            </label>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              Scales the entire application proportionally using CSS root variables without breaking component layouts.
            </p>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={() => onChangeFontSize('sm')}
                aria-pressed={fontSize === 'sm'}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  fontSize === 'sm'
                    ? isDarkMode
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-blue-100 border-blue-600 text-blue-900 font-bold'
                    : isDarkMode
                    ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 font-medium'
                    : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 font-medium'
                }`}
              >
                <div className="text-sm font-extrabold mb-0.5">A-</div>
                <div className="text-[11px]">Compact (90%)</div>
              </button>

              <button
                onClick={() => onChangeFontSize('md')}
                aria-pressed={fontSize === 'md'}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  fontSize === 'md'
                    ? isDarkMode
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-blue-100 border-blue-600 text-blue-900 font-bold'
                    : isDarkMode
                    ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 font-medium'
                    : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 font-medium'
                }`}
              >
                <div className="text-sm font-extrabold mb-0.5">A</div>
                <div className="text-[11px]">Standard (100%)</div>
              </button>

              <button
                onClick={() => onChangeFontSize('lg')}
                aria-pressed={fontSize === 'lg'}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  fontSize === 'lg'
                    ? isDarkMode
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-blue-100 border-blue-600 text-blue-900 font-bold'
                    : isDarkMode
                    ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 font-medium'
                    : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 font-medium'
                }`}
              >
                <div className="text-sm font-extrabold mb-0.5">A+</div>
                <div className="text-[11px]">Large (115%)</div>
              </button>
            </div>
          </div>

          {/* Section 3: Keyboard Navigation & Shortcuts Guide */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-blue-700 dark:text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Keyboard Navigation Shortcuts
              </h3>
            </div>

            <div className={`rounded-xl border overflow-hidden text-xs ${
              isDarkMode ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className={`p-2.5 border-b flex justify-between items-center ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>Skip to Content</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200">
                  Tab on page load
                </kbd>
              </div>
              <div className={`p-2.5 border-b flex justify-between items-center ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>Switch Section / Tab</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200">
                  Alt + 1 to 5
                </kbd>
              </div>
              <div className={`p-2.5 border-b flex justify-between items-center ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>Close Modals & Dialogs</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200">
                  Escape
                </kbd>
              </div>
              <div className="p-2.5 flex justify-between items-center">
                <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>Activate Action / Dispatch</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200">
                  Enter or Space
                </kbd>
              </div>
            </div>
          </div>

          {/* Section 4: Document Landmark Structure */}
          <div className="space-y-1.5 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-[11px]">
              Screen Reader Landmarks
            </h3>
            <p className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              All regions use standard semantic landmarks: <code className="font-mono text-[11px] font-bold">banner</code> (top header), <code className="font-mono text-[11px] font-bold">navigation</code> (sidebar menu), <code className="font-mono text-[11px] font-bold">main</code> (live telemetry content), and <code className="font-mono text-[11px] font-bold">dialog</code> for action modals.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-end ${
          isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-blue-700 hover:bg-blue-800 text-white'
            }`}
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
