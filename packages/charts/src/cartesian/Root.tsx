import * as stylex from '@stylexjs/stylex';
import { localPoint } from '@visx/event';
import { useParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { DEFAULT_MARGIN, type CartesianLayout, type ChartDatum, type Margin } from '../types';
import { AccessibleFrame } from './AccessibleFrame';
import { CartesianProvider, useCartesian } from './context';
import { CartesianScalesProvider } from './scales';

export type CartesianChartRootProps = {
  data: ChartDatum[];
  x: string;
  children: ReactNode;
  height?: number;
  margin?: Partial<Margin>;
  animate?: boolean;
  layout?: CartesianLayout;
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

function ChartSvg({ children }: { children: ReactNode }) {
  const {
    data,
    width,
    height,
    margin,
    innerWidth,
    innerHeight,
    xValues,
    yMax,
    setActiveIndex,
  } = useCartesian();

  const xScale = scaleBand<string>({
    domain: xValues,
    range: [0, innerWidth],
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    domain: [0, yMax * 1.05],
    range: [innerHeight, 0],
    nice: true,
  });

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) return;
    const x = point.x - margin.left;
    if (x < 0 || x > innerWidth) {
      setActiveIndex(null);
      return;
    }
    const step = innerWidth / Math.max(data.length, 1);
    const index = Math.min(data.length - 1, Math.max(0, Math.floor(x / step)));
    setActiveIndex(index);
  };

  return (
    <svg
      width={width}
      height={height}
      onPointerMove={onMove}
      onPointerLeave={() => setActiveIndex(null)}
      aria-hidden='true'
      focusable='false'
      style={{ display: 'block', maxWidth: '100%' }}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        <CartesianScalesProvider xScale={xScale} yScale={yScale}>
          {children}
        </CartesianScalesProvider>
      </g>
    </svg>
  );
}

export function Root({
  data,
  x,
  children,
  height = 280,
  margin: marginProp,
  animate = true,
  layout = 'overlay',
  label,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  keyboard = true,
  style,
  className,
}: CartesianChartRootProps) {
  const margin: Margin = { ...DEFAULT_MARGIN, ...marginProp };
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
        <CartesianProvider
          data={data}
          xKey={x}
          width={width}
          height={height}
          margin={margin}
          animate={animate}
          layout={layout}
          hostRef={hostRef}
        >
          <AccessibleFrame
            label={label}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            keyboard={keyboard}
          >
            <ChartSvg>{children}</ChartSvg>
          </AccessibleFrame>
        </CartesianProvider>
      ) : null}
    </div>
  );
}
