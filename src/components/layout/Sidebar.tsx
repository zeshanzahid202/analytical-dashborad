import React, { useState } from 'react';
import {
  LayoutDashboard,
  LineChart,
  CreditCard,
  Users,
  Package,
  Building2,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Shield,
  MoreVertical,
  Check,
  Zap
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  onOpenNotifications,
  unreadCount = 0,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const { showToast } = useToast();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const mainNav = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Analytics', href: '/analytics', icon: LineChart },
    { name: 'Transactions', href: '/transactions', icon: CreditCard },
    { name: 'Users', href: '/users', icon: Users }
  ];

  const managementNav = [
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Customers', href: '/customers', icon: Building2 },
    { name: 'Reports', href: '/reports', icon: FileText }
  ];

  const systemNav = [
    {
      name: 'Notifications',
      href: '#notifications',
      icon: Bell,
      badge: unreadCount > 0 ? String(unreadCount) : undefined,
      onClick: () => {
        onOpenNotifications?.();
        if (onCloseMobile) onCloseMobile();
      }
    },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const handleNavClick = (item: { href: string; onClick?: () => void }) => {
    if (item.onClick) {
      item.onClick();
    } else {
      onNavigate(item.href);
      if (onCloseMobile) onCloseMobile();
    }
  };

  const content = (
    <aside
      className={`h-full flex flex-col justify-between bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-200 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand / Logo Top Bar */}
      <div>
        <div className="h-14 flex items-center justify-between px-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
          {!isCollapsed && (
            <div
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-50">
                Vanguard
              </span>
            </div>
          )}

          {isCollapsed && (
            <div
              onClick={() => onNavigate('/')}
              className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-bold text-xs shadow-xs mx-auto cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
            </div>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6 overflow-y-auto">
          {/* Main Group */}
          <div>
            {!isCollapsed && (
              <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Main
              </div>
            )}
            <nav className="space-y-1">
              {mainNav.map(item => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item)}
                    title={isCollapsed ? item.name : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-50 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 hover:text-neutral-900 dark:hover:text-neutral-200'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'}`} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Management Group */}
          <div>
            {!isCollapsed && (
              <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Management
              </div>
            )}
            <nav className="space-y-1">
              {managementNav.map(item => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item)}
                    title={isCollapsed ? item.name : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-50 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 hover:text-neutral-900 dark:hover:text-neutral-200'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'}`} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* System Group */}
          <div>
            {!isCollapsed && (
              <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                System
              </div>
            )}
            <nav className="space-y-1">
              {systemNav.map(item => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    title={isCollapsed ? item.name : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-50 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 hover:text-neutral-900 dark:hover:text-neutral-200'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'}`} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold font-mono bg-indigo-600 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* User Avatar / Profile Footer */}
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 relative">
        <div
          onClick={() => setProfileDropdownOpen(prev => !prev)}
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 cursor-pointer transition-colors ${
            isCollapsed ? 'justify-center p-1' : ''
          }`}
        >
          {/* Avatar with gradient border */}
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ZZ
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-950" />
          </div>

          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                Zeshan Zahid
              </p>
              <p className="text-[11px] text-neutral-400 truncate">
                zeshanzahid202@gmail.com
              </p>
            </div>
          )}

          {!isCollapsed && (
            <MoreVertical className="w-4 h-4 text-neutral-400 shrink-0" />
          )}
        </div>

        {/* Profile Dropdown Menu */}
        {profileDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setProfileDropdownOpen(false)}
            />
            <div
              className={`absolute bottom-16 ${
                isCollapsed ? 'left-14' : 'left-3 right-3'
              } z-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-1 text-xs space-y-1 animate-in fade-in-0 zoom-in-95`}
            >
              <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Signed in as
                </p>
                <p className="text-[11px] text-neutral-400 truncate">
                  zeshanzahid202@gmail.com
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigate('/settings');
                  setProfileDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>Account Profile</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('/settings');
                  setProfileDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-neutral-400" />
                <span>Security & Sessions</span>
              </button>

              <div className="border-t border-neutral-100 dark:border-neutral-800 my-1" />

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  showToast('Session Active', 'Simulated session logout preview', 'info');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:block h-screen sticky top-0 shrink-0 z-30">
        {content}
      </div>

      {/* Mobile Off-Canvas Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full shadow-2xl flex">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
