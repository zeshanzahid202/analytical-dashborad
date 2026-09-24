import React, { useState } from 'react';
import { DashboardMetric, Transaction, TransactionStatus } from '../types';
import { MetricCard } from '../components/cards/MetricCard';
import { RevenueChart } from '../components/charts/RevenueChart';
import { UserGrowthChart } from '../components/charts/UserGrowthChart';
import { TransactionTable } from '../components/tables/TransactionTable';
import { TransactionDetailModal } from '../components/modals/TransactionDetailModal';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { Download, Calendar, ArrowRight } from 'lucide-react';

interface OverviewPageProps {
  metrics: DashboardMetric[];
  transactions: Transaction[];
  onUpdateTransactionStatus: (id: string, status: TransactionStatus) => void;
  onNavigate: (path: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  metrics,
  transactions,
  onUpdateTransactionStatus,
  onNavigate
}) => {
  const { showToast } = useToast();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('30d');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(
        'Export Complete',
        'vanguard_overview_metrics_2026.csv has been prepared and downloaded.',
        'success'
      );
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Good morning, Zeshan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        {/* Global Date Range & Export Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={selectedDateRange}
              onChange={e => {
                setSelectedDateRange(e.target.value);
                showToast('Filter Updated', `Dashboard synced to ${e.target.value} timeframe.`, 'info');
              }}
              className="bg-transparent border-none text-xs font-medium focus:outline-none cursor-pointer text-neutral-800 dark:text-neutral-200"
              aria-label="Overview date range"
            >
              <option value="7d" className="dark:bg-neutral-900">Last 7 Days</option>
              <option value="30d" className="dark:bg-neutral-900">Last 30 Days</option>
              <option value="90d" className="dark:bg-neutral-900">Last 90 Days</option>
              <option value="12m" className="dark:bg-neutral-900">Last 12 Months</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="sm"
            isLoading={isExporting}
            onClick={handleExport}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* 4 Premium KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(metric => (
          <MetricCard
            key={metric.id}
            metric={metric}
            onClick={() => {
              if (metric.id === 'revenue') onNavigate('/analytics');
              if (metric.id === 'users') onNavigate('/users');
              if (metric.id === 'transactions') onNavigate('/transactions');
              if (metric.id === 'conversion') onNavigate('/analytics');
            }}
          />
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RevenueChart />
        </div>
        <div className="lg:col-span-5">
          <UserGrowthChart />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Recent Transactions
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Latest payment activity processed across all currencies
            </p>
          </div>
          <button
            onClick={() => onNavigate('/transactions')}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <TransactionTable
          transactions={transactions}
          onSelectTransaction={tx => setSelectedTx(tx)}
          limit={5}
          showFilters={false}
          onExport={handleExport}
        />
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTx}
        isOpen={Boolean(selectedTx)}
        onClose={() => setSelectedTx(null)}
        onUpdateStatus={onUpdateTransactionStatus}
      />
    </div>
  );
};
