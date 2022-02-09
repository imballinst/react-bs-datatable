import { createContext, useContext } from 'react';

/**
 * @internal
 *
 * This is a function to create a typed React context safely.
 * Reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/.
 */
export function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}
