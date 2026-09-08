import { curveMonotoneX } from '@visx/curve';
import { AreaClosed, AreaStack } from '@visx/shape';
import { motion, useReducedMotion } from 'motion/react';
import { chartMotion } from '../motion';
import type { ChartDatum } from '../types';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';
import { useSeriesRegistration } from './useSeriesRegistration';

export type CartesianAreaProps = {
  dataKey: string;
  label?: string;
  color?: string;
};

export function Area({ dataKey, label, color }: CartesianAreaProps) {
  const { data, xKey, animate, layout, series } = useCartesian();
  const { xScale, yScale } = useCartesianScales();
  const { id, color: fill } = useSeriesRegistration('area', dataKey, label, color);
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  const areaSeries = series.filter(s => s.kind === 'area');
  const keys = areaSeries.map(s => s.dataKey);
  const colorByKey = Object.fromEntries(areaSeries.map(s => [s.dataKey, s.color]));
  const multi = keys.length > 1;
  const mode = multi && layout === 'stack' ? 'stack' : 'overlay';
  const isLeader = areaSeries[0]?.id === id;

  if (mode === 'stack' && !isLeader) return null;

  if (mode === 'stack') {
    return (
      <AreaStack<ChartDatum, string>
        data={data}
        keys={keys}
        x={d => (xScale(String(d.data[xKey] ?? '')) ?? 0) + xScale.bandwidth() / 2}
        y0={d => yScale(d[0]) ?? 0}
        y1={d => yScale(d[1]) ?? 0}
        curve={curveMonotoneX}
      >
        {({ stacks, path }) =>
          stacks.map(stack => (
            <motion.path
              key={`area-stack-${stack.key}`}
              d={path(stack) || ''}
              fill={colorByKey[String(stack.key)] ?? fill}
              fillOpacity={0.35}
              stroke={colorByKey[String(stack.key)] ?? fill}
              strokeWidth={1.5}
              initial={shouldAnimate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={chartMotion.series}
            />
          ))
        }
      </AreaStack>
    );
  }

  return (
    <AreaClosed<ChartDatum>
      data={data}
      x={d => (xScale(String(d[xKey] ?? '')) ?? 0) + xScale.bandwidth() / 2}
      y={d => yScale(Number(d[dataKey]) || 0) ?? 0}
      yScale={yScale}
      curve={curveMonotoneX}
    >
      {({ path }) => (
        <motion.path
          d={path(data) || ''}
          fill={fill}
          fillOpacity={0.35}
          stroke={fill}
          strokeWidth={1.5}
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={chartMotion.series}
        />
      )}
    </AreaClosed>
  );
}
