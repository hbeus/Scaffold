import * as stylex from '@stylexjs/stylex';

import { spacing } from '../../../tokens/spacing.stylex';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types/polymorphic';
import { styleArray } from '../../../utils/styleArray';

type GridAlign = 'start' | 'center' | 'end' | 'stretch';
type GridJustify = 'start' | 'center' | 'end' | 'stretch';
type GridGap = 'none' | 's2' | 's4' | 's8' | 's12' | 's16' | 's24' | 's32' | 's40';
type GridFlow = 'row' | 'column' | 'dense';

interface GridOwnProps {
  columns?: number;
  rows?: number;
  align?: GridAlign;
  justify?: GridJustify;
  gap?: GridGap;
  flow?: GridFlow;
  inline?: boolean;
}

export type GridProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = PolymorphicProps<
  T,
  GridOwnProps
>;

const styles = stylex.create({
  grid: { display: 'grid', width: '100%' },
  inlineGrid: { display: 'inline-grid', width: '100%' },
});

const columns = stylex.create({
  1: { gridTemplateColumns: 'repeat(1, 1fr)' },
  2: { gridTemplateColumns: 'repeat(2, 1fr)' },
  3: { gridTemplateColumns: 'repeat(3, 1fr)' },
  4: { gridTemplateColumns: 'repeat(4, 1fr)' },
  5: { gridTemplateColumns: 'repeat(5, 1fr)' },
  6: { gridTemplateColumns: 'repeat(6, 1fr)' },
  7: { gridTemplateColumns: 'repeat(7, 1fr)' },
  8: { gridTemplateColumns: 'repeat(8, 1fr)' },
  9: { gridTemplateColumns: 'repeat(9, 1fr)' },
  10: { gridTemplateColumns: 'repeat(10, 1fr)' },
  11: { gridTemplateColumns: 'repeat(11, 1fr)' },
  12: { gridTemplateColumns: 'repeat(12, 1fr)' },
});

const rows = stylex.create({
  1: { gridTemplateRows: 'repeat(1, 1fr)' },
  2: { gridTemplateRows: 'repeat(2, 1fr)' },
  3: { gridTemplateRows: 'repeat(3, 1fr)' },
  4: { gridTemplateRows: 'repeat(4, 1fr)' },
  5: { gridTemplateRows: 'repeat(5, 1fr)' },
  6: { gridTemplateRows: 'repeat(6, 1fr)' },
  7: { gridTemplateRows: 'repeat(7, 1fr)' },
  8: { gridTemplateRows: 'repeat(8, 1fr)' },
  9: { gridTemplateRows: 'repeat(9, 1fr)' },
  10: { gridTemplateRows: 'repeat(10, 1fr)' },
  11: { gridTemplateRows: 'repeat(11, 1fr)' },
  12: { gridTemplateRows: 'repeat(12, 1fr)' },
});

const aligns = stylex.create({
  start: { alignItems: 'start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'end' },
  stretch: { alignItems: 'stretch' },
});

const justifies = stylex.create({
  start: { justifyItems: 'start' },
  center: { justifyItems: 'center' },
  end: { justifyItems: 'end' },
  stretch: { justifyItems: 'stretch' },
});

const gaps = stylex.create({
  none: { gap: 0 },
  s2: { gap: spacing.s2 },
  s4: { gap: spacing.s4 },
  s8: { gap: spacing.s8 },
  s12: { gap: spacing.s12 },
  s16: { gap: spacing.s16 },
  s24: { gap: spacing.s24 },
  s32: { gap: spacing.s32 },
  s40: { gap: spacing.s40 },
});

const flows = stylex.create({
  row: { gridAutoFlow: 'row' },
  column: { gridAutoFlow: 'column' },
  dense: { gridAutoFlow: 'dense' },
});

export const Grid = function Grid({
  as: Component = 'div',
  columns: cols,
  rows: rws,
  align,
  justify,
  gap = 'none',
  flow,
  inline,
  style,
  ref,
  ...props
}: GridProps) {
  return (
    <Component
      data-slot='grid'
      ref={ref}
      {...stylex.props(
        inline ? styles.inlineGrid : styles.grid,
        cols && columns[cols as keyof typeof columns],
        rws && rows[rws as keyof typeof rows],
        align && aligns[align],
        justify && justifies[justify],
        gaps[gap],
        flow && flows[flow],
        ...styleArray(style),
      )}
      {...props}
    />
  );
} as PolymorphicComponent<'div', GridOwnProps>;
