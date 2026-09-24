import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'neutral' | 'indigo' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    neutral: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800',
    indigo: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
    outline: 'border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border whitespace-nowrap tabular-nums ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
