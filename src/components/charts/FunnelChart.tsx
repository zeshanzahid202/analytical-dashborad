import React from 'react';
import { CONVERSION_FUNNEL_DATA } from '../../data/mockData';
import { ArrowDown } from 'lucide-react';

export const FunnelChart: React.FC = () => {
  return (
    <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex flex-col">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Conversion Funnel
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          End-to-end user lifecycle from anonymous visitor to paid subscription
        </p>
      </div>

      <div className="space-y-3 flex-1 flex flex-col justify-around">
        {CONVERSION_FUNNEL_DATA.map((stage, idx) => {
          const isFirst = idx === 0;
          return (
            <div key={stage.stage} className="relative">
              {!isFirst && (
                <div className="flex items-center gap-2 my-1 text-[11px] text-neutral-400 dark:text-neutral-500 pl-4">
                  <ArrowDown className="w-3 h-3 text-rose-500/80" />
                  <span>
                    Drop-off: <strong className="font-mono text-rose-600 dark:text-rose-400">{stage.dropoffRate}%</strong>
                  </span>
                </div>
              )}
              <div className="p-3 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/70 transition-colors">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {stage.stage}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                      {stage.count.toLocaleString()}
                    </span>
                    <span className="font-mono tabular-nums font-semibold text-indigo-600 dark:text-indigo-400 w-12 text-right">
                      {stage.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-200/70 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
