import type { PropDef } from '~/components/PropsTable';

export const numberFieldInputProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height and font size of the number input.',
  },
];
