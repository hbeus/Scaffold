import type { PropDef } from '~/components/PropsTable';

export const pressableProps: PropDef[] = [
  {
    name: 'variant',
    type: "'filled' | 'outline' | 'ghost' | 'transparent'",
    default: "'ghost'",
    description: 'Visual style of the pressable surface.',
  },
  {
    name: 'inset',
    type: "'s2' | 's4' | 's8' | 's12' | 's16'",
    default: "'s16'",
    description: 'Internal padding of the pressable area.',
  },
  {
    name: 'radius',
    type: "'r2' | 'r4' | 'r6' | 'r8' | 'r12' | 'r16' | 'r20' | 'r24' | 'r32' | 'full'",
    default: "'r20'",
    description: 'Border radius of the pressable area.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the pressable is disabled.',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'div'",
    description: 'HTML element to render as.',
  },
];
