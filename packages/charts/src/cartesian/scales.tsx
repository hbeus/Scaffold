import { createContext, useContext, type ReactNode } from 'react';
import type { scaleBand, scaleLinear } from '@visx/scale';

export type CartesianScales = {
  xScale: ReturnType<typeof scaleBand<string>>;
  yScale: ReturnType<typeof scaleLinear<number>>;
};

const ScalesContext = createContext<CartesianScales | null>(null);

export function CartesianScalesProvider({
  xScale,
  yScale,
  children,
}: CartesianScales & { children: ReactNode }) {
  return (
    <ScalesContext.Provider value={{ xScale, yScale }}>{children}</ScalesContext.Provider>
  );
}

export function useCartesianScales() {
  const ctx = useContext(ScalesContext);
  if (!ctx) throw new Error('Missing cartesian scales');
  return ctx;
}
