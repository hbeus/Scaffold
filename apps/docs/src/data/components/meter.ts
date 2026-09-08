import type { PropDef } from '~/components/PropsTable';

export const meterRootProps: PropDef[] = [
  {
    name: 'value',
    type: 'number',
    default: '---',
    description: 'Current value of the meter.',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Minimum value of the meter range.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum value of the meter range.',
  },
];
