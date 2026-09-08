import type { PropDef } from '~/components/PropsTable';

export const blobsProps: PropDef[] = [
  {
    name: 'colorA',
    type: 'string',
    default: "'#0a1420'",
    description: 'Background / deep tone.',
  },
  {
    name: 'colorB',
    type: 'string',
    default: "'#5ec8ff'",
    description: 'Primary blob color.',
  },
  {
    name: 'colorC',
    type: 'string',
    default: "'#ff7ad9'",
    description: 'Secondary blob color.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Orbit / drift speed.',
  },
  {
    name: 'intensity',
    type: 'number',
    default: '1',
    description: 'Overall brightness.',
  },
  {
    name: 'threshold',
    type: 'number',
    default: '1.1',
    description: 'Metaball field cutoff.',
  },
  {
    name: 'attract',
    type: 'number',
    default: '0.55',
    description: 'Pointer attract / repel strength.',
  },
  {
    name: 'velocityForce',
    type: 'number',
    default: '0.8',
    description: 'How strongly velocity shoves the field.',
  },
];
