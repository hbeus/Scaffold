import type { PropDef } from '~/components/PropsTable';

export const dialogContentProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Width of the dialog content area.',
  },
];
