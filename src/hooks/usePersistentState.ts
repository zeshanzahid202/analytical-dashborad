import { useEffect, useState } from 'react';

// Storage can be unavailable in private browsing or when the quota is exceeded.
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return initial;
      const parsed = JSON.parse(saved);
      if (Array.isArray(initial) && !Array.isArray(parsed)) return initial;
      if (typeof parsed !== typeof initial || parsed === null) return initial;
      return parsed as T;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* Keep the current session usable without storage. */ }
  }, [key, value]);
  return [value, setValue] as const;
}
