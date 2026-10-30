import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  LineChart,
  CreditCard,
  Users,
  Package,
  Building2,
  FileText,
  Settings,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { title: 'Overview Dashboard', href: '/', icon: LayoutDashboard, category: 'Navigation' },
    { title: 'Analytics & Funnels', href: '/analytics', icon: LineChart, category: 'Navigation' },
    { title: 'Transactions Ledger', href: '/transactions', icon: CreditCard, category: 'Navigation' },
    { title: 'Users Management', href: '/users', icon: Users, category: 'Navigation' },
    { title: 'Products & Plans', href: '/products', icon: Package, category: 'Management' },
    { title: 'Customer Accounts', href: '/customers', icon: Building2, category: 'Management' },
    { title: 'Reports & Audits', href: '/reports', icon: FileText, category: 'Management' },
    { title: 'System Settings', href: '/settings', icon: Settings, category: 'System' }
  ];

  const filtered = quickNav.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-150">
        <div className="flex items-center px-4 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or jump to page..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full h-12 px-3 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No matching pages or commands.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] uppercase font-semibold tracking-wider text-neutral-400">
                Pages & Workflows
              </div>
              {filtered.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      onNavigate(item.href);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                      <span>{item.category}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 px-4">
          <span>Pro tip: Press ⌘K anywhere to open</span>
          <span className="font-mono">Vanguard v2.4</span>
        </div>
      </div>
    </div>
  );
};
