import { curveMonotoneX } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { motion, useReducedMotion } from 'motion/react';
import { chartMotion } from '../motion';
import type { ChartDatum } from '../types';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';
import { useSeriesRegistration } from './useSeriesRegistration';

export type CartesianLineProps = {
  dataKey: string;
  label?: string;
  color?: string;
};

export function Line({ dataKey, label, color }: CartesianLineProps) {
  const { data, xKey, animate } = useCartesian();
  const { xScale, yScale } = useCartesianScales();
  const { color: stroke } = useSeriesRegistration('line', dataKey, label, color);
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <LinePath<ChartDatum>
      data={data}
      x={d => (xScale(String(d[xKey] ?? '')) ?? 0) + xScale.bandwidth() / 2}
      y={d => yScale(Number(d[dataKey]) || 0) ?? 0}
      curve={curveMonotoneX}
    >
      {({ path }) => (
        <motion.path
          d={path(data) || ''}
          fill='none'
          stroke={stroke}
          strokeWidth={2}
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={chartMotion.series}
        />
      )}
    </LinePath>
  );
}
