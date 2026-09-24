import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TRAFFIC_SOURCES_DATA } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

export const TrafficSourceChart: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Traffic Acquisition Channels
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Visitor volume and conversion rate by acquisition source
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
        {/* Donut Chart */}
        <div className="md:col-span-5 h-56 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2.5 bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg backdrop-blur-md text-xs">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {data.source}
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-400 font-mono tabular-nums mt-0.5">
                          {data.visitors.toLocaleString()} visitors ({data.percentage}%)
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-mono tabular-nums mt-0.5">
                          {data.conversionRate}% conv. rate
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={TRAFFIC_SOURCES_DATA}
                dataKey="visitors"
                nameKey="source"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                stroke={isDark ? '#171717' : '#ffffff'}
                strokeWidth={2}
              >
                {TRAFFIC_SOURCES_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
              148.2k
            </span>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">
              Total Traffic
            </span>
          </div>
        </div>

        {/* Source List with Bars */}
        <div className="md:col-span-7 space-y-3">
          {TRAFFIC_SOURCES_DATA.map(item => (
            <div key={item.source} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {item.source}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 font-mono tabular-nums">
                  <span>{item.visitors.toLocaleString()}</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 w-10 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
