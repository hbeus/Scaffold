import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import * as stylex from '@stylexjs/stylex';
import type React from 'react';
import type { ComponentProps } from 'react';
import { useSurface } from '../../../hooks/useSurface';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

export interface ToggleProps
  extends Omit<ComponentProps<typeof BaseToggle>, 'style'>,
    BaseProps {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s4,
    borderRadius: radii.r8,
    color: colors.foregroundSecondary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.1s, color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
      color: colors.foregroundPrimary,
    },
    ':disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
  pressed: {
    color: colors.foregroundPrimary,
  },
  children: {
    display: 'block',
    paddingInline: spacing.s4,
  },
});

export function Toggle(props: ToggleProps) {
  return (
    <SurfaceLevel>
      <ToggleSurface {...props} />
    </SurfaceLevel>
  );
}

function ToggleSurface({ style, ref, children, leading, trailing, ...props }: ToggleProps) {
  const surface = useSurface();
  const pressed = Boolean(props.pressed);

  return (
    <BaseToggle
      data-slot='toggle'
      ref={ref}
      {...stylex.props(
        styles.base,
        pressed && styles.pressed,
        pressed && surface,
        ...styleArray(style),
      )}
      {...props}
    >
      {leading && leading}
      <span {...stylex.props(styles.children)}>{children}</span>
      {trailing && trailing}
    </BaseToggle>
  );
}
