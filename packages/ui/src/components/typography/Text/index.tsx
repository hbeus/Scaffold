import * as stylex from '@stylexjs/stylex';

import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types/polymorphic';
import { styleArray } from '../../../utils/styleArray';

type TextSize = 'hero' | 'display' | 'headline' | 'title' | 'body' | 'bodySm' | 'label' | 'caption';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextColor = 'primary' | 'secondary' | 'inherit';

interface TextOwnProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  tight?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  mono?: boolean;
}

export type TextProps<T extends keyof React.JSX.IntrinsicElements = 'span'> = PolymorphicProps<
  T,
  TextOwnProps,
  'size' | 'color'
>;

const styles = stylex.create({
  base: {
    display: 'block',
  },
});

const sizes = stylex.create({
  hero: {
    fontSize: typography.heroSize,
    lineHeight: typography.heroLineHeight,
    letterSpacing: typography.heroLetterSpacing,
    textWrap: 'balance',
  },
  display: {
    fontSize: typography.displaySize,
    lineHeight: typography.displayLineHeight,
    letterSpacing: typography.displayLetterSpacing,
    textWrap: 'balance',
  },
  headline: {
    fontSize: typography.headlineSize,
    lineHeight: typography.headlineLineHeight,
    letterSpacing: typography.headlineLetterSpacing,
    textWrap: 'balance',
  },
  title: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    letterSpacing: typography.titleLetterSpacing,
    textWrap: 'balance',
  },
  body: {
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLineHeight,
    letterSpacing: typography.bodyLetterSpacing,
    textWrap: 'pretty',
  },
  bodySm: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    letterSpacing: typography.bodySmLetterSpacing,
    textWrap: 'pretty',
  },
  label: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    letterSpacing: typography.labelLetterSpacing,
  },
  caption: {
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    letterSpacing: typography.captionLetterSpacing,
  },
});

const weights = stylex.create({
  regular: { fontWeight: 400 },
  medium: { fontWeight: 500 },
  semibold: { fontWeight: 600 },
  bold: { fontWeight: 700 },
});

const modifiers = stylex.create({
  tight: { lineHeight: 1 },
  uppercase: { textTransform: 'uppercase' },
  capitalize: { textTransform: 'capitalize' },
  mono: { fontFamily: typography.fontMono },
});

const textColors = stylex.create({
  primary: { color: colors.foregroundPrimary },
  secondary: { color: colors.foregroundSecondary },
  inherit: { color: 'inherit' },
});

export const Text = function Text({
  as: Component = 'span',
  size = 'body',
  weight = 'medium',
  color = 'primary',
  tight,
  uppercase,
  capitalize,
  mono,
  style,
  ref,
  ...props
}: TextProps) {
  return (
    <Component
      data-slot="text"
      data-size={size}
      ref={ref}
      {...stylex.props(
        styles.base,
        sizes[size],
        weights[weight],
        textColors[color],
        tight && modifiers.tight,
        uppercase && modifiers.uppercase,
        capitalize && modifiers.capitalize,
        mono && modifiers.mono,
        ...styleArray(style),
      )}
      {...props}
    />
  );
} as PolymorphicComponent<'span', TextOwnProps, 'size' | 'color'>;
