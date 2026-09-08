import type { PropDef } from '~/components/PropsTable';

export const auroraProps: PropDef[] = [
  {
    name: 'colorA',
    type: 'string',
    default: "'#0b1d36'",
    description: 'Primary aurora color (hex, CSS color, or var(--token)).',
  },
  {
    name: 'colorB',
    type: 'string',
    default: "'#3d8bfd'",
    description: 'Secondary / highlight color (hex, CSS color, or var(--token)).',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Animation speed multiplier for time-driven motion.',
  },
  {
    name: 'intensity',
    type: 'number',
    default: '1',
    description: 'Overall glow / band brightness.',
  },
  {
    name: 'bandCount',
    type: 'number',
    default: '3',
    description: 'Approximate number of horizontal curtains / bands.',
  },
];
