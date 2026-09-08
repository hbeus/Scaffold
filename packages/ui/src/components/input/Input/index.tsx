import { Input as BaseInput } from '@base-ui/react/input';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { INPUT_SCALE_DOWN, INPUT_SCALE_FOCUS } from '../../../constants/motion';
import { useSurface } from '../../../hooks/useSurface';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<ComponentProps<typeof BaseInput>, 'size' | 'style'>,
    BaseProps {
  size?: InputSize;
  rounded?: boolean;
}

const styles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radii.r8,
    color: colors.foregroundPrimary,
    outline: 'none',
    transition: 'border-color 0.15s',
    '::placeholder': {
      color: colors.foregroundSecondary,
    },
    ':focus': {
      outline: 'solid',
      outlineOffset: '2px',
      outlineColor: colors.focusOutline,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s16,
    fontSize: typography.bodySize,
  },
  rounded: {
    borderRadius: radii.full,
  },
});

const MotionBaseInput = motion.create(BaseInput as React.ComponentType<Record<string, unknown>>);

export function Input(props: InputProps) {
  return (
    <SurfaceLevel>
      <InputSurface {...props} />
    </SurfaceLevel>
  );
}

function InputSurface({ size = 'md', rounded = false, style, ref, ...props }: InputProps) {
  const surface = useSurface();
  const disabled = props.disabled;

  return (
    <MotionBaseInput
      data-slot='input'
      data-size={size}
      ref={ref}
      whileFocus={disabled ? undefined : { scale: INPUT_SCALE_FOCUS }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...stylex.props(
        styles.base,
        styles[size],
        rounded && styles.rounded,
        surface,
        ...styleArray(style),
      )}
      {...props}
    />
  );
}
