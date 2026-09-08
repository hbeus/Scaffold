import type { PropDef } from '~/components/PropsTable';

export const selectTriggerProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height and font size of the trigger button.',
  },
];
