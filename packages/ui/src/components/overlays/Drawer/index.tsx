import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
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

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BaseDrawer.Root>) {
  return <BaseDrawer.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentProps<typeof BaseDrawer.Trigger>) {
  return <BaseDrawer.Trigger data-slot="drawer-trigger" ref={ref} {...props} />;
}

/* ---------- Close ---------- */
function Close({
  ref,
  ...props
}: ComponentProps<typeof BaseDrawer.Close>) {
  return <BaseDrawer.Close data-slot="drawer-close" ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseDrawer.Portal>) {
  return <BaseDrawer.Portal keepMounted {...props} />;
}

/* ---------- Backdrop ---------- */
export interface DrawerBackdropProps
  extends Omit<ComponentProps<typeof BaseDrawer.Backdrop>, 'style'>,
    BaseProps {}

const backdropStyles = stylex.create({
  base: {
    position: 'fixed',
    inset: 0,
    backgroundColor: colors.darken50,
    zIndex: 50,
  },
});

function Backdrop({ style, ref, ...props }: DrawerBackdropProps) {
  return (
    <BaseDrawer.Backdrop
      data-slot="drawer-backdrop"
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

/* ---------- Popup ---------- */
export interface DrawerPopupProps
  extends Omit<ComponentProps<typeof BaseDrawer.Popup>, 'style'>,
    BaseProps {}

const popupStyles = stylex.create({
  base: {
    position: 'fixed',
    zIndex: 51,
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    outline: 'none',
    overflowY: 'auto',
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    width: '24rem',
    maxWidth: '90vw',
    borderTopLeftRadius: radii.r12,
    borderBottomLeftRadius: radii.r12,
  },
});

function Popup({ style, ref, ...props }: DrawerPopupProps) {
  return (
    <BaseDrawer.Popup
      data-slot="drawer-popup"
      ref={ref}
      {...stylex.props(popupStyles.base, popupStyles.right, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
export interface DrawerContentProps
  extends Omit<ComponentProps<typeof BaseDrawer.Content>, 'style'>,
    BaseProps {}

const contentStyles = stylex.create({
  base: {
    padding: spacing.s24,
  },
});

function Content({ style, ref, ...props }: DrawerContentProps) {
  return (
    <BaseDrawer.Content
      data-slot="drawer-content"
      ref={ref}
      {...stylex.props(contentStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Title ---------- */
export interface DrawerTitleProps
  extends Omit<ComponentProps<typeof BaseDrawer.Title>, 'style'>,
    BaseProps {}

const titleStyles = stylex.create({
  base: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    marginBottom: spacing.s8,
  },
});

function Title({ style, ref, ...props }: DrawerTitleProps) {
  return (
    <BaseDrawer.Title
      data-slot="drawer-title"
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface DrawerDescriptionProps
  extends Omit<ComponentProps<typeof BaseDrawer.Description>, 'style'>,
    BaseProps {}

const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundSecondary,
  },
});

function Description({ style, ref, ...props }: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description
      data-slot="drawer-description"
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Drawer = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Content,
  Close,
  Title,
  Description,
};
