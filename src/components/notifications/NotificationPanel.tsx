import React, { useState } from 'react';
import { NotificationItem } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Bell,
  CheckCheck,
  CreditCard,
  UserCheck,
  ArrowUpRight,
  AlertTriangle,
  FileText,
  X,
  Clock
} from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigate: (href: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const filtered = filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case 'user':
        return <UserCheck className="w-4 h-4 text-blue-500" />;
      case 'upgrade':
        return <ArrowUpRight className="w-4 h-4 text-indigo-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'report':
        return <FileText className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white font-mono">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded"
              aria-label="Close notifications"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Switcher */}
        <div className="px-4 py-2 bg-neutral-50/50 dark:bg-neutral-800/40 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'unread'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs text-neutral-400">
              No notifications to display.
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.isRead) onMarkAsRead(item.id);
                  if (item.link) {
                    onNavigate(item.link);
                    onClose();
                  }
                }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  item.isRead
                    ? 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40 opacity-75'
                    : 'bg-indigo-500/[0.03] dark:bg-indigo-500/[0.06] hover:bg-indigo-500/[0.08]'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs truncate ${!item.isRead ? 'font-semibold text-neutral-900 dark:text-neutral-100' : 'font-medium text-neutral-700 dark:text-neutral-300'}`}>
                      {item.title}
                    </p>
                    {!item.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
