import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface CheckboxGroupProps
  extends Omit<ComponentProps<typeof BaseCheckboxGroup>, 'style'>,
    BaseProps {}

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
});

export function CheckboxGroup({ style, ref, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup data-slot="checkbox-group" ref={ref} {...stylex.props(styles.base, ...styleArray(style))} {...props} />
  );
}
