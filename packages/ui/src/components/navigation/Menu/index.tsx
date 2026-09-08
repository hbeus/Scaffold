import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
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
export interface MenuRootProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    position: 'relative',
  },
});

function Root({ style, ref, ...props }: MenuRootProps) {
  return (
    <BaseNavigationMenu.Root
      data-slot='menu'
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- List ---------- */
export interface MenuListProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.List>, 'style'>,
    BaseProps {}

const listStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
});

function List({ style, ref, ...props }: MenuListProps) {
  return (
    <BaseNavigationMenu.List
      data-slot='menu-list'
      ref={ref}
      {...stylex.props(listStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Item ---------- */
function Item(props: ComponentProps<typeof BaseNavigationMenu.Item>) {
  return <BaseNavigationMenu.Item data-slot='menu-item' {...props} />;
}

/* ---------- Trigger ---------- */
export interface MenuTriggerProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.Trigger>, 'style'>,
    BaseProps {}

const triggerStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    fontSize: typography.bodySmSize,
    fontWeight: 500,
    color: colors.foregroundSecondary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: radii.r8,
    cursor: 'pointer',
    outline: 'none',
    transition: 'color 0.15s, background-color 0.15s',
    ':hover': {
      color: colors.foregroundPrimary,
      backgroundColor: colors.lighten4,
    },
  },
});

function Trigger({ style, ref, ...props }: MenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      data-slot='menu-trigger'
      ref={ref}
      {...stylex.props(triggerStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Link ---------- */
export interface MenuLinkProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.Link>, 'style'>,
    BaseProps {}

function Link({ style, ref, ...props }: MenuLinkProps) {
  return (
    <BaseNavigationMenu.Link
      data-slot='menu-link'
      ref={ref}
      {...stylex.props(triggerStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseNavigationMenu.Portal>) {
  return <BaseNavigationMenu.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentProps<typeof BaseNavigationMenu.Positioner>) {
  return <BaseNavigationMenu.Positioner data-slot='menu-positioner' {...props} />;
}

/* ---------- Popup ---------- */
export interface MenuPopupProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.Popup>, 'style'>,
    BaseProps {}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s16,
    boxShadow: colors.shadowElevated,
    outline: 'none',
  },
});

function Popup({ style, ref, ...props }: MenuPopupProps) {
  return (
    <BaseNavigationMenu.Popup
      data-slot='menu-popup'
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        />
      }
      {...stylex.props(popupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
export interface MenuContentProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.Content>, 'style'>,
    BaseProps {}

function Content({ style, ref, ...props }: MenuContentProps) {
  return <BaseNavigationMenu.Content data-slot='menu-content' ref={ref} {...props} />;
}

/* ---------- Viewport ---------- */
function Viewport(props: ComponentProps<typeof BaseNavigationMenu.Viewport>) {
  return <BaseNavigationMenu.Viewport data-slot='menu-viewport' {...props} />;
}

/* ---------- Icon ---------- */
function Icon(props: ComponentProps<typeof BaseNavigationMenu.Icon>) {
  return <BaseNavigationMenu.Icon data-slot='menu-icon' {...props} />;
}

/* ---------- Arrow ---------- */
export interface MenuArrowProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.Arrow>, 'style'>,
    BaseProps {}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: MenuArrowProps) {
  return (
    <BaseNavigationMenu.Arrow
      data-slot='menu-arrow'
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Backdrop ---------- */
export interface MenuBackdropProps
  extends Omit<ComponentProps<typeof BaseNavigationMenu.Backdrop>, 'style'>,
    BaseProps {}

const backdropStyles = stylex.create({
  base: {
    position: 'fixed',
    inset: 0,
    backgroundColor: colors.darken50,
    zIndex: 50,
  },
});

function Backdrop({ style, ref, ...props }: MenuBackdropProps) {
  return (
    <BaseNavigationMenu.Backdrop
      data-slot='menu-backdrop'
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

/* ---------- Export ---------- */
export const Menu = {
  Root,
  List,
  Item,
  Trigger,
  Link,
  Portal,
  Positioner,
  Popup,
  Content,
  Viewport,
  Icon,
  Arrow,
  Backdrop,
};
