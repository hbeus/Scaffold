import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { INPUT_SCALE_DOWN } from '../../../constants/motion';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type ButtonVariant =
  | 'positive'
  | 'negative'
  | 'semiNegative'
  | 'semiPositive'
  | 'neutral'
  | 'highlight';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonStateProps
  extends Omit<ComponentProps<typeof BaseButton>, 'style'>,
    BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  fill?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    width: 'fit-content',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.15s, color 0.15s',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    borderWidth: 0,
    ':disabled': {
      color: colors.foregroundDisabled,
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  positive: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: colors.statePositive,
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.statePositive,
      opacity: 0.1,
    },
  },
  negative: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: colors.stateNegative,
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: colors.stateNegative,
      opacity: 0.1,
    },
  },
  semiNegative: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: colors.stateSemiNegative,
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: colors.stateSemiNegative,
      opacity: 0.1,
    },
  },
  semiPositive: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: colors.stateSemiPositive,
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: colors.stateSemiPositive,
      opacity: 0.1,
    },
  },
  neutral: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: colors.stateNeutral,
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: colors.stateNeutral,
      opacity: 0.1,
    },
  },
  highlight: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: colors.stateHighlight,
    '::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: colors.stateHighlight,
      opacity: 0.1,
    },
  },
  xs: {
    height: elementSize.xs,
    paddingInline: spacing.s8,
    fontSize: typography.labelSize,
    '::before': {
      borderRadius: radii.r8,
    },
  },
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s10,
    fontSize: typography.bodySmSize,
    '::before': {
      borderRadius: radii.r10,
    },
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s10,
    fontSize: typography.bodySmSize,
    '::before': {
      borderRadius: radii.r12,
    },
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s14,
    fontSize: typography.bodySize,
    '::before': {
      borderRadius: radii.r14,
    },
  },
  children: {
    display: 'block',
    paddingInline: spacing.s4,
  },
});

const shapeStyles = stylex.create({
  rounded: {
    borderRadius: radii.full,
    '::before': {
      borderRadius: radii.full,
    },
  },
});

const fillStyles = stylex.create({
  fill: {
    width: '100%',
  },
});

const MotionBaseButton = motion.create(BaseButton as React.ComponentType<Record<string, unknown>>);

export function ButtonState({
  variant = 'negative',
  size = 'md',
  rounded = false,
  fill = false,
  style,
  ref,
  children,
  leading,
  trailing,
  ...props
}: ButtonStateProps) {
  return (
    <MotionBaseButton
      data-slot="button-state"
      data-variant={variant}
      data-size={size}
      ref={ref}
      whileTap={props.disabled ? undefined : { scale: INPUT_SCALE_DOWN }}
      {...stylex.props(
        styles.base,
        styles[variant],
        styles[size],
        rounded && shapeStyles.rounded,
        fill && fillStyles.fill,
        ...styleArray(style),
      )}
      {...props}
    >
      {leading && leading}
      <span {...stylex.props(styles.children)}>{children}</span>
      {trailing && trailing}
    </MotionBaseButton>
  );
}
