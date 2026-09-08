import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { INPUT_SCALE_DOWN } from '../../../constants/motion';
import { useSurface } from '../../../hooks/useSurface';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

type ToggleGroupSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
export interface ToggleGroupRootProps
  extends Omit<ComponentProps<typeof BaseToggleGroup>, 'style'>,
    BaseProps {
  size?: ToggleGroupSize;
}

const rootStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size.s1,
    borderRadius: radii.r10,
    backgroundColor: colors.border,
    padding: size.s1,
  },
});

function Root({ size = 'md', style, ref, ...props }: ToggleGroupRootProps) {
  return (
    <BaseToggleGroup
      data-slot='toggle-group'
      data-size={size}
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Item ---------- */
export interface ToggleGroupItemProps
  extends Omit<ComponentProps<typeof BaseToggle>, 'style'>,
    BaseProps {
  size?: ToggleGroupSize;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const itemStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    borderWidth: 0,
    backgroundColor: colors.background,
    color: colors.foregroundSecondary,
    transition: 'background-color 0.15s, color 0.15s',
    userSelect: 'none',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
  pressed: {
    color: colors.foregroundPrimary,
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
    borderRadius: radii.r8,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s24,
    fontSize: typography.bodySize,
    borderRadius: radii.r10,
  },
  children: {
    display: 'block',
    paddingInline: spacing.s4,
  },
});

const MotionToggle = motion.create(BaseToggle as React.ComponentType<Record<string, unknown>>);

function Item(props: ToggleGroupItemProps) {
  return (
    <SurfaceLevel>
      <ItemSurface {...props} />
    </SurfaceLevel>
  );
}

function ItemSurface({
  size = 'md',
  style,
  ref,
  children,
  leading,
  trailing,
  ...props
}: ToggleGroupItemProps) {
  const surface = useSurface();
  const pressed = Boolean(props.pressed);

  return (
    <MotionToggle
      data-slot='toggle-group-item'
      data-size={size}
      ref={ref}
      whileTap={props.disabled ? undefined : { scale: INPUT_SCALE_DOWN }}
      {...stylex.props(
        itemStyles.base,
        itemStyles[size],
        pressed && itemStyles.pressed,
        pressed && surface,
        ...styleArray(style),
      )}
      {...props}
    >
      {leading && leading}
      <span {...stylex.props(itemStyles.children)}>{children}</span>
      {trailing && trailing}
    </MotionToggle>
  );
}

/* ---------- Export ---------- */
export const ToggleGroup = {
  Root,
  Item,
};
