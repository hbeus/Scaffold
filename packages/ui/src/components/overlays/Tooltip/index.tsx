import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Provider ---------- */
function Provider(props: ComponentProps<typeof BaseTooltip.Provider>) {
  return <BaseTooltip.Provider {...props} />;
}

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BaseTooltip.Root>) {
  return <BaseTooltip.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({ ref, ...props }: ComponentProps<typeof BaseTooltip.Trigger>) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseTooltip.Portal>) {
  return <BaseTooltip.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentProps<typeof BaseTooltip.Positioner>) {
  return <BaseTooltip.Positioner data-slot="tooltip-positioner" {...props} />;
}

/* ---------- Popup ---------- */
export interface TooltipPopupProps
  extends Omit<ComponentProps<typeof BaseTooltip.Popup>, 'style'>,
    BaseProps {}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.foregroundPrimary,
    color: colors.foregroundPrimaryInverse,
    borderRadius: radii.r8,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s4,
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    maxWidth: '20rem',
  },
});

function Popup({ style, ref, ...props }: TooltipPopupProps) {
  return (
    <BaseTooltip.Popup
      data-slot="tooltip-popup"
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
        />
      }
      {...stylex.props(popupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface TooltipArrowProps
  extends Omit<ComponentProps<typeof BaseTooltip.Arrow>, 'style'>,
    BaseProps {}

const arrowStyles = stylex.create({
  base: {
    fill: colors.foregroundPrimary,
  },
});

function Arrow({ style, ref, ...props }: TooltipArrowProps) {
  return (
    <BaseTooltip.Arrow
      data-slot="tooltip-arrow"
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Tooltip = {
  Provider,
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
};
