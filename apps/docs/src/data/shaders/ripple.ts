import type { PropDef } from '~/components/PropsTable';

export const rippleProps: PropDef[] = [
  {
    name: 'colorA',
    type: 'string',
    default: "'#0a1420'",
    description: 'Background color.',
  },
  {
    name: 'colorB',
    type: 'string',
    default: "'#5ec8ff'",
    description: 'Ring / highlight color.',
  },
  {
    name: 'amplitude',
    type: 'number',
    default: '1',
    description: 'Ring brightness.',
  },
  {
    name: 'frequency',
    type: 'number',
    default: '28',
    description: 'Spatial frequency of rings.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Expansion speed.',
  },
  {
    name: 'decay',
    type: 'number',
    default: '2.2',
    description: 'How quickly rings fade with distance.',
  },
  {
    name: 'thickness',
    type: 'number',
    default: '1',
    description: 'Ring line thickness.',
  },
  {
    name: 'velocityAmp',
    type: 'number',
    default: '0.8',
    description: 'How much pointer speed boosts ring amplitude.',
  },
  {
    name: 'velocityFreq',
    type: 'number',
    default: '0.5',
    description: 'How much pointer speed tightens ring frequency.',
  },
];
