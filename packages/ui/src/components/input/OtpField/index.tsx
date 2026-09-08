import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
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

/* ---------- Root ---------- */
export interface OtpFieldRootProps
  extends Omit<ComponentProps<typeof BaseOTPField.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
  },
});

function Root({ style, ref, ...props }: OtpFieldRootProps) {
  return (
    <BaseOTPField.Root
      data-slot="otp-field"
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Input ---------- */
export interface OtpFieldInputProps
  extends Omit<ComponentProps<typeof BaseOTPField.Input>, 'style'>,
    BaseProps {}

const inputStyles = stylex.create({
  base: {
    width: elementSize.md,
    height: elementSize.md,
    textAlign: 'center',
    fontSize: typography.bodySize,
    fontWeight: 500,
    color: colors.foregroundPrimary,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r8,
    outline: 'none',
    transition: 'border-color 0.15s',
    ':focus': {
      borderColor: colors.highlight,
    },
  },
});

function Input(props: OtpFieldInputProps) {
  return (
    <SurfaceLevel>
      <InputSurface {...props} />
    </SurfaceLevel>
  );
}

function InputSurface({ style, ref, ...props }: OtpFieldInputProps) {
  const surface = useSurface();

  return (
    <BaseOTPField.Input
      data-slot='otp-field-input'
      ref={ref}
      {...stylex.props(inputStyles.base, surface, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface OtpFieldSeparatorProps
  extends Omit<ComponentProps<typeof BaseSeparator>, 'style'>,
    BaseProps {}

const separatorStyles = stylex.create({
  base: {
    width: spacing.s8,
    height: borders.default,
    backgroundColor: colors.border,
  },
});

function OtpSeparator({ style, ref, ...props }: OtpFieldSeparatorProps) {
  return (
    <BaseSeparator
      data-slot="otp-field-separator"
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const OtpField = {
  Root,
  Input,
  Separator: OtpSeparator,
};
