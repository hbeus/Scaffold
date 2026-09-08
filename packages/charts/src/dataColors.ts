import { colors } from '@base/ui/tokens/themes.stylex';
import './paint.stylex';

export const DATA_COLORS = [
  colors.data1,
  colors.data2,
  colors.data3,
  colors.data4,
  colors.data5,
  colors.data6,
  colors.data7,
  colors.data8,
] as const;

export function dataColorAt(index: number): string {
  return DATA_COLORS[((index % DATA_COLORS.length) + DATA_COLORS.length) % DATA_COLORS.length]!;
}
