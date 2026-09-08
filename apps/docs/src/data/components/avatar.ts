import type { PropDef } from '~/components/PropsTable';

export const avatarRootProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size of the avatar circle.',
  },
];
