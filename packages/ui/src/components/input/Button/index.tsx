import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { INPUT_SCALE_DOWN } from '../../../constants/motion';
import { surfaceHover, useSurface, useSurfaceLevel } from '../../../hooks/useSurface';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

type ButtonVariant = 'accent' | 'primary' | 'ghost' | 'inherit';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ComponentProps<typeof BaseButton>, 'style'>, BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  fill?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const buttonStyles = stylex.create({
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
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
  accent: {
    backgroundColor: colors.buttonAccentBg,
    color: colors.buttonAccentFg,
    ':hover': {
      backgroundColor: colors.buttonAccentHover,
    },
  },
  primary: {
    color: colors.foregroundPrimary,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.foregroundSecondary,
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  inherit: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: 'inherit',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
  },
  xs: {
    height: elementSize.xs,
    paddingInline: spacing.s8,
    fontSize: typography.labelSize,
    borderRadius: radii.r8,
  },
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
    borderRadius: radii.r8,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
    borderRadius: radii.r10,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s24,
    fontSize: typography.bodySize,
    borderRadius: radii.r12,
  },
  children: {
    display: 'block',
    paddingInline: spacing.s4,
  },
});

const shapeStyles = stylex.create({
  rounded: {
    borderRadius: radii.full,
  },
});

const fillStyles = stylex.create({
  fill: {
    width: '100%',
  },
});

const MotionBaseButton = motion.create(BaseButton as React.ComponentType<Record<string, unknown>>);

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  if (variant === 'primary') {
    return (
      <SurfaceLevel>
        <ButtonSurface variant='primary' {...props} />
      </SurfaceLevel>
    );
  }

  return <ButtonSurface variant={variant} {...props} />;
}

function ButtonSurface({
  variant = 'primary',
  size = 'md',
  rounded = false,
  fill = false,
  style,
  ref,
  children,
  leading,
  trailing,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const usesSurfaceHover = isPrimary || variant === 'ghost';
  const surface = useSurface();
  const level = useSurfaceLevel();

  return (
    <MotionBaseButton
      data-slot='button'
      data-variant={variant}
      data-size={size}
      ref={ref}
      whileTap={props.disabled ? undefined : { scale: INPUT_SCALE_DOWN }}
      {...stylex.props(
        buttonStyles.base,
        buttonStyles[variant],
        isPrimary && surface,
        usesSurfaceHover && surfaceHover[level],
        buttonStyles[size],
        rounded && shapeStyles.rounded,
        fill && fillStyles.fill,
        ...styleArray(style),
      )}
      {...props}
    >
      {leading && leading}
      <span {...stylex.props(buttonStyles.children)}>{children}</span>
      {trailing && trailing}
    </MotionBaseButton>
  );
}
