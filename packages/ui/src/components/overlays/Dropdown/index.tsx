import { Menu as BaseMenu } from '@base-ui/react/menu';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { useSurface } from '../../../hooks/useSurface';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import { zIndex } from '../../../tokens/zIndex.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({ ref, ...props }: ComponentProps<typeof BaseMenu.Trigger>) {
  return <BaseMenu.Trigger data-slot='dropdown-trigger' ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseMenu.Portal>) {
  return <BaseMenu.Portal {...props} />;
}

/* ---------- Positioner ---------- */
export interface DropdownPositionerProps
  extends Omit<ComponentProps<typeof BaseMenu.Positioner>, 'style'>,
    BaseProps {}

const positionerStyles = stylex.create({
  base: {
    zIndex: zIndex.dropdown,
  },
});

function Positioner({ style, ref, ...props }: DropdownPositionerProps) {
  return (
    <BaseMenu.Positioner
      data-slot='dropdown-positioner'
      ref={ref}
      {...stylex.props(positionerStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Popup ---------- */
export interface DropdownPopupProps
  extends Omit<ComponentProps<typeof BaseMenu.Popup>, 'style'>,
    BaseProps {}

const popupStyles = stylex.create({
  base: {
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s4,
    outline: 'none',
    boxShadow: colors.shadowElevated,
    minWidth: '12rem',
  },
});

function Popup({ style, ref, ...props }: DropdownPopupProps) {
  return (
    <SurfaceLevel level={300}>
      <PopupSurface style={style} ref={ref} {...props} />
    </SurfaceLevel>
  );
}

function PopupSurface({ style, ref, ...props }: DropdownPopupProps) {
  const surface = useSurface();

  return (
    <BaseMenu.Popup
      data-slot='dropdown-popup'
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        />
      }
      {...stylex.props(popupStyles.base, surface, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Item ---------- */
export interface DropdownItemProps
  extends Omit<ComponentProps<typeof BaseMenu.Item>, 'style'>,
    BaseProps {}

const itemStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    borderRadius: radii.r8,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    transition: 'background-color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':focus-visible': {
      backgroundColor: colors.lighten4,
    },
  },
});

function Item({ style, ref, ...props }: DropdownItemProps) {
  return (
    <BaseMenu.Item
      data-slot='dropdown-item'
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- LinkItem ---------- */
export interface DropdownLinkItemProps
  extends Omit<ComponentProps<typeof BaseMenu.LinkItem>, 'style'>,
    BaseProps {}

function LinkItem({ style, ref, ...props }: DropdownLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      data-slot='dropdown-link-item'
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- CheckboxItem ---------- */
export interface DropdownCheckboxItemProps
  extends Omit<ComponentProps<typeof BaseMenu.CheckboxItem>, 'style'>,
    BaseProps {}

function CheckboxItem({ style, ref, ...props }: DropdownCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      data-slot='dropdown-checkbox-item'
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- CheckboxItemIndicator ---------- */
function CheckboxItemIndicator(props: ComponentProps<typeof BaseMenu.CheckboxItemIndicator>) {
  return (
    <BaseMenu.CheckboxItemIndicator data-slot='dropdown-checkbox-item-indicator' {...props} />
  );
}

/* ---------- RadioGroup ---------- */
function RadioGroup(props: ComponentProps<typeof BaseMenu.RadioGroup>) {
  return <BaseMenu.RadioGroup data-slot='dropdown-radio-group' {...props} />;
}

/* ---------- RadioItem ---------- */
export interface DropdownRadioItemProps
  extends Omit<ComponentProps<typeof BaseMenu.RadioItem>, 'style'>,
    BaseProps {}

function RadioItem({ style, ref, ...props }: DropdownRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot='dropdown-radio-item'
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- RadioItemIndicator ---------- */
function RadioItemIndicator(props: ComponentProps<typeof BaseMenu.RadioItemIndicator>) {
  return <BaseMenu.RadioItemIndicator data-slot='dropdown-radio-item-indicator' {...props} />;
}

/* ---------- Group ---------- */
function Group(props: ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot='dropdown-group' {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface DropdownGroupLabelProps
  extends Omit<ComponentProps<typeof BaseMenu.GroupLabel>, 'style'>,
    BaseProps {}

const groupLabelStyles = stylex.create({
  base: {
    paddingInline: spacing.s12,
    paddingBlock: spacing.s4,
    fontSize: typography.labelSize,
    fontWeight: 500,
    color: colors.foregroundSecondary,
  },
});

function GroupLabel({ style, ref, ...props }: DropdownGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      data-slot='dropdown-group-label'
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface DropdownSeparatorProps
  extends Omit<ComponentProps<typeof BaseMenu.Separator>, 'style'>,
    BaseProps {}

const separatorStyles = stylex.create({
  base: {
    height: borders.default,
    backgroundColor: colors.border,
    marginBlock: spacing.s4,
  },
});

function DropdownSeparator({ style, ref, ...props }: DropdownSeparatorProps) {
  return (
    <BaseMenu.Separator
      data-slot='dropdown-separator'
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface DropdownArrowProps
  extends Omit<ComponentProps<typeof BaseMenu.Arrow>, 'style'>,
    BaseProps {}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: DropdownArrowProps) {
  return (
    <BaseMenu.Arrow
      data-slot='dropdown-arrow'
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- SubmenuRoot ---------- */
function SubmenuRoot(props: ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

/* ---------- SubmenuTrigger ---------- */
export interface DropdownSubmenuTriggerProps
  extends Omit<ComponentProps<typeof BaseMenu.SubmenuTrigger>, 'style'>,
    BaseProps {}

function SubmenuTrigger({ style, ref, ...props }: DropdownSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot='dropdown-submenu-trigger'
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Dropdown = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  LinkItem,
  CheckboxItem,
  CheckboxItemIndicator,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
  Group,
  GroupLabel,
  Separator: DropdownSeparator,
  Arrow,
  SubmenuRoot,
  SubmenuTrigger,
};
