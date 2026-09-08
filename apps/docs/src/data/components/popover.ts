import type { PropDef } from '~/components/PropsTable';

export const popoverProps: PropDef[] = [
  {
    name: 'openOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Whether the popover opens on hover instead of click.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '300',
    description: 'Delay in ms before the popover opens on hover.',
  },
];
