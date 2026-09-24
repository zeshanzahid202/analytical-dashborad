/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { NotificationPanel } from './components/notifications/NotificationPanel';

import { OverviewPage } from './pages/OverviewPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { UsersPage } from './pages/UsersPage';
import { ProductsPage } from './pages/ProductsPage';
import { CustomersPage } from './pages/CustomersPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

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
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState<boolean>(false);

  // Stateful Data Collections
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

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
        return <ReportsPage />;
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
          {renderCurrentPage()}
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
