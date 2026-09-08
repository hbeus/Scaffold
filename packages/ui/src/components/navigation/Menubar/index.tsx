import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface MenubarProps
  extends Omit<ComponentProps<typeof BaseMenubar>, 'style'>,
    BaseProps {}

const styles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    padding: spacing.s4,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    backgroundColor: colors.surface300,
  },
});

export function Menubar({ style, ref, ...props }: MenubarProps) {
  return <BaseMenubar data-slot="menubar" ref={ref} {...stylex.props(styles.base, ...styleArray(style))} {...props} />;
}
