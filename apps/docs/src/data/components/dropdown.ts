import type { PropDef } from '~/components/PropsTable';

export const dropdownProps: PropDef[] = [
  {
    name: 'openOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Whether the dropdown opens on hover instead of click.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '100',
    description: 'Delay in ms before the dropdown opens on hover.',
  },
];
