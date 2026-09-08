import type { PropDef } from '~/components/PropsTable';

export const cardProps: PropDef[] = [
  {
    name: 'variant',
    type: "'filled' | 'outline'",
    default: "'filled'",
    description: 'Visual style of the card.',
  },
  {
    name: 'padding',
    type: "'none' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Internal padding size.',
  },
  {
    name: 'direction',
    type: "'row' | 'column'",
    default: "'column'",
    description: 'Flex direction of the card content.',
  },
  {
    name: 'gap',
    type: "'none' | 's2' | 's4' | 's8' | 's12' | 's16' | 's24' | 's32' | 's40'",
    default: "'s16'",
    description: 'Gap between child elements.',
  },
  {
    name: 'darken',
    type: 'boolean',
    default: 'false',
    description: 'Whether to use a darker background shade.',
  },
  {
    name: 'level',
    type: '0 | 100 | 200 | 300 | 400 | 500',
    default: 'undefined',
    description:
      'Absolute surface level for filled cards. Omit to auto-increment (+100) from the parent surface.',
  },
];
