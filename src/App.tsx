import { usePersistentState } from './hooks/usePersistentState';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { NotificationPanel } from './components/notifications/NotificationPanel';

const OverviewPage = lazy(() => import('./pages/OverviewPage').then(module => ({ default: module.OverviewPage })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then(module => ({ default: module.AnalyticsPage })));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage').then(module => ({ default: module.TransactionsPage })));
const UsersPage = lazy(() => import('./pages/UsersPage').then(module => ({ default: module.UsersPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(module => ({ default: module.ProductsPage })));
const CustomersPage = lazy(() => import('./pages/CustomersPage').then(module => ({ default: module.CustomersPage })));
const ReportsPage = lazy(() => import('./pages/ReportsPage').then(module => ({ default: module.ReportsPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({ default: module.SettingsPage })));

import {
  INITIAL_METRICS,
  INITIAL_TRANSACTIONS,
  INITIAL_USERS,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';
import { Transaction, TransactionStatus, User, Product, Customer, NotificationItem } from './types';

function DashboardContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.hash.slice(1) || '/');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState<boolean>(false);

  useEffect(() => {
    window.location.hash = currentPath;
  }, [currentPath]);
  useEffect(() => {
    const sync = () => setCurrentPath(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Stateful Data Collections
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [transactions, setTransactions] = usePersistentState<Transaction[]>('vanguard_transactions', INITIAL_TRANSACTIONS);
  const [users, setUsers] = usePersistentState<User[]>('vanguard_users', INITIAL_USERS);
  const [products, setProducts] = usePersistentState<Product[]>('vanguard_products', INITIAL_PRODUCTS);
  const [customers, setCustomers] = usePersistentState<Customer[]>('vanguard_customers', INITIAL_CUSTOMERS);
  const [notifications, setNotifications] = usePersistentState<NotificationItem[]>('vanguard_notifications', INITIAL_NOTIFICATIONS);

  // Status updates
  const handleUpdateTransactionStatus = (id: string, newStatus: TransactionStatus) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleUpdateUser = (updated: User) => {
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const handleAddUser = (newUser: User) => {
    setUsers(prev => [newUser, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const handleUpdateCustomer = (updated: Customer) => {
    setCustomers(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  // Notification handlers
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <OverviewPage
            metrics={metrics}
            transactions={transactions}
            onUpdateTransactionStatus={handleUpdateTransactionStatus}
            onNavigate={setCurrentPath}
          />
        );
      case '/analytics':
        return <AnalyticsPage />;
      case '/transactions':
        return (
          <TransactionsPage
            transactions={transactions}
            onUpdateTransactionStatus={handleUpdateTransactionStatus}
          />
        );
      case '/users':
        return (
          <UsersPage
            users={users}
            onUpdateUser={handleUpdateUser}
            onAddUser={handleAddUser}
          />
        );
      case '/products':
        return (
          <ProductsPage
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
          />
        );
      case '/customers':
        return (
          <CustomersPage
            customers={customers}
            onUpdateCustomer={handleUpdateCustomer}
          />
        );
      case '/reports':
        return <ReportsPage transactions={transactions} />;
      case '/settings':
        return <SettingsPage />;
      default:
        return (
          <OverviewPage
            metrics={metrics}
            transactions={transactions}
            onUpdateTransactionStatus={handleUpdateTransactionStatus}
            onNavigate={setCurrentPath}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans antialiased selection:bg-indigo-500/20">
      {/* Primary Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        onOpenNotifications={() => setIsNotificationPanelOpen(prev => !prev)}
        unreadCount={unreadCount}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          currentPath={currentPath}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationPanelOpen(prev => !prev)}
          unreadCount={unreadCount}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 relative">
          <div className="mb-4 rounded-lg border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-2 text-xs text-indigo-700 dark:text-indigo-300">Demo workspace · Sample business data · Changes saved in this browser</div>
          <Suspense fallback={<div role="status" className="p-6 text-sm">Loading dashboard...</div>}>{renderCurrentPage()}</Suspense>
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setCurrentPath}
      />

      {/* Notifications Floating Flyout */}
      {isNotificationPanelOpen && (
        <div className="fixed top-14 right-4 sm:right-6 z-50">
          <NotificationPanel
            isOpen={isNotificationPanelOpen}
            onClose={() => setIsNotificationPanelOpen(false)}
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationRead}
            onMarkAllAsRead={handleMarkAllNotificationsRead}
            onNavigate={setCurrentPath}
          />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DashboardContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
