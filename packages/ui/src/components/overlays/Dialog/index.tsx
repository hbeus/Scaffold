import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type DialogSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" ref={ref} {...props} />;
}

/* ---------- Close ---------- */
function Close({
  ref,
  ...props
}: ComponentProps<typeof BaseDialog.Close>) {
  return <BaseDialog.Close data-slot="dialog-close" ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal keepMounted {...props} />;
}

/* ---------- Backdrop ---------- */
const backdropStyles = stylex.create({
  base: {
    position: 'fixed',
    inset: 0,
    backgroundColor: colors.darken50,
    zIndex: 50,
  },
});

export interface DialogBackdropProps
  extends Omit<ComponentProps<typeof BaseDialog.Backdrop>, 'style'>,
    BaseProps {}

function Backdrop({ style, ref, ...props }: DialogBackdropProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-backdrop"
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      }
      {...stylex.props(backdropStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
const contentStyles = stylex.create({
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 51,
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s24,
    outline: 'none',
  },
  sm: {
    width: '24rem',
    maxWidth: '90vw',
  },
  md: {
    width: '32rem',
    maxWidth: '90vw',
  },
  lg: {
    width: '48rem',
    maxWidth: '90vw',
  },
});

export interface DialogContentProps
  extends Omit<ComponentProps<typeof BaseDialog.Popup>, 'style'>,
    BaseProps {
  size?: DialogSize;
}

function Content({ size = 'md', style, ref, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Popup
      data-slot="dialog-content"
      data-size={size}
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
          transition={{ duration: 0.2 }}
        />
      }
      {...stylex.props(contentStyles.base, contentStyles[size], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Title ---------- */
const titleStyles = stylex.create({
  base: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    marginBottom: spacing.s8,
  },
});

export interface DialogTitleProps
  extends Omit<ComponentProps<typeof BaseDialog.Title>, 'style'>,
    BaseProps {}

function Title({ style, ref, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundSecondary,
  },
});

export interface DialogDescriptionProps
  extends Omit<ComponentProps<typeof BaseDialog.Description>, 'style'>,
    BaseProps {}

function Description({ style, ref, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Footer ---------- */
const footerStyles = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacing.s8,
    marginTop: spacing.s16,
  },
});

export interface DialogFooterProps
  extends Omit<ComponentProps<'div'>, 'style'>,
    BaseProps {}

function Footer({ style, ref, ...props }: DialogFooterProps) {
  return <div data-slot="dialog-footer" ref={ref} {...stylex.props(footerStyles.base, ...styleArray(style))} {...props} />;
}

/* ---------- Export ---------- */
export const Dialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Content,
  Close,
  Title,
  Description,
  Footer,
};
