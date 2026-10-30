import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { REVENUE_DATA_BY_RANGE } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

interface RevenueChartProps {
  className?: string;
  selectedRange?: '7d' | '30d' | '90d' | '12m';
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ className = '', selectedRange }) => {
  const [range, setRange] = useState<'7d' | '30d' | '90d' | '12m'>('12m');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const data = REVENUE_DATA_BY_RANGE[selectedRange ?? range];

  const totalCurrent = data.reduce((acc, curr) => acc + curr.current, 0);
  const totalPrevious = data.reduce((acc, curr) => acc + curr.previous, 0);
  const percentChange = Number((((totalCurrent - totalPrevious) / totalPrevious) * 100).toFixed(1));

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const ranges: { id: '7d' | '30d' | '90d' | '12m'; label: string }[] = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '12m', label: '12 Months' }
  ];

  return (
    <div className={`p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex flex-col ${className}`}>
      {/* Header with Title and Range Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Revenue Overview
            </h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{percentChange}%
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Current period comparison against previous baseline
          </p>
        </div>

        {/* Range Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg self-start sm:self-auto border border-neutral-200/60 dark:border-neutral-700/60">
          {ranges.map(item => (
            <button
              key={item.id}
              onClick={() => setRange(item.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap ${
                range === item.id
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? '#6366f1' : '#4f46e5'} stopOpacity={0.25} />
                <stop offset="95%" stopColor={isDark ? '#6366f1' : '#4f46e5'} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? '#737373' : '#a3a3a3'} stopOpacity={0.12} />
                <stop offset="95%" stopColor={isDark ? '#737373' : '#a3a3a3'} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? '#262626' : '#f0f0f0'}
            />

            <XAxis
              dataKey="date"
              stroke={isDark ? '#737373' : '#a3a3a3'}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#262626' : '#e5e5e5' }}
              dy={10}
            />

            <YAxis
              stroke={isDark ? '#737373' : '#a3a3a3'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
              dx={-5}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const currentVal = payload.find(p => p.dataKey === 'current')?.value as number;
                  const prevVal = payload.find(p => p.dataKey === 'previous')?.value as number;
                  return (
                    <div className="p-3 bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1.5">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        {label}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                          Current Period:
                        </span>
                        <span className="font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                          ${currentVal?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                          <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                          Previous Period:
                        </span>
                        <span className="font-mono tabular-nums text-neutral-600 dark:text-neutral-400">
                          ${prevVal?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="previous"
              stroke={isDark ? '#525252' : '#a3a3a3'}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#previousGradient)"
            />

            <Area
              type="monotone"
              dataKey="current"
              stroke={isDark ? '#6366f1' : '#4f46e5'}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#currentGradient)"
              activeDot={{
                r: 5,
                stroke: isDark ? '#18181b' : '#ffffff',
                strokeWidth: 2,
                fill: isDark ? '#818cf8' : '#4f46e5'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend footer */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <span>Current Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-neutral-400 dark:bg-neutral-600 rounded-full border border-dashed" />
          <span>Previous Period</span>
        </div>
      </div>
    </div>
  );
};
