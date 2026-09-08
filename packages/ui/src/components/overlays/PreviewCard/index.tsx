import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
function Root(props: ComponentProps<typeof BasePreviewCard.Root>) {
  return <BasePreviewCard.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({ ref, ...props }: ComponentProps<typeof BasePreviewCard.Trigger>) {
  return <BasePreviewCard.Trigger data-slot="preview-card-trigger" ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BasePreviewCard.Portal>) {
  return <BasePreviewCard.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentProps<typeof BasePreviewCard.Positioner>) {
  return <BasePreviewCard.Positioner data-slot="preview-card-positioner" {...props} />;
}

/* ---------- Popup ---------- */
export interface PreviewCardPopupProps
  extends Omit<ComponentProps<typeof BasePreviewCard.Popup>, 'style'>,
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
    maxWidth: '20rem',
  },
});

function Popup({ style, ref, ...props }: PreviewCardPopupProps) {
  return (
    <BasePreviewCard.Popup
      data-slot="preview-card-popup"
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

/* ---------- Arrow ---------- */
export interface PreviewCardArrowProps
  extends Omit<ComponentProps<typeof BasePreviewCard.Arrow>, 'style'>,
    BaseProps {}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: PreviewCardArrowProps) {
  return (
    <BasePreviewCard.Arrow
      data-slot="preview-card-arrow"
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Backdrop ---------- */
function Backdrop(props: ComponentProps<typeof BasePreviewCard.Backdrop>) {
  return <BasePreviewCard.Backdrop data-slot="preview-card-backdrop" {...props} />;
}

/* ---------- Export ---------- */
export const PreviewCard = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Backdrop,
};
