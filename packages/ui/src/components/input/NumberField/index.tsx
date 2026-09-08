import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { useSurface } from '../../../hooks/useSurface';
import { borders } from '../../../tokens/borders.stylex';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

type NumberFieldSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BaseNumberField.Root>) {
  return <BaseNumberField.Root {...props} />;
}

/* ---------- Group ---------- */
export interface NumberFieldGroupProps
  extends Omit<ComponentProps<typeof BaseNumberField.Group>, 'style'>,
    BaseProps {}

const groupStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
});

function Group({ style, ref, ...props }: NumberFieldGroupProps) {
  return (
    <BaseNumberField.Group
      data-slot="number-field-group"
      ref={ref}
      {...stylex.props(groupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Input ---------- */
export interface NumberFieldInputProps
  extends Omit<ComponentProps<typeof BaseNumberField.Input>, 'size' | 'style'>,
    BaseProps {
  size?: NumberFieldSize;
}

const inputStyles = stylex.create({
  base: {
    width: '100%',
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    color: colors.foregroundPrimary,
    outline: 'none',
    transition: 'border-color 0.15s',
    textAlign: 'left',
    '::placeholder': {
      color: colors.foregroundSecondary,
    },
    ':focus': {
      borderColor: colors.lighten16,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s8,
    fontSize: typography.labelSize,
    borderRadius: radii.r8,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s12,
    fontSize: typography.bodySmSize,
    borderRadius: radii.r10,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s16,
    fontSize: typography.bodySize,
    borderRadius: radii.r12,
  },
});

function Input(props: NumberFieldInputProps) {
  return (
    <SurfaceLevel>
      <InputSurface {...props} />
    </SurfaceLevel>
  );
}

function InputSurface({ size = 'md', style, ref, ...props }: NumberFieldInputProps) {
  const surface = useSurface();

  return (
    <BaseNumberField.Input
      data-slot='number-field-input'
      data-size={size}
      ref={ref}
      {...stylex.props(inputStyles.base, inputStyles[size], surface, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Increment ---------- */
export interface NumberFieldIncrementProps
  extends Omit<ComponentProps<typeof BaseNumberField.Increment>, 'style'>,
    BaseProps {}

const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing.s32,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: 'transparent',
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.15s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  increment: {
    borderTopRightRadius: radii.r8,
    borderBottomRightRadius: radii.r8,
    borderLeftWidth: 0,
  },
  decrement: {
    borderTopLeftRadius: radii.r8,
    borderBottomLeftRadius: radii.r8,
    borderRightWidth: 0,
  },
});

function Increment({ style, ref, ...props }: NumberFieldIncrementProps) {
  return (
    <BaseNumberField.Increment
      data-slot="number-field-increment"
      ref={ref}
      {...stylex.props(buttonStyles.base, buttonStyles.increment, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Decrement ---------- */
export interface NumberFieldDecrementProps
  extends Omit<ComponentProps<typeof BaseNumberField.Decrement>, 'style'>,
    BaseProps {}

function Decrement({ style, ref, ...props }: NumberFieldDecrementProps) {
  return (
    <BaseNumberField.Decrement
      data-slot="number-field-decrement"
      ref={ref}
      {...stylex.props(buttonStyles.base, buttonStyles.decrement, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ScrubArea ---------- */
function ScrubArea(props: ComponentProps<typeof BaseNumberField.ScrubArea>) {
  return <BaseNumberField.ScrubArea data-slot="number-field-scrub-area" {...props} />;
}

/* ---------- ScrubAreaCursor ---------- */
function ScrubAreaCursor(props: ComponentProps<typeof BaseNumberField.ScrubAreaCursor>) {
  return <BaseNumberField.ScrubAreaCursor data-slot="number-field-scrub-area-cursor" {...props} />;
}

/* ---------- Export ---------- */
export const NumberField = {
  Root,
  Group,
  Input,
  Increment,
  Decrement,
  ScrubArea,
  ScrubAreaCursor,
};
