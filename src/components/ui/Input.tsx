import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  icon,
  ...props
}, ref) => {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3 pointer-events-none text-neutral-400 dark:text-neutral-500 shrink-0 flex items-center">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={`w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-xs rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:border-neutral-400 dark:focus:border-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed ${
          icon ? 'pl-9 pr-3' : 'px-3'
        } py-2 h-9 ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
