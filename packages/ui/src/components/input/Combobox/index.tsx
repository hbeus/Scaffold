import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { useSurface } from '../../../hooks/useSurface';
import { borders } from '../../../tokens/borders.stylex';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BaseCombobox.Root>) {
  return <BaseCombobox.Root {...props} />;
}

/* ---------- Label ---------- */
export interface ComboboxLabelProps
  extends Omit<ComponentProps<typeof BaseCombobox.Label>, 'style'>,
    BaseProps {}

const labelStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundPrimary,
    marginBottom: spacing.s4,
  },
});

function Label({ style, ref, ...props }: ComboboxLabelProps) {
  return (
    <BaseCombobox.Label
      data-slot="combobox-label"
      ref={ref}
      {...stylex.props(labelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Value ---------- */
function Value(props: ComponentProps<typeof BaseCombobox.Value>) {
  return <BaseCombobox.Value data-slot="combobox-value" {...props} />;
}

/* ---------- Input ---------- */
export interface ComboboxInputProps
  extends Omit<ComponentProps<typeof BaseCombobox.Input>, 'style'>,
    BaseProps {}

const inputStyles = stylex.create({
  base: {
    flex: 1,
    minWidth: 0,
    height: elementSize.md,
    paddingInline: spacing.s12,
    fontSize: typography.bodySmSize,
    color: colors.foregroundPrimary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    '::placeholder': {
      color: colors.foregroundSecondary,
    },
  },
});

function Input({ style, ref, ...props }: ComboboxInputProps) {
  return (
    <BaseCombobox.Input
      data-slot="combobox-input"
      ref={ref}
      {...stylex.props(inputStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- InputGroup ---------- */
export interface ComboboxInputGroupProps
  extends Omit<ComponentProps<typeof BaseCombobox.InputGroup>, 'style'>,
    BaseProps {}

const inputGroupStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r8,
    transition: 'border-color 0.15s',
    ':focus-within': {
      borderColor: colors.highlight,
    },
  },
});

function InputGroup(props: ComboboxInputGroupProps) {
  return (
    <SurfaceLevel>
      <InputGroupSurface {...props} />
    </SurfaceLevel>
  );
}

function InputGroupSurface({ style, ref, ...props }: ComboboxInputGroupProps) {
  const surface = useSurface();

  return (
    <BaseCombobox.InputGroup
      data-slot='combobox-input-group'
      ref={ref}
      {...stylex.props(inputGroupStyles.base, surface, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentProps<typeof BaseCombobox.Trigger>) {
  return <BaseCombobox.Trigger data-slot="combobox-trigger" ref={ref} {...props} />;
}

/* ---------- Icon ---------- */
function Icon(props: ComponentProps<typeof BaseCombobox.Icon>) {
  return <BaseCombobox.Icon data-slot="combobox-icon" {...props} />;
}

/* ---------- Clear ---------- */
function Clear({
  ref,
  ...props
}: ComponentProps<typeof BaseCombobox.Clear>) {
  return <BaseCombobox.Clear data-slot="combobox-clear" ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseCombobox.Portal>) {
  return <BaseCombobox.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentProps<typeof BaseCombobox.Positioner>) {
  return <BaseCombobox.Positioner data-slot="combobox-positioner" {...props} />;
}

/* ---------- Popup ---------- */
export interface ComboboxPopupProps
  extends Omit<ComponentProps<typeof BaseCombobox.Popup>, 'style'>,
    BaseProps {}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s4,
    outline: 'none',
    boxShadow: colors.shadowElevated,
  },
});

function Popup({ style, ref, ...props }: ComboboxPopupProps) {
  return (
    <BaseCombobox.Popup
      data-slot="combobox-popup"
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        />
      }
      {...stylex.props(popupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- List ---------- */
function List(props: ComponentProps<typeof BaseCombobox.List>) {
  return <BaseCombobox.List data-slot="combobox-list" {...props} />;
}

/* ---------- Item ---------- */
export interface ComboboxItemProps
  extends Omit<ComponentProps<typeof BaseCombobox.Item>, 'style'>,
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

function Item({ style, ref, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ItemIndicator ---------- */
function ItemIndicator(props: ComponentProps<typeof BaseCombobox.ItemIndicator>) {
  return <BaseCombobox.ItemIndicator data-slot="combobox-item-indicator" {...props} />;
}

/* ---------- Group ---------- */
function Group(props: ComponentProps<typeof BaseCombobox.Group>) {
  return <BaseCombobox.Group data-slot="combobox-group" {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface ComboboxGroupLabelProps
  extends Omit<ComponentProps<typeof BaseCombobox.GroupLabel>, 'style'>,
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

function GroupLabel({ style, ref, ...props }: ComboboxGroupLabelProps) {
  return (
    <BaseCombobox.GroupLabel
      data-slot="combobox-group-label"
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Empty ---------- */
export interface ComboboxEmptyProps
  extends Omit<ComponentProps<typeof BaseCombobox.Empty>, 'style'>,
    BaseProps {}

const emptyStyles = stylex.create({
  base: {
    paddingInline: spacing.s12,
    paddingBlock: spacing.s16,
    fontSize: typography.bodySmSize,
    color: colors.foregroundSecondary,
    textAlign: 'center',
  },
});

function Empty({ style, ref, ...props }: ComboboxEmptyProps) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      ref={ref}
      {...stylex.props(emptyStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface ComboboxArrowProps
  extends Omit<ComponentProps<typeof BaseCombobox.Arrow>, 'style'>,
    BaseProps {}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: ComboboxArrowProps) {
  return (
    <BaseCombobox.Arrow
      data-slot="combobox-arrow"
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Status ---------- */
function Status(props: ComponentProps<typeof BaseCombobox.Status>) {
  return <BaseCombobox.Status data-slot="combobox-status" {...props} />;
}

/* ---------- Chips ---------- */
function Chips(props: ComponentProps<typeof BaseCombobox.Chips>) {
  return <BaseCombobox.Chips data-slot="combobox-chips" {...props} />;
}

/* ---------- Chip ---------- */
function Chip(props: ComponentProps<typeof BaseCombobox.Chip>) {
  return <BaseCombobox.Chip data-slot="combobox-chip" {...props} />;
}

/* ---------- ChipRemove ---------- */
function ChipRemove(props: ComponentProps<typeof BaseCombobox.ChipRemove>) {
  return <BaseCombobox.ChipRemove data-slot="combobox-chip-remove" {...props} />;
}

/* ---------- Export ---------- */
export const Combobox = {
  Root,
  Label,
  Value,
  Input,
  InputGroup,
  Trigger,
  Icon,
  Clear,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  ItemIndicator,
  Group,
  GroupLabel,
  Empty,
  Arrow,
  Status,
  Chips,
  Chip,
  ChipRemove,
  useFilter: BaseCombobox.useFilter,
  useFilteredItems: BaseCombobox.useFilteredItems,
};
