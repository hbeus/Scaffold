import { colors } from '@base/ui/tokens/themes.stylex';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';

export function Crosshair() {
  const { activeIndex, xValues, innerHeight } = useCartesian();
  const { xScale } = useCartesianScales();

  if (activeIndex == null) return null;
  const xVal = xValues[activeIndex];
  if (xVal == null) return null;
  const x = (xScale(xVal) ?? 0) + xScale.bandwidth() / 2;

  return (
    <line
      x1={x}
      x2={x}
      y1={0}
      y2={innerHeight}
      stroke={colors.chartCrosshair}
      strokeWidth={1}
      pointerEvents='none'
    />
  );
}
