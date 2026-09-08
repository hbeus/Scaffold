import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
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
function Root(props: ComponentProps<typeof BaseAutocomplete.Root>) {
  return <BaseAutocomplete.Root {...props} />;
}

/* ---------- Value ---------- */
function Value(props: ComponentProps<typeof BaseAutocomplete.Value>) {
  return <BaseAutocomplete.Value data-slot="autocomplete-value" {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentProps<typeof BaseAutocomplete.Trigger>) {
  return <BaseAutocomplete.Trigger data-slot="autocomplete-trigger" ref={ref} {...props} />;
}

/* ---------- Input ---------- */
export interface AutocompleteInputProps
  extends Omit<ComponentProps<typeof BaseAutocomplete.Input>, 'style'>,
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

function Input({ style, ref, ...props }: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.Input
      data-slot="autocomplete-input"
      ref={ref}
      {...stylex.props(inputStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- InputGroup ---------- */
export interface AutocompleteInputGroupProps
  extends Omit<ComponentProps<typeof BaseAutocomplete.InputGroup>, 'style'>,
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

function InputGroup(props: AutocompleteInputGroupProps) {
  return (
    <SurfaceLevel>
      <InputGroupSurface {...props} />
    </SurfaceLevel>
  );
}

function InputGroupSurface({ style, ref, ...props }: AutocompleteInputGroupProps) {
  const surface = useSurface();

  return (
    <BaseAutocomplete.InputGroup
      data-slot='autocomplete-input-group'
      ref={ref}
      {...stylex.props(inputGroupStyles.base, surface, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Icon ---------- */
function Icon(props: ComponentProps<typeof BaseAutocomplete.Icon>) {
  return <BaseAutocomplete.Icon data-slot="autocomplete-icon" {...props} />;
}

/* ---------- Clear ---------- */
function Clear({
  ref,
  ...props
}: ComponentProps<typeof BaseAutocomplete.Clear>) {
  return <BaseAutocomplete.Clear data-slot="autocomplete-clear" ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseAutocomplete.Portal>) {
  return <BaseAutocomplete.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentProps<typeof BaseAutocomplete.Positioner>) {
  return <BaseAutocomplete.Positioner data-slot="autocomplete-positioner" {...props} />;
}

/* ---------- Popup ---------- */
export interface AutocompletePopupProps
  extends Omit<ComponentProps<typeof BaseAutocomplete.Popup>, 'style'>,
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

function Popup({ style, ref, ...props }: AutocompletePopupProps) {
  return (
    <BaseAutocomplete.Popup
      data-slot="autocomplete-popup"
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
function List(props: ComponentProps<typeof BaseAutocomplete.List>) {
  return <BaseAutocomplete.List data-slot="autocomplete-list" {...props} />;
}

/* ---------- Item ---------- */
export interface AutocompleteItemProps
  extends Omit<ComponentProps<typeof BaseAutocomplete.Item>, 'style'>,
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

function Item({ style, ref, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      data-slot="autocomplete-item"
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Group ---------- */
function Group(props: ComponentProps<typeof BaseAutocomplete.Group>) {
  return <BaseAutocomplete.Group data-slot="autocomplete-group" {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface AutocompleteGroupLabelProps
  extends Omit<ComponentProps<typeof BaseAutocomplete.GroupLabel>, 'style'>,
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

function GroupLabel({ style, ref, ...props }: AutocompleteGroupLabelProps) {
  return (
    <BaseAutocomplete.GroupLabel
      data-slot="autocomplete-group-label"
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Empty ---------- */
export interface AutocompleteEmptyProps
  extends Omit<ComponentProps<typeof BaseAutocomplete.Empty>, 'style'>,
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

function Empty({ style, ref, ...props }: AutocompleteEmptyProps) {
  return (
    <BaseAutocomplete.Empty
      data-slot="autocomplete-empty"
      ref={ref}
      {...stylex.props(emptyStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface AutocompleteArrowProps
  extends Omit<ComponentProps<typeof BaseAutocomplete.Arrow>, 'style'>,
    BaseProps {}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: AutocompleteArrowProps) {
  return (
    <BaseAutocomplete.Arrow
      data-slot="autocomplete-arrow"
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Status ---------- */
function Status(props: ComponentProps<typeof BaseAutocomplete.Status>) {
  return <BaseAutocomplete.Status data-slot="autocomplete-status" {...props} />;
}

/* ---------- Export ---------- */
export const Autocomplete = {
  Root,
  Value,
  Trigger,
  Input,
  InputGroup,
  Icon,
  Clear,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  Group,
  GroupLabel,
  Empty,
  Arrow,
  Status,
  useFilter: BaseAutocomplete.useFilter,
  useFilteredItems: BaseAutocomplete.useFilteredItems,
};
