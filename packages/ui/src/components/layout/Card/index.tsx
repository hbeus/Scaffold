import * as stylex from '@stylexjs/stylex';
import type { SurfaceLevel as SurfaceLevelValue } from '../../../contexts/SurfaceContext';
import { useSurface } from '../../../hooks/useSurface';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types/polymorphic';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

type CardVariant = 'filled' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardDirection = 'row' | 'column';
type CardGap = 'none' | 's2' | 's4' | 's8' | 's12' | 's16' | 's24' | 's32' | 's40';

interface CardOwnProps {
  variant?: CardVariant;
  padding?: CardPadding;
  direction?: CardDirection;
  gap?: CardGap;
  darken?: boolean;
  level?: SurfaceLevelValue;
}

export type CardProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = PolymorphicProps<
  T,
  CardOwnProps
>;

const styles = stylex.create({
  base: {
    display: 'flex',
    borderRadius: radii.r24,
  },
});

const directions = stylex.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
});

const gaps = stylex.create({
  none: { gap: 0 },
  s2: { gap: spacing.s2 },
  s4: { gap: spacing.s4 },
  s8: { gap: spacing.s8 },
  s12: { gap: spacing.s12 },
  s16: { gap: spacing.s16 },
  s24: { gap: spacing.s24 },
  s32: { gap: spacing.s32 },
  s40: { gap: spacing.s40 },
});

const variants = stylex.create({
  filled: {
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  darken: {
    backgroundColor: colors.darken4,
    borderWidth: 0,
  },
});

const paddings = stylex.create({
  none: { padding: 0 },
  sm: { padding: spacing.s16 },
  md: { padding: spacing.s24 },
  lg: { padding: spacing.s32 },
});

export const Card = function Card({
  variant = 'filled',
  darken = false,
  level,
  ...props
}: CardProps) {
  if (variant === 'filled' && !darken) {
    return (
      <SurfaceLevel level={level}>
        <CardSurface variant={variant} darken={darken} {...props} />
      </SurfaceLevel>
    );
  }

  return <CardSurface variant={variant} darken={darken} {...props} />;
} as PolymorphicComponent<'div', CardOwnProps>;

function CardSurface({
  as: Component = 'div',
  variant = 'filled',
  padding = 'md',
  direction = 'column',
  gap = 's16',
  darken = false,
  style,
  ref,
  ...props
}: CardProps) {
  const useSurfaceFill = variant === 'filled' && !darken;
  const surface = useSurface();

  return (
    <Component
      data-slot='card'
      data-variant={variant}
      ref={ref}
      {...stylex.props(
        styles.base,
        directions[direction],
        gaps[gap],
        variants[variant],
        paddings[padding],
        useSurfaceFill && surface,
        darken && variants.darken,
        ...styleArray(style),
      )}
      {...props}
    />
  );
}
