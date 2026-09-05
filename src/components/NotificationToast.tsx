import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const NotificationToast: React.FC<ToastProps> = ({ message, onClose, isDarkMode = false }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 max-w-md border p-4 rounded-xl shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 ${
        isDarkMode
          ? 'bg-slate-900 border-emerald-500/40 text-slate-100'
          : 'bg-white border-emerald-500 text-slate-800'
      }`}
    >
      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
          Microgrid Action Confirmed
        </p>
        <p className={`mt-0.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{message}</p>
      </div>
      <button
        onClick={onClose}
        className={`p-1 rounded-md transition-colors cursor-pointer ${
          isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
