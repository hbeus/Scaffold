import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { INPUT_SCALE_DOWN, INPUT_SCALE_FOCUS } from '../../../constants/motion';
import { radii } from '../../../tokens/radii.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types/polymorphic';
import { mergeRefs } from '../../../utils/mergeRefs';
import { styleArray } from '../../../utils/styleArray';

type PressableVariant = 'filled' | 'outline' | 'ghost' | 'transparent';
type PressableInset = 's2' | 's4' | 's8' | 's12' | 's16';
type PressableRadius = 'r2' | 'r4' | 'r6' | 'r8' | 'r12' | 'r16' | 'r20' | 'r24' | 'r32' | 'full';

const FOCUSABLE_SELECTOR =
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface PressableOwnProps {
  variant?: PressableVariant;
  inset?: PressableInset;
  radius?: PressableRadius;
  disabled?: boolean;
}

export type PressableProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = PolymorphicProps<
  T,
  PressableOwnProps
>;

const styles = stylex.create({
  base: {
    display: 'block',
    position: 'relative',
    outline: 'none',
    cursor: 'pointer',
  },
  filled: {
    backgroundColor: colors.hover4,
    ':hover': {
      backgroundColor: colors.hover8,
    },
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: colors.hover4,
    },
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  disabled: {
    cursor: 'default',
    opacity: 0.4,
    pointerEvents: 'none',
  },
});

const insetStyles = stylex.create({
  s2: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -2',
      backgroundColor: colors.hover4,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
    '::after': {
      content: '',
      position: 'absolute',
      inset: '-2px -4px',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      pointerEvents: 'none',
      transition: 'border-color 0.1s',
    },
    ':focus-visible::after': { borderColor: colors.focusOutline },
  },
  s4: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -4',
      backgroundColor: colors.hover4,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
    '::after': {
      content: '',
      position: 'absolute',
      inset: '-2px -6px',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      pointerEvents: 'none',
      transition: 'border-color 0.1s',
    },
    ':focus-visible::after': { borderColor: colors.focusOutline },
  },
  s8: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -8',
      backgroundColor: colors.hover4,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
    '::after': {
      content: '',
      position: 'absolute',
      inset: '-2px -10px',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      pointerEvents: 'none',
      transition: 'border-color 0.1s',
    },
    ':focus-visible::after': { borderColor: colors.focusOutline },
  },
  s12: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -12',
      backgroundColor: colors.hover4,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
    '::after': {
      content: '',
      position: 'absolute',
      inset: '-2px -14px',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      pointerEvents: 'none',
      transition: 'border-color 0.1s',
    },
    ':focus-visible::after': { borderColor: colors.focusOutline },
  },
  s16: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -16',
      backgroundColor: colors.hover4,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
    '::after': {
      content: '',
      position: 'absolute',
      inset: '-2px -18px',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      pointerEvents: 'none',
      transition: 'border-color 0.1s',
    },
    ':focus-visible::after': { borderColor: colors.focusOutline },
  },
});

const radiusStyles = stylex.create({
  r2: { '::before': { borderRadius: radii.r2 }, '::after': { borderRadius: radii.r2 } },
  r4: { '::before': { borderRadius: radii.r4 }, '::after': { borderRadius: radii.r4 } },
  r6: { '::before': { borderRadius: radii.r6 }, '::after': { borderRadius: radii.r6 } },
  r8: { '::before': { borderRadius: radii.r8 }, '::after': { borderRadius: radii.r8 } },
  r12: { '::before': { borderRadius: radii.r12 }, '::after': { borderRadius: radii.r12 } },
  r16: { '::before': { borderRadius: radii.r16 }, '::after': { borderRadius: radii.r16 } },
  r20: { '::before': { borderRadius: radii.r20 }, '::after': { borderRadius: radii.r20 } },
  r24: { '::before': { borderRadius: radii.r24 }, '::after': { borderRadius: radii.r24 } },
  r32: { '::before': { borderRadius: radii.r32 }, '::after': { borderRadius: radii.r32 } },
  full: { '::before': { borderRadius: radii.full }, '::after': { borderRadius: radii.full } },
});

export const Pressable = function Pressable({
  as = 'div',
  ref,
  variant = 'ghost',
  inset = 's16',
  radius = 'r20',
  disabled = false,
  style,
  tabIndex = 0,
  onKeyDown,
  ...props
}: PressableProps) {
  const internalRef = useRef<HTMLElement>(null);

  const suppressChildFocus = (node: HTMLElement | null) => {
    if (!node) return;
    const focusables = node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    for (const child of focusables) {
      child.setAttribute('tabindex', '-1');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    onKeyDown?.(e as React.KeyboardEvent<HTMLDivElement>);
    if (e.defaultPrevented) return;
    if (e.key === 'Enter' || e.key === ' ') {
      const target = internalRef.current?.querySelector<HTMLElement>('a[href], button');
      if (target) {
        e.preventDefault();
        target.click();
      }
    }
  };

  const MotionElement = motion[as as keyof typeof motion] as React.ElementType;
  return (
    <MotionElement
      data-slot='pressable'
      data-variant={variant}
      ref={mergeRefs(internalRef, suppressChildFocus, ref)}
      tabIndex={disabled ? -1 : tabIndex}
      aria-disabled={disabled || undefined}
      onKeyDown={handleKeyDown}
      whileTap={disabled ? undefined : { scale: INPUT_SCALE_DOWN }}
      whileFocus={disabled ? undefined : { scale: INPUT_SCALE_FOCUS }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...stylex.props(
        styles.base,
        inset ? insetStyles[inset] : styles[variant],
        inset && radiusStyles[radius],
        disabled && styles.disabled,
        ...styleArray(style),
      )}
      {...props}
    />
  );
} as PolymorphicComponent<'div', PressableOwnProps>;
