import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface CollapsibleRootProps
  extends Omit<ComponentProps<typeof BaseCollapsible.Root>, 'style'>,
    BaseProps {}

function Root({ style, ref, ...props }: CollapsibleRootProps) {
  return <BaseCollapsible.Root data-slot="collapsible" ref={ref} {...stylex.props(...styleArray(style))} {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentProps<typeof BaseCollapsible.Trigger>) {
  return <BaseCollapsible.Trigger data-slot="collapsible-trigger" ref={ref} {...props} />;
}

/* ---------- Panel ---------- */
export interface CollapsiblePanelProps
  extends Omit<ComponentProps<typeof BaseCollapsible.Panel>, 'style'>,
    BaseProps {}

const panelStyles = stylex.create({
  base: {
    overflow: 'hidden',
  },
});

function Panel({ style, ref, ...props }: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-panel"
      ref={ref}
      {...stylex.props(panelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Collapsible = {
  Root,
  Trigger,
  Panel,
};
