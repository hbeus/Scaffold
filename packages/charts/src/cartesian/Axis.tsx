import { AxisBottom, AxisLeft } from '@visx/axis';
import { colors } from '@base/ui/tokens/themes.stylex';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';

export type CartesianAxisProps = {
  position?: 'bottom' | 'left';
};

export function Axis({ position = 'bottom' }: CartesianAxisProps) {
  const { innerHeight } = useCartesian();
  const { xScale, yScale } = useCartesianScales();

  const shared = {
    stroke: colors.chartAxis,
    tickStroke: colors.chartAxis,
    tickLabelProps: {
      fill: colors.chartAxis,
      fontSize: 11,
      fontFamily: 'inherit',
    },
  };

  if (position === 'left') {
    return <AxisLeft scale={yScale} {...shared} />;
  }

  return <AxisBottom top={innerHeight} scale={xScale} {...shared} />;
}
