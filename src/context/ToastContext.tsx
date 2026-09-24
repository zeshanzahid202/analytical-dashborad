import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error', duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((
    title: string,
    description?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success',
    duration = 3500
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type, duration };

    setToasts(prev => [...prev.slice(-3), newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div 
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4"
        aria-live="polite"
      >
        {toasts.map(toast => {
          const type = toast.type || 'success';
          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg backdrop-blur-md transition-all duration-200 animate-in slide-in-from-bottom-2 bg-white/95 dark:bg-neutral-900/95 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100"
            >
              <div className="shrink-0 mt-0.5">
                {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                {type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                {type === 'error' && <XCircle className="w-4 h-4 text-rose-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded transition-colors"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
