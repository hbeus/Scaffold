import type { PropDef } from '~/components/PropsTable';

export const meshProps: PropDef[] = [
  {
    name: 'colorA',
    type: 'string',
    default: "'#fd9038'",
    description: 'Soft orb color A.',
  },
  {
    name: 'colorB',
    type: 'string',
    default: "'#266df0'",
    description: 'Soft orb color B.',
  },
  {
    name: 'colorC',
    type: 'string',
    default: "'#ff5b59'",
    description: 'Soft orb color C.',
  },
  {
    name: 'colorD',
    type: 'string',
    default: "'#13dd8d'",
    description: 'Soft orb color D.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Drift speed.',
  },
  {
    name: 'intensity',
    type: 'number',
    default: '1',
    description: 'Overall brightness.',
  },
  {
    name: 'softness',
    type: 'number',
    default: '1',
    description: 'Orb falloff size.',
  },
  {
    name: 'attract',
    type: 'number',
    default: '0.45',
    description: 'How strongly orbs follow the pointer (0 = ambient).',
  },
  {
    name: 'velocityBias',
    type: 'number',
    default: '0.6',
    description: 'How much pointer velocity shifts orb mass.',
  },
];
