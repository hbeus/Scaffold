import type { PropDef } from '~/components/PropsTable';

export const progressRootProps: PropDef[] = [
  {
    name: 'value',
    type: 'number | null',
    default: 'null',
    description: 'Current progress value. Pass null for indeterminate.',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Minimum value of the progress range.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum value of the progress range.',
  },
];
