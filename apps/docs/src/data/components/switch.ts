import type { PropDef } from '~/components/PropsTable';

export const switchProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: "'md'",
    description: 'Size of the switch track and thumb.',
  },
];
