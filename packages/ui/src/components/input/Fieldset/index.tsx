import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface FieldsetRootProps
  extends Omit<ComponentProps<typeof BaseFieldset.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s12,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
});

function Root({ style, ref, ...props }: FieldsetRootProps) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Legend ---------- */
export interface FieldsetLegendProps
  extends Omit<ComponentProps<typeof BaseFieldset.Legend>, 'style'>,
    BaseProps {}

const legendStyles = stylex.create({
  base: {
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    padding: 0,
  },
});

function Legend({ style, ref, ...props }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      data-slot="fieldset-legend"
      ref={ref}
      {...stylex.props(legendStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Fieldset = {
  Root,
  Legend,
};
