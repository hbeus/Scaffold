import { Meter as BaseMeter } from '@base-ui/react/meter';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface MeterRootProps
  extends Omit<ComponentProps<typeof BaseMeter.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: size.s6,
  },
});

function Root({ style, ref, ...props }: MeterRootProps) {
  return (
    <BaseMeter.Root data-slot="meter" ref={ref} {...stylex.props(rootStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- Track ---------- */
export interface MeterTrackProps
  extends Omit<ComponentProps<typeof BaseMeter.Track>, 'style'>,
    BaseProps {}

const trackStyles = stylex.create({
  base: {
    position: 'relative',
    height: size.s8,
    borderRadius: radii.full,
    backgroundColor: colors.lighten8,
    overflow: 'hidden',
  },
});

function Track({ style, ref, ...props }: MeterTrackProps) {
  return (
    <BaseMeter.Track
      data-slot="meter-track"
      ref={ref}
      {...stylex.props(trackStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Indicator ---------- */
export interface MeterIndicatorProps
  extends Omit<ComponentProps<typeof BaseMeter.Indicator>, 'style'>,
    BaseProps {}

const indicatorStyles = stylex.create({
  base: {
    height: '100%',
    borderRadius: radii.full,
    backgroundColor: colors.highlight,
    transition: 'width 0.3s ease',
  },
});

function Indicator({ style, ref, ...props }: MeterIndicatorProps) {
  return (
    <BaseMeter.Indicator
      data-slot="meter-indicator"
      ref={ref}
      {...stylex.props(indicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Label ---------- */
export interface MeterLabelProps
  extends Omit<ComponentProps<typeof BaseMeter.Label>, 'style'>,
    BaseProps {}

const labelStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundPrimary,
  },
});

function Label({ style, ref, ...props }: MeterLabelProps) {
  return (
    <BaseMeter.Label
      data-slot="meter-label"
      ref={ref}
      {...stylex.props(labelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Value ---------- */
export interface MeterValueProps
  extends Omit<ComponentProps<typeof BaseMeter.Value>, 'style'>,
    BaseProps {}

const valueStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.foregroundSecondary,
  },
});

function Value({ style, ref, ...props }: MeterValueProps) {
  return (
    <BaseMeter.Value
      data-slot="meter-value"
      ref={ref}
      {...stylex.props(valueStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Meter = {
  Root,
  Track,
  Indicator,
  Label,
  Value,
};
