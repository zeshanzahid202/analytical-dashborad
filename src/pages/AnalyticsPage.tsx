import { REVENUE_DATA_BY_RANGE } from '../data/mockData';
import { downloadFile, toCsv } from '../utils/download';
import React, { useState } from 'react';
import { RevenueChart } from '../components/charts/RevenueChart';
import { UserGrowthChart } from '../components/charts/UserGrowthChart';
import { TrafficSourceChart } from '../components/charts/TrafficSourceChart';
import { FunnelChart } from '../components/charts/FunnelChart';
import { RETENTION_COHORTS_DATA } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import {
  Calendar,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Repeat,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { showToast } = useToast();
  const [globalRange, setGlobalRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    downloadFile('vanguard_analytics.csv', toCsv(REVENUE_DATA_BY_RANGE[globalRange as keyof typeof REVENUE_DATA_BY_RANGE]), 'text/csv;charset=utf-8');
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Analytics Exported', 'Full metrics dump exported to CSV format.', 'success');
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Analytics & Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            In-depth telemetry across MRR, cohort retention, and full-funnel conversion.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={globalRange}
              onChange={e => {
                setGlobalRange(e.target.value as '7d' | '30d' | '90d' | '12m');
                showToast('Timeframe Adjusted', `Aggregated metrics filtered to ${e.target.value}`, 'info');
              }}
              className="bg-transparent border-none text-xs font-medium focus:outline-none cursor-pointer text-neutral-800 dark:text-neutral-200"
              aria-label="Analytics range"
            >
              <option value="7d" className="dark:bg-neutral-900">Past 7 Days</option>
              <option value="30d" className="dark:bg-neutral-900">Past 30 Days</option>
              <option value="90d" className="dark:bg-neutral-900">Past Quarter (90D)</option>
              <option value="12m" className="dark:bg-neutral-900">Past 12 Months</option>
            </select>
          </div>

          <Button variant="primary" size="sm" isLoading={isExporting} onClick={handleExport}>
            <Download className="w-3.5 h-3.5" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Analytics Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Monthly Recurring Revenue</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
            $18,450
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +14.2% MoM
          </div>
        </div>

        {/* ARPU */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Average Revenue Per User (ARPU)</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
            $67.50
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +6.1% vs target
          </div>
        </div>

        {/* Net Customer Retention */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Net Revenue Retention (NDR)</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
            118.4%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +3.2% expansion
          </div>
        </div>

        {/* User Churn Rate */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Monthly User Churn</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-50 mt-1">
            1.24%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
            Nominal (Healthy &lt; 2%)
          </div>
        </div>
      </div>

      {/* Row 1 Charts: Revenue Breakdown and Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RevenueChart key={globalRange} selectedRange={globalRange} />
        </div>
        <div className="lg:col-span-5">
          <FunnelChart />
        </div>
      </div>

      {/* Row 2 Charts: User Growth and Acquisition Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <UserGrowthChart />
        </div>
        <div className="lg:col-span-6">
          <TrafficSourceChart />
        </div>
      </div>

      {/* Row 3: Cohort Retention Matrix */}
      <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            User Retention Cohorts
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Percentage of sign-up cohorts returning over consecutive monthly cycles
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-neutral-500 dark:text-neutral-400">
                <th className="py-2.5 px-4 font-semibold">Cohort</th>
                <th className="py-2.5 px-4 font-semibold text-right">Size</th>
                <th className="py-2.5 px-4 font-semibold text-center">Month 0</th>
                <th className="py-2.5 px-4 font-semibold text-center">Month 1</th>
                <th className="py-2.5 px-4 font-semibold text-center">Month 2</th>
                <th className="py-2.5 px-4 font-semibold text-center">Month 3</th>
                <th className="py-2.5 px-4 font-semibold text-center">Month 4</th>
                <th className="py-2.5 px-4 font-semibold text-center">Month 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-mono tabular-nums">
              {RETENTION_COHORTS_DATA.map(row => (
                <tr key={row.cohort} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="py-3 px-4 font-medium font-sans text-neutral-900 dark:text-neutral-100">
                    {row.cohort}
                  </td>
                  <td className="py-3 px-4 text-right text-neutral-600 dark:text-neutral-400">
                    {row.size.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                      {row.m0}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                      {row.m1}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                      {row.m2}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                      {row.m3}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                      {row.m4}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                      {row.m5}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
