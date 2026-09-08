import * as stylex from '@stylexjs/stylex';

import { spacing } from '../../../tokens/spacing.stylex';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types/polymorphic';
import { styleArray } from '../../../utils/styleArray';

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type FlexGap = 'none' | 's2' | 's4' | 's8' | 's12' | 's16' | 's24' | 's32' | 's40';
type FlexWrap = boolean | 'reverse';

interface FlexOwnProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: FlexGap;
  wrap?: FlexWrap;
  inline?: boolean;
  grow?: boolean;
}

export type FlexProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = PolymorphicProps<
  T,
  FlexOwnProps
>;

const styles = stylex.create({
  flex: { display: 'flex' },
  inlineFlex: { display: 'inline-flex' },
  grow: { flexGrow: 1 },
});

const directions = stylex.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' },
});

const aligns = stylex.create({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
});

const justifies = stylex.create({
  start: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' },
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

const wraps = stylex.create({
  wrap: { flexWrap: 'wrap' },
  reverse: { flexWrap: 'wrap-reverse' },
});

export const Flex = function Flex({
  as: Component = 'div',
  direction = 'row',
  align,
  justify,
  gap = 'none',
  wrap,
  inline,
  grow,
  style,
  ref,
  ...props
}: FlexProps) {
  return (
    <Component
      data-slot="flex"
      ref={ref}
      {...stylex.props(
        inline ? styles.inlineFlex : styles.flex,
        directions[direction],
        align && aligns[align],
        justify && justifies[justify],
        gaps[gap],
        wrap === true && wraps.wrap,
        wrap === 'reverse' && wraps.reverse,
        grow && styles.grow,
        ...styleArray(style),
      )}
      {...props}
    />
  );
} as PolymorphicComponent<'div', FlexOwnProps>;
