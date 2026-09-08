import { BarGroup, BarStack } from '@visx/shape';
import { scaleBand } from '@visx/scale';
import { motion, useReducedMotion } from 'motion/react';
import { chartMotion } from '../motion';
import type { ChartDatum } from '../types';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';
import { useSeriesRegistration } from './useSeriesRegistration';

export type CartesianBarProps = {
  dataKey: string;
  label?: string;
  color?: string;
};

export function Bar({ dataKey, label, color }: CartesianBarProps) {
  const { data, xKey, innerHeight, animate, layout, series } = useCartesian();
  const { xScale, yScale } = useCartesianScales();
  const { id, color: fill } = useSeriesRegistration('bar', dataKey, label, color);
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  const barSeries = series.filter(s => s.kind === 'bar');
  const keys = barSeries.map(s => s.dataKey);
  const colorByKey = Object.fromEntries(barSeries.map(s => [s.dataKey, s.color]));
  const multi = keys.length > 1;
  const mode = multi ? layout : 'overlay';
  const isLeader = barSeries[0]?.id === id;

  if (mode !== 'overlay' && !isLeader) return null;

  if (mode === 'stack') {
    return (
      <BarStack<ChartDatum, string>
        data={data}
        keys={keys}
        x={d => String(d[xKey] ?? '')}
        xScale={xScale}
        yScale={yScale}
        color={key => colorByKey[key] ?? fill}
      >
        {stacks =>
          stacks.flatMap(stack =>
            stack.bars.map(bar => (
              <motion.rect
                key={`stack-${stack.key}-${bar.index}`}
                x={bar.x}
                width={bar.width}
                fill={bar.color}
                initial={shouldAnimate ? { y: innerHeight, height: 0 } : false}
                animate={{ y: bar.y, height: bar.height }}
                transition={chartMotion.series}
              />
            )),
          )
        }
      </BarStack>
    );
  }

  if (mode === 'group') {
    const x1Scale = scaleBand<string>({
      domain: keys,
      range: [0, xScale.bandwidth()],
      padding: 0.1,
    });

    return (
      <BarGroup<ChartDatum, string>
        data={data}
        keys={keys}
        height={innerHeight}
        x0={d => String(d[xKey] ?? '')}
        x0Scale={xScale}
        x1Scale={x1Scale}
        yScale={yScale}
        color={key => colorByKey[key] ?? fill}
      >
        {groups =>
          groups.flatMap(group =>
            group.bars.map(bar => (
              <motion.rect
                key={`group-${group.index}-${bar.key}`}
                x={bar.x}
                width={bar.width}
                fill={bar.color}
                initial={shouldAnimate ? { y: innerHeight, height: 0 } : false}
                animate={{ y: bar.y, height: bar.height }}
                transition={chartMotion.series}
              />
            )),
          )
        }
      </BarGroup>
    );
  }

  const bandwidth = xScale.bandwidth();

  return (
    <g>
      {data.map(row => {
        const xVal = String(row[xKey] ?? '');
        const x = xScale(xVal) ?? 0;
        const value = Number(row[dataKey]) || 0;
        const y = yScale(value) ?? innerHeight;
        const height = Math.max(0, innerHeight - y);

        return (
          <motion.rect
            key={`${xVal}-${dataKey}`}
            x={x}
            width={bandwidth}
            fill={fill}
            initial={shouldAnimate ? { y: innerHeight, height: 0 } : false}
            animate={{ y, height }}
            transition={chartMotion.series}
          />
        );
      })}
    </g>
  );
}
