import { Field as BaseField } from '@base-ui/react/field';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface FieldRootProps
  extends Omit<ComponentProps<typeof BaseField.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
  },
});

function Root({ style, ref, ...props }: FieldRootProps) {
  return (
    <BaseField.Root data-slot="field" ref={ref} {...stylex.props(rootStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- Label ---------- */
export interface FieldLabelProps
  extends Omit<ComponentProps<typeof BaseField.Label>, 'style'>,
    BaseProps {}

const labelStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundPrimary,
  },
});

function Label({ style, ref, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      data-slot="field-label"
      ref={ref}
      {...stylex.props(labelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface FieldDescriptionProps
  extends Omit<ComponentProps<typeof BaseField.Description>, 'style'>,
    BaseProps {}

const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.foregroundSecondary,
  },
});

function Description({ style, ref, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      data-slot="field-description"
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Error ---------- */
export interface FieldErrorProps
  extends Omit<ComponentProps<typeof BaseField.Error>, 'style'>,
    BaseProps {}

const errorStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.stateNegative,
  },
});

function FieldError({ style, ref, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error
      data-slot="field-error"
      ref={ref}
      {...stylex.props(errorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Control ---------- */
function Control(props: ComponentProps<typeof BaseField.Control>) {
  return <BaseField.Control data-slot="field-control" {...props} />;
}

/* ---------- Validity ---------- */
function Validity(props: ComponentProps<typeof BaseField.Validity>) {
  return <BaseField.Validity {...props} />;
}

/* ---------- Export ---------- */
export const Field = {
  Root,
  Label,
  Description,
  Error: FieldError,
  Control,
  Validity,
};
