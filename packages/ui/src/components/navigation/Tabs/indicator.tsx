import * as stylex from '@stylexjs/stylex';
import { motion, useReducedMotion } from 'motion/react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { type TabsSize, type TabsVariant, useTabsRootContext } from './context';

const INDICATOR_TRANSITION = { type: 'spring', bounce: 0.15, duration: 0.4 } as const;
const INDICATOR_REDUCED_MOTION = { duration: 0 } as const;

const indicatorStyles = stylex.create({
  base: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 0,
  },
  underline: {
    left: 0,
    right: 0,
    bottom: 0,
    height: borders.focus,
    backgroundColor: colors.foregroundPrimary,
  },
  button: {
    inset: 0,
    backgroundColor: colors.buttonPrimaryBg,
  },
  radiusXs: { borderRadius: radii.r8 },
  radiusSm: { borderRadius: radii.r8 },
  radiusMd: { borderRadius: radii.r10 },
  radiusLg: { borderRadius: radii.r12 },
});

const indicatorRadiusStyles = {
  xs: indicatorStyles.radiusXs,
  sm: indicatorStyles.radiusSm,
  md: indicatorStyles.radiusMd,
  lg: indicatorStyles.radiusLg,
} as const;

export function ActiveIndicator({ variant, size }: { variant: TabsVariant; size: TabsSize }) {
  const { indicatorLayoutId } = useTabsRootContext();
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      data-slot='tabs-indicator'
      layoutId={reduceMotion ? undefined : indicatorLayoutId}
      transition={reduceMotion ? INDICATOR_REDUCED_MOTION : INDICATOR_TRANSITION}
      {...stylex.props(
        indicatorStyles.base,
        variant === 'underline' ? indicatorStyles.underline : indicatorStyles.button,
        variant === 'button' && indicatorRadiusStyles[size],
      )}
    />
  );
}
