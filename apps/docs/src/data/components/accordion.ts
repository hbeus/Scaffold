import type { PropDef } from '~/components/PropsTable';

export const accordionRootProps: PropDef[] = [
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Whether multiple items can be expanded at once.',
  },
];

export const accordionItemProps: PropDef[] = [
  {
    name: 'trigger',
    type: 'ReactNode',
    default: '---',
    description: 'Content displayed in the collapsible trigger header.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether this item is disabled and cannot be toggled.',
  },
];
