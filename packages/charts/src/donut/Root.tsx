import * as stylex from '@stylexjs/stylex';
import { useParentSize } from '@visx/responsive';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import type { ChartDatum } from '../types';
import { AccessibleFrame } from './AccessibleFrame';
import { DonutProvider } from './context';

export type DonutChartRootProps = {
  data: ChartDatum[];
  category: string;
  value: string;
  children: ReactNode;
  height?: number;
  animate?: boolean;
  innerRadiusRatio?: number;
  label?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  keyboard?: boolean;
  style?: CSSProperties;
  className?: string;
};

const styles = stylex.create({
  host: {
    display: 'block',
    width: '100%',
    minWidth: 0,
    justifySelf: 'stretch',
    position: 'relative',
  },
});

export function Root({
  data,
  category,
  value,
  children,
  height = 280,
  animate = true,
  innerRadiusRatio = 0.55,
  label,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  keyboard = true,
  style,
  className,
}: DonutChartRootProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { parentRef, width } = useParentSize({ debounceTime: 0, externalRef: hostRef });
  const { className: hostClassName, ...hostProps } = stylex.props(styles.host);

  return (
    <div
      ref={parentRef}
      data-chart-root=''
      {...hostProps}
      className={[hostClassName, className].filter(Boolean).join(' ')}
      style={{ height, width: '100%', ...style }}
    >
      {width > 0 ? (
        <DonutProvider
          data={data}
          categoryKey={category}
          valueKey={value}
          width={width}
          height={height}
          animate={animate}
          hostRef={hostRef}
          innerRadiusRatio={innerRadiusRatio}
        >
          <AccessibleFrame
            label={label}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            keyboard={keyboard}
          >
            {children}
          </AccessibleFrame>
        </DonutProvider>
      ) : null}
    </div>
  );
}
