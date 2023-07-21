import type { Context } from 'react';
import { useContext } from 'react';

export function getSafeContext<T>(context: Context<T | null>, name = 'context') {
  return () => {
    const ctx = useContext(context);
    if (!ctx) {
      throw new Error(`Missing ${name} data!`);
    }
    return ctx;
  };
}
