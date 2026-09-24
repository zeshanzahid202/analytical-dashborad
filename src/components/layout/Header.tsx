import React from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Monitor,
  Menu,
  Calendar,
  Download,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  currentPath: string;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  onOpenMobileMenu: () => void;
  dateRange?: string;
  onDateRangeChange?: (range: string) => void;
  onExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onOpenSearch,
  onOpenNotifications,
  unreadCount,
  onOpenMobileMenu,
  dateRange = '30d',
  onDateRangeChange,
  onExport
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Overview';
      case '/analytics':
        return 'Analytics';
      case '/transactions':
        return 'Transactions';
      case '/users':
        return 'Users';
      case '/products':
        return 'Products';
      case '/customers':
        return 'Customers';
      case '/reports':
        return 'Reports';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-14 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
      {/* Zone 1: Mobile Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400 font-medium hidden sm:inline">
            Vanguard
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">/</span>
          <h1 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
            {getPageTitle(currentPath)}
          </h1>
        </div>
      </div>

      {/* Zone 2: Quick Search Trigger Button */}
      <div className="flex-1 max-w-xs mx-4 hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search or jump to...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions, Date Range, Theme Switcher, Notifications */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Open search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Theme Switcher Toggle */}
        <div className="flex items-center p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-md transition-all ${
              theme === 'light'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
            title="Light mode"
            aria-label="Switch to light theme"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-md transition-all ${
              theme === 'dark'
                ? 'bg-neutral-800 text-neutral-100 shadow-2xs'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
            title="Dark mode"
            aria-label="Switch to dark theme"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`p-1.5 rounded-md transition-all ${
              theme === 'system'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
            title="System theme"
            aria-label="Switch to system theme"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 ring-2 ring-white dark:ring-neutral-950" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
