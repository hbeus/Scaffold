import { Arc } from './Arc';
import { Label } from './Label';
import { Root } from './Root';
import { Tooltip } from './Tooltip';

export const DonutChart = {
  Root,
  Arc,
  Tooltip,
  Label,
};

export type { DonutChartRootProps } from './Root';
export type { DonutArcProps } from './Arc';
export type { DonutLabelProps } from './Label';
export type { DonutTooltipProps, DonutTooltipContext } from './Tooltip';
