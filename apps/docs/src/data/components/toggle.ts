import type { PropDef } from '~/components/PropsTable';

export const toggleProps: PropDef[] = [
  {
    name: 'leading',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered before the toggle label.',
  },
  {
    name: 'trailing',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered after the toggle label.',
  },
];
