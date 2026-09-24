import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { USER_GROWTH_BY_FILTER } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { Users } from 'lucide-react';

interface UserGrowthChartProps {
  className?: string;
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ className = '' }) => {
  const [filter, setFilter] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const data = USER_GROWTH_BY_FILTER[filter];

  const totalUsers = data.reduce((acc, curr) => acc + curr.total, 0);

  const filters: { id: 'weekly' | 'monthly' | 'yearly'; label: string }[] = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' }
  ];

  return (
    <div className={`p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              User Growth
            </h3>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono tabular-nums">
              ({totalUsers.toLocaleString()} total)
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            New vs returning active user distribution
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg self-start sm:self-auto border border-neutral-200/60 dark:border-neutral-700/60">
          {filters.map(item => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap ${
                filter === item.id
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? '#262626' : '#f0f0f0'}
            />

            <XAxis
              dataKey="period"
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
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
              dx={-5}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const newUsers = payload.find(p => p.dataKey === 'newUsers')?.value as number;
                  const returning = payload.find(p => p.dataKey === 'returningUsers')?.value as number;
                  return (
                    <div className="p-3 bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl backdrop-blur-md text-xs space-y-1.5">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        {label}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          New Users:
                        </span>
                        <span className="font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                          {newUsers?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          Returning Users:
                        </span>
                        <span className="font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                          {returning?.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-1.5 mt-1.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
                        <span className="text-neutral-500 dark:text-neutral-400">Total Active:</span>
                        <span className="font-semibold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                          {((newUsers || 0) + (returning || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="newUsers"
              name="New Users"
              fill={isDark ? '#10b981' : '#059669'}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />

            <Bar
              dataKey="returningUsers"
              name="Returning Users"
              fill={isDark ? '#6366f1' : '#4f46e5'}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
          <span>New Users</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600 dark:bg-indigo-500" />
          <span>Returning Users</span>
        </div>
      </div>
    </div>
  );
};
