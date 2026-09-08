import { Form as BaseForm } from '@base-ui/react/form';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface FormProps
  extends Omit<ComponentProps<typeof BaseForm>, 'style'>,
    BaseProps {}

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s16,
  },
});

export function Form({ style, ref, ...props }: FormProps) {
  return <BaseForm data-slot="form" ref={ref} {...stylex.props(styles.base, ...styleArray(style))} {...props} />;
}
