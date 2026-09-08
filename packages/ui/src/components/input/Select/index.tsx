import { Select as BaseSelect } from '@base-ui/react/select';
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

type SelectSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />;
}

/* ---------- Trigger ---------- */
export interface SelectTriggerProps
  extends Omit<ComponentProps<typeof BaseSelect.Trigger>, 'style'>,
    BaseProps {
  size?: SelectSize;
}

const triggerStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.s8,
    width: '100%',
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.15s',
    ':focus': {
      borderColor: colors.lighten16,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
    borderRadius: radii.r8,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
    borderRadius: radii.r10,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s16,
    fontSize: typography.bodySize,
    borderRadius: radii.r12,
  },
});

function Trigger(props: SelectTriggerProps) {
  return (
    <SurfaceLevel>
      <TriggerSurface {...props} />
    </SurfaceLevel>
  );
}

function TriggerSurface({ size = 'md', style, ref, ...props }: SelectTriggerProps) {
  const surface = useSurface();

  return (
    <BaseSelect.Trigger
      data-slot='select-trigger'
      data-size={size}
      ref={ref}
      {...stylex.props(triggerStyles.base, triggerStyles[size], surface, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Value ---------- */
function Value(props: ComponentProps<typeof BaseSelect.Value>) {
  return <BaseSelect.Value data-slot="select-value" {...props} />;
}

/* ---------- Icon ---------- */
export interface SelectIconProps
  extends Omit<ComponentProps<typeof BaseSelect.Icon>, 'style'>,
    BaseProps {}

const iconStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    color: colors.foregroundSecondary,
  },
});

function Icon({ style, ref, ...props }: SelectIconProps) {
  return (
    <BaseSelect.Icon
      data-slot="select-icon"
      ref={ref}
      {...stylex.props(iconStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseSelect.Portal>) {
  return <BaseSelect.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentProps<typeof BaseSelect.Positioner>) {
  return <BaseSelect.Positioner data-slot="select-positioner" {...props} />;
}

/* ---------- Popup ---------- */
export interface SelectPopupProps
  extends Omit<ComponentProps<typeof BaseSelect.Popup>, 'style'>,
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
    overflow: 'auto',
    maxHeight: 'var(--available-height)',
  },
});

function Popup({ style, ref, ...props }: SelectPopupProps) {
  return (
    <BaseSelect.Popup
      data-slot="select-popup"
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

/* ---------- Item ---------- */
export interface SelectItemProps
  extends Omit<ComponentProps<typeof BaseSelect.Item>, 'style'>,
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

function Item({ style, ref, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ItemIndicator ---------- */
export interface SelectItemIndicatorProps
  extends Omit<ComponentProps<typeof BaseSelect.ItemIndicator>, 'style'>,
    BaseProps {}

const itemIndicatorStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
  },
});

function ItemIndicator({ style, ref, ...props }: SelectItemIndicatorProps) {
  return (
    <BaseSelect.ItemIndicator
      data-slot="select-item-indicator"
      ref={ref}
      {...stylex.props(itemIndicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ItemText ---------- */
function ItemText(props: ComponentProps<typeof BaseSelect.ItemText>) {
  return <BaseSelect.ItemText data-slot="select-item-text" {...props} />;
}

/* ---------- Group ---------- */
function SelectGroup(props: ComponentProps<typeof BaseSelect.Group>) {
  return <BaseSelect.Group data-slot="select-group" {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface SelectGroupLabelProps
  extends Omit<ComponentProps<typeof BaseSelect.GroupLabel>, 'style'>,
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

function GroupLabel({ style, ref, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-group-label"
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface SelectArrowProps
  extends Omit<ComponentProps<typeof BaseSelect.Arrow>, 'style'>,
    BaseProps {}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: SelectArrowProps) {
  return (
    <BaseSelect.Arrow
      data-slot="select-arrow"
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface SelectSeparatorProps
  extends Omit<ComponentProps<typeof BaseSelect.Separator>, 'style'>,
    BaseProps {}

const separatorStyles = stylex.create({
  base: {
    height: borders.default,
    backgroundColor: colors.border,
    marginBlock: spacing.s4,
  },
});

function Separator({ style, ref, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      data-slot="select-separator"
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ScrollUpArrow ---------- */
function ScrollUpArrow(props: ComponentProps<typeof BaseSelect.ScrollUpArrow>) {
  return <BaseSelect.ScrollUpArrow data-slot="select-scroll-up-arrow" {...props} />;
}

/* ---------- ScrollDownArrow ---------- */
function ScrollDownArrow(props: ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return <BaseSelect.ScrollDownArrow data-slot="select-scroll-down-arrow" {...props} />;
}

/* ---------- Export ---------- */
export const Select = {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Positioner,
  Popup,
  Item,
  ItemIndicator,
  ItemText,
  Group: SelectGroup,
  GroupLabel,
  Arrow,
  Separator,
  ScrollUpArrow,
  ScrollDownArrow,
};
