import * as stylex from '@stylexjs/stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import { useDonut } from './context';

export type DonutLabelProps = {
  children?: string;
};

const styles = stylex.create({
  label: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: colors.foregroundPrimary,
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    fontWeight: 600,
  },
});

export function Label({ children }: DonutLabelProps) {
  const { data, valueKey } = useDonut();
  const total = data.reduce((sum, row) => sum + (Number(row[valueKey]) || 0), 0);
  const text = children ?? String(total);

  return <div {...stylex.props(styles.label)}>{text}</div>;
}
