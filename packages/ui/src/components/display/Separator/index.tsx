import { Separator as BaseSeparator } from '@base-ui/react/separator';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface SeparatorProps
  extends Omit<ComponentProps<typeof BaseSeparator>, 'style'>,
    BaseProps {}

const styles = stylex.create({
  base: {
    borderWidth: 0,
    backgroundColor: colors.border,
  },
  horizontal: {
    height: borders.default,
    width: '100%',
    marginBlock: spacing.s8,
  },
  vertical: {
    width: borders.default,
    height: '100%',
    marginInline: spacing.s8,
  },
});

export function Separator({ style, ref, ...props }: SeparatorProps) {
  const orientation = props.orientation ?? 'horizontal';
  return (
    <BaseSeparator
      data-slot="separator"
      ref={ref}
      {...stylex.props(styles.base, styles[orientation], ...styleArray(style))}
      {...props}
    />
  );
}
