import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import * as stylex from '@stylexjs/stylex';
import { motion, useMotionValue } from 'motion/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { INPUT_SCALE_DOWN } from '../../../constants/motion';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type CheckboxSize = 'sm' | 'md';

/* ---------- Root ---------- */
export interface CheckboxRootProps
  extends Omit<ComponentProps<typeof BaseCheckbox.Root>, 'style'>,
    BaseProps {
  size?: CheckboxSize;
}

const rootStyles = stylex.create({
  checkIcon: {
    stroke: colors.foregroundPrimaryInverse,
  },
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: size.s2,
    borderStyle: 'solid',
    borderColor: colors.foregroundSecondary,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.15s, border-color 0.15s',
    flexShrink: 0,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  checked: {
    backgroundColor: colors.foregroundPrimary,
    borderColor: colors.foregroundPrimary,
  },
  sm: {
    width: spacing.s16,
    height: spacing.s16,
    borderRadius: radii.r4,
  },
  md: {
    width: spacing.s20,
    height: spacing.s20,
    borderRadius: radii.r4,
  },
});

export function Checkbox({
  size = 'md',
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  style,
  ref,
  ...props
}: CheckboxRootProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const pathLength = useMotionValue(isChecked ? 1 : 0);

  return (
    <BaseCheckbox.Root
      data-slot='checkbox'
      data-size={size}
      ref={ref}
      checked={isChecked}
      onCheckedChange={checked => {
        setIsChecked(checked);
      }}
      render={
        <motion.div
          transition={{ duration: 0.15, ease: 'easeOut' }}
          whileTap={{ scale: INPUT_SCALE_DOWN }}
          {...stylex.props(
            rootStyles.base,
            rootStyles[size],
            isChecked && rootStyles.checked,
            ...styleArray(style),
          )}
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
            <motion.path
              animate={{
                pathLength: isChecked ? 1 : 0,
                opacity: isChecked ? 1 : 0,
                scale: isChecked ? 1 : 0.5,
                filter: isChecked ? 'blur(0px)' : 'blur(2px)',
              }}
              transition={{
                duration: isChecked ? 0.15 : 0.1,
                delay: isChecked ? 0.05 : 0,
                ease: 'easeOut',
              }}
              d='M2.5 6L5 8.5L9.5 4'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              style={{ pathLength }}
              {...stylex.props(rootStyles.checkIcon)}
            />
          </svg>
        </motion.div>
      }
      {...props}
    />
  );
}
