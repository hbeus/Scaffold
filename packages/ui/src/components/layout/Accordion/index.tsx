import type { AccordionRootProps } from '@base-ui/react/accordion';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import * as stylex from '@stylexjs/stylex';
import { IconChevronDown } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { type ComponentProps, type ReactNode, useState } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Text } from '../../typography/Text';

/* ---------- Root ---------- */

function Root(props: AccordionRootProps) {
  return <BaseAccordion.Root data-slot="accordion" {...props} />;
}

/* ---------- Item ---------- */

const styles = stylex.create({
  item: {
    overflow: 'visible',
    borderBottomWidth: borders.default,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  header: {
    margin: 0,
    overflow: 'visible',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: spacing.s8,
    overflow: 'visible',
    paddingTop: spacing.s16,
    paddingBottom: spacing.s16,
    cursor: 'pointer',
    transition: 'padding-bottom 0.15s ease-out',
  },
  triggerOpen: {
    paddingBottom: spacing.s8,
  },
  chevron: {
    display: 'flex',
    flexShrink: 0,
    color: colors.foregroundSecondary,
  },
  panelContent: {
    paddingBottom: spacing.s16,
  },
});

export interface AccordionItemProps
  extends Omit<ComponentProps<typeof BaseAccordion.Item>, 'style'>,
    BaseProps {
  trigger: ReactNode;
}

function Item({ trigger, children, style, ref, ...props }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      ref={ref}
      onOpenChange={setOpen}
      {...stylex.props(styles.item, ...styleArray(style))}
      {...props}
    >
      <BaseAccordion.Header {...stylex.props(styles.header)}>
        <BaseAccordion.Trigger {...stylex.props(styles.trigger, open && styles.triggerOpen)}>
          <Text>{trigger}</Text>
          <motion.span
            {...stylex.props(styles.chevron)}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <IconChevronDown size={16} aria-label='Toggle accordion' />
          </motion.span>
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel keepMounted hidden={false}>
        <motion.div
          initial={false}
          animate={
            open
              ? { height: 'auto', opacity: 1, y: 0, filter: 'blur(0)' }
              : { height: 0, opacity: 0, y: -8, filter: 'blur(2px)' }
          }
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div {...stylex.props(styles.panelContent)}>{children}</div>
        </motion.div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}

/* ---------- Export ---------- */

export const Accordion = {
  Root,
  Item,
};
