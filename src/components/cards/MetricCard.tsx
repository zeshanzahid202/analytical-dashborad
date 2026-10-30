import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { DashboardMetric } from '../../types';

interface MetricCardProps {
  metric: DashboardMetric;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, onClick }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'DollarSign':
        return <DollarSign className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />;
      case 'Users':
        return <Users className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />;
      default:
        return <DollarSign className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />;
    }
  };

  // Sparkline coordinates generator
  const points = metric.sparklineData.map(d => d.val);
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const height = 28;
  const width = 72;
  const step = width / (points.length - 1);
  const svgPoints = points
    .map((val, idx) => {
      const x = idx * step;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      onClick={onClick}
      className={`group relative p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-150 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 tracking-tight">
          {metric.label}
        </span>
        <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200/60 dark:border-neutral-700/60 transition-transform group-hover:scale-105">
          {getIcon(metric.iconName)}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-mono tabular-nums">
          {metric.value}
        </div>

        {/* Mini SVG Sparkline */}
        <div className="w-[72px] h-[28px] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={metric.isPositive ? '#10b981' : '#f43f5e'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={svgPoints}
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-2.5 text-xs">
        <span
          className={`inline-flex items-center gap-0.5 font-semibold font-mono tabular-nums ${
            metric.isPositive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {metric.isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {metric.isPositive ? '+' : ''}
          {metric.change}%
        </span>
        <span className="text-neutral-400 dark:text-neutral-500">
          {metric.timeframe}
        </span>
      </div>
    </div>
  );
};
