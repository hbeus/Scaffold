import type { PropDef } from '~/components/PropsTable';

export const radioItemProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: "'md'",
    description: 'Size of the radio indicator.',
  },
  {
    name: 'value',
    type: 'string',
    default: '---',
    description: 'Value associated with this radio item.',
  },
];
