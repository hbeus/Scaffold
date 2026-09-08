import type { PropDef } from '~/components/PropsTable';

export const alertDialogContentProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Width of the alert dialog content area.',
  },
];
