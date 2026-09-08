import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import type { ChartDatum } from '../types';

export type DonutContextValue = {
  data: ChartDatum[];
  categoryKey: string;
  valueKey: string;
  width: number;
  height: number;
  animate: boolean;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  hostRef: RefObject<HTMLDivElement | null>;
  innerRadiusRatio: number;
};

const DonutContext = createContext<DonutContextValue | null>(null);

export function useDonut() {
  const ctx = useContext(DonutContext);
  if (!ctx) throw new Error('DonutChart parts must render inside DonutChart.Root');
  return ctx;
}

type ProviderProps = {
  data: ChartDatum[];
  categoryKey: string;
  valueKey: string;
  width: number;
  height: number;
  animate: boolean;
  hostRef: RefObject<HTMLDivElement | null>;
  innerRadiusRatio: number;
  children: ReactNode;
};

export function DonutProvider({
  data,
  categoryKey,
  valueKey,
  width,
  height,
  animate,
  hostRef,
  innerRadiusRatio,
  children,
}: ProviderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      data,
      categoryKey,
      valueKey,
      width,
      height,
      animate,
      activeIndex,
      setActiveIndex,
      hostRef,
      innerRadiusRatio,
    }),
    [
      data,
      categoryKey,
      valueKey,
      width,
      height,
      animate,
      activeIndex,
      hostRef,
      innerRadiusRatio,
    ],
  );

  return <DonutContext.Provider value={value}>{children}</DonutContext.Provider>;
}
