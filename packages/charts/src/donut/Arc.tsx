import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { motion, useReducedMotion } from 'motion/react';
import { dataColorAt } from '../dataColors';
import { chartMotion } from '../motion';
import type { ChartDatum } from '../types';
import { useDonut } from './context';

export type DonutArcProps = {
  color?: (datum: ChartDatum, index: number) => string;
};

export function Arc({ color }: DonutArcProps) {
  const {
    data,
    valueKey,
    categoryKey,
    width,
    height,
    animate,
    innerRadiusRatio,
    setActiveIndex,
  } = useDonut();
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  const size = Math.min(width, height);
  const radius = size / 2 - 8;
  const innerRadius = radius * innerRadiusRatio;

  return (
    <svg width={width} height={height} aria-hidden='true' focusable='false'>
      <Group top={height / 2} left={width / 2}>
        <Pie<ChartDatum>
          data={data}
          pieValue={d => Number(d[valueKey]) || 0}
          outerRadius={radius}
          innerRadius={innerRadius}
          padAngle={0.02}
        >
          {pie =>
            pie.arcs.map((arc, i) => {
              const path = pie.path(arc) || '';
              const fill = color?.(arc.data, i) ?? dataColorAt(i);
              return (
                <motion.path
                  key={String(arc.data[categoryKey] ?? i)}
                  d={path}
                  fill={fill}
                  initial={shouldAnimate ? { opacity: 0, scale: 0.92 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...chartMotion.series, delay: i * 0.03 }}
                  style={{ transformOrigin: '0px 0px' }}
                  onPointerEnter={() => setActiveIndex(i)}
                  onPointerLeave={() => setActiveIndex(null)}
                />
              );
            })
          }
        </Pie>
      </Group>
    </svg>
  );
}
