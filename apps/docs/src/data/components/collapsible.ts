import type { PropDef } from '~/components/PropsTable';

export const collapsibleProps: PropDef[] = [
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the panel is expanded on initial render.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Callback fired when the open state changes.',
  },
];
