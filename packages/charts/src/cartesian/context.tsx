import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import type { CartesianLayout, ChartDatum, Margin } from '../types';

export type SeriesRegistration = {
  id: string;
  dataKey: string;
  label?: string;
  color: string;
  kind: 'bar' | 'line' | 'area';
};

export type CartesianContextValue = {
  data: ChartDatum[];
  xKey: string;
  width: number;
  height: number;
  margin: Margin;
  innerWidth: number;
  innerHeight: number;
  animate: boolean;
  layout: CartesianLayout;
  series: SeriesRegistration[];
  registerSeries: (series: SeriesRegistration) => void;
  unregisterSeries: (id: string) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  xValues: string[];
  yMax: number;
  hostRef: RefObject<HTMLDivElement | null>;
};

const CartesianContext = createContext<CartesianContextValue | null>(null);

export function useCartesian() {
  const ctx = useContext(CartesianContext);
  if (!ctx) throw new Error('CartesianChart parts must render inside CartesianChart.Root');
  return ctx;
}

export function useOptionalCartesian() {
  return useContext(CartesianContext);
}

type ProviderProps = {
  data: ChartDatum[];
  xKey: string;
  width: number;
  height: number;
  margin: Margin;
  animate: boolean;
  layout: CartesianLayout;
  hostRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

export function CartesianProvider({
  data,
  xKey,
  width,
  height,
  margin,
  animate,
  layout,
  hostRef,
  children,
}: ProviderProps) {
  const [seriesMap, setSeriesMap] = useState<Map<string, SeriesRegistration>>(() => new Map());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const registerSeries = useCallback((series: SeriesRegistration) => {
    setSeriesMap(prev => {
      const next = new Map(prev);
      next.set(series.id, series);
      return next;
    });
  }, []);

  const unregisterSeries = useCallback((id: string) => {
    setSeriesMap(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const series = useMemo(() => [...seriesMap.values()], [seriesMap]);

  const xValues = useMemo(
    () => data.map(d => String(d[xKey] ?? '')),
    [data, xKey],
  );

  const yMax = useMemo(() => {
    const seriesKeys = series.map(s => s.dataKey);
    const barKeys = series.filter(s => s.kind === 'bar').map(s => s.dataKey);
    const areaKeys = series.filter(s => s.kind === 'area').map(s => s.dataKey);
    let max = 0;

    const stackSumMax = (keys: string[]) => {
      if (keys.length <= 1) return 0;
      let local = 0;
      for (const row of data) {
        let sum = 0;
        for (const key of keys) {
          const n = Number(row[key]);
          if (Number.isFinite(n)) sum += n;
        }
        if (sum > local) local = sum;
      }
      return local;
    };

    if (layout === 'stack') {
      max = Math.max(max, stackSumMax(barKeys), stackSumMax(areaKeys));
    }

    for (const row of data) {
      for (const [key, val] of Object.entries(row)) {
        if (key === xKey) continue;
        if (seriesKeys.length > 0 && !seriesKeys.includes(key)) continue;
        if (
          layout === 'stack' &&
          ((barKeys.length > 1 && barKeys.includes(key)) ||
            (areaKeys.length > 1 && areaKeys.includes(key)))
        ) {
          continue;
        }
        const n = Number(val);
        if (Number.isFinite(n) && n > max) max = n;
      }
    }
    return max === 0 ? 1 : max;
  }, [data, series, xKey, layout]);

  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const value = useMemo<CartesianContextValue>(
    () => ({
      data,
      xKey,
      width,
      height,
      margin,
      innerWidth,
      innerHeight,
      animate,
      layout,
      series,
      registerSeries,
      unregisterSeries,
      activeIndex,
      setActiveIndex,
      xValues,
      yMax,
      hostRef,
    }),
    [
      data,
      xKey,
      width,
      height,
      margin,
      innerWidth,
      innerHeight,
      animate,
      layout,
      series,
      registerSeries,
      unregisterSeries,
      activeIndex,
      xValues,
      yMax,
      hostRef,
    ],
  );

  return <CartesianContext.Provider value={value}>{children}</CartesianContext.Provider>;
}
