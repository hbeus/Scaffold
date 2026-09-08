import * as stylex from '@stylexjs/stylex';
import type { ComponentType, SVGAttributes } from 'react';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  size?: string | number;
}

export interface IconProps extends BaseProps {
  icon: ComponentType<IconComponentProps>;
  size?: string | number;
  strokeWidth?: string | number;
}

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    flexShrink: 0,
  },
});

export function Icon({ icon: Component, size = 14, strokeWidth = 2, style, ...props }: IconProps) {
  return (
    <span data-slot="icon" {...stylex.props(styles.base, ...styleArray(style))}>
      <Component size={size} strokeWidth={strokeWidth} {...props} />
    </span>
  );
}
