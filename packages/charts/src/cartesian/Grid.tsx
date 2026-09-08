import { GridRows } from '@visx/grid';
import { colors } from '@base/ui/tokens/themes.stylex';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';

export function Grid() {
  const { innerWidth, innerHeight } = useCartesian();
  const { yScale } = useCartesianScales();

  return (
    <GridRows
      scale={yScale}
      width={innerWidth}
      height={innerHeight}
      stroke={colors.chartGrid}
      strokeWidth={1}
      pointerEvents='none'
    />
  );
}
