import { Slider as BaseSlider } from '@base-ui/react/slider';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface SliderRootProps
  extends Omit<ComponentProps<typeof BaseSlider.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    width: '100%',
  },
});

function Root({ style, ref, ...props }: SliderRootProps) {
  return (
    <BaseSlider.Root
      data-slot="slider"
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Label ---------- */
export interface SliderLabelProps
  extends Omit<ComponentProps<typeof BaseSlider.Label>, 'style'>,
    BaseProps {}

const labelStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundPrimary,
  },
});

function Label({ style, ref, ...props }: SliderLabelProps) {
  return (
    <BaseSlider.Label
      data-slot="slider-label"
      ref={ref}
      {...stylex.props(labelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Value ---------- */
export interface SliderValueProps
  extends Omit<ComponentProps<typeof BaseSlider.Value>, 'style'>,
    BaseProps {}

const valueStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    color: colors.foregroundSecondary,
  },
});

function Value({ style, ref, ...props }: SliderValueProps) {
  return (
    <BaseSlider.Value
      data-slot="slider-value"
      ref={ref}
      {...stylex.props(valueStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Control ---------- */
export interface SliderControlProps
  extends Omit<ComponentProps<typeof BaseSlider.Control>, 'style'>,
    BaseProps {}

const controlStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: spacing.s20,
    cursor: 'pointer',
  },
});

function Control({ style, ref, ...props }: SliderControlProps) {
  return (
    <BaseSlider.Control
      data-slot="slider-control"
      ref={ref}
      {...stylex.props(controlStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Track ---------- */
export interface SliderTrackProps
  extends Omit<ComponentProps<typeof BaseSlider.Track>, 'style'>,
    BaseProps {}

const trackStyles = stylex.create({
  base: {
    position: 'relative',
    width: '100%',
    height: size.s4,
    borderRadius: radii.full,
    backgroundColor: colors.lighten12,
  },
});

function Track({ style, ref, ...props }: SliderTrackProps) {
  return (
    <BaseSlider.Track
      data-slot="slider-track"
      ref={ref}
      {...stylex.props(trackStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Indicator ---------- */
export interface SliderIndicatorProps
  extends Omit<ComponentProps<typeof BaseSlider.Indicator>, 'style'>,
    BaseProps {}

const indicatorStyles = stylex.create({
  base: {
    position: 'absolute',
    height: '100%',
    borderRadius: radii.full,
    backgroundColor: colors.foregroundPrimary,
  },
});

function Indicator({ style, ref, ...props }: SliderIndicatorProps) {
  return (
    <BaseSlider.Indicator
      data-slot="slider-indicator"
      ref={ref}
      {...stylex.props(indicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Thumb ---------- */
export interface SliderThumbProps
  extends Omit<ComponentProps<typeof BaseSlider.Thumb>, 'style'>,
    BaseProps {}

const thumbStyles = stylex.create({
  base: {
    width: spacing.s16,
    height: spacing.s16,
    borderRadius: radii.full,
    backgroundColor: colors.foregroundPrimary,
    outline: 'none',
    cursor: 'grab',
    ':focus-visible': {
      outlineWidth: '3px',
      outlineStyle: 'solid',
      outlineColor: colors.focusOutline,
      outlineOffset: size.s2,
    },
    ':active': {
      cursor: 'grabbing',
    },
  },
});

function Thumb({ style, ref, ...props }: SliderThumbProps) {
  return (
    <BaseSlider.Thumb
      data-slot="slider-thumb"
      ref={ref}
      {...stylex.props(thumbStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Slider = {
  Root,
  Label,
  Value,
  Control,
  Track,
  Indicator,
  Thumb,
};
