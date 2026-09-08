import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type RadioSize = 'sm' | 'md';

/* ---------- Group ---------- */
export interface RadioGroupProps
  extends Omit<ComponentProps<typeof BaseRadioGroup>, 'style'>,
    BaseProps {}

const groupStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
});

function Group({ style, ref, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      ref={ref}
      {...stylex.props(groupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Item ---------- */
export interface RadioItemProps
  extends Omit<ComponentProps<typeof BaseRadio.Root>, 'style'>,
    BaseProps {
  size?: RadioSize;
}

const itemStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: size.s2,
    borderStyle: 'solid',
    borderColor: colors.foregroundSecondary,
    borderRadius: radii.full,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.15s',
    flexShrink: 0,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  sm: {
    width: spacing.s16,
    height: spacing.s16,
  },
  md: {
    width: spacing.s20,
    height: spacing.s20,
  },
});

function Item({ size = 'md', style, ref, ...props }: RadioItemProps) {
  return (
    <BaseRadio.Root
      data-slot="radio-item"
      data-size={size}
      ref={ref}
      {...stylex.props(itemStyles.base, itemStyles[size], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Indicator ---------- */
export interface RadioIndicatorProps
  extends Omit<ComponentProps<typeof BaseRadio.Indicator>, 'style'>,
    BaseProps {}

const indicatorStyles = stylex.create({
  base: {
    display: 'block',
    borderRadius: radii.full,
    backgroundColor: colors.foregroundPrimary,
    width: spacing.s10,
    height: spacing.s10,
  },
});

function Indicator({ style, ref, ...props }: RadioIndicatorProps) {
  return (
    <BaseRadio.Indicator
      data-slot="radio-indicator"
      ref={ref}
      render={
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      }
      {...stylex.props(indicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Radio = {
  Group,
  Item,
  Indicator,
};
