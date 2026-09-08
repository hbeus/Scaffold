import { Switch as BaseSwitch } from '@base-ui/react/switch';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type SwitchSize = 'sm' | 'md';

export interface SwitchProps
  extends Omit<ComponentProps<typeof BaseSwitch.Root>, 'style'>,
    BaseProps {
  size?: SwitchSize;
}

const THUMB_TRANSITION = {
  type: 'spring',
  visualDuration: 0.2,
  bounce: 0.2,
} as const;

const rootStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: radii.full,
    cursor: 'pointer',
    borderWidth: 0,
    outline: 'none',
    padding: size.s2,
    backgroundColor: colors.lighten12,
    transition: 'background-color 0.2s',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  checked: {
    justifyContent: 'flex-end',
    backgroundColor: colors.foregroundPrimary,
  },
  sm: {
    width: '2.25rem',
    height: '1.25rem',
  },
  md: {
    width: '2.75rem',
    height: '1.5rem',
  },
});

const thumbStyles = stylex.create({
  base: {
    display: 'block',
    flexShrink: 0,
    borderRadius: radii.full,
    backgroundColor: colors.background,
  },
  sm: {
    width: '0.875rem',
    height: '0.875rem',
  },
  smPressed: {
    width: '1.125rem',
  },
  md: {
    width: '1.125rem',
    height: '1.125rem',
  },
  mdPressed: {
    width: '1.375rem',
  },
});

export function Switch({
  size = 'md',
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  style,
  ref,
  disabled,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [pressed, setPressed] = useState(false);
  const checked = checkedProp ?? internalChecked;

  return (
    <BaseSwitch.Root
      data-slot="switch"
      data-size={size}
      ref={ref}
      checked={checked}
      disabled={disabled}
      onCheckedChange={(value, event) => {
        setInternalChecked(value);
        onCheckedChange?.(value, event);
      }}
      render={
        <motion.span
          onTapStart={() => {
            if (!disabled) setPressed(true);
          }}
          onTap={() => setPressed(false)}
          onTapCancel={() => setPressed(false)}
        />
      }
      {...stylex.props(
        rootStyles.base,
        rootStyles[size],
        checked && rootStyles.checked,
        ...styleArray(style),
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        render={
          <motion.span
            layout
            transition={THUMB_TRANSITION}
            {...stylex.props(
              thumbStyles.base,
              thumbStyles[size],
              pressed && (size === 'sm' ? thumbStyles.smPressed : thumbStyles.mdPressed),
            )}
          />
        }
      />
    </BaseSwitch.Root>
  );
}
