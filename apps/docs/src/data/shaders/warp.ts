import type { PropDef } from '~/components/PropsTable';

export const warpProps: PropDef[] = [
  {
    name: 'colorA',
    type: 'string',
    default: "'#0a1628'",
    description: 'Deep base color (hex, CSS color, or var(--token)).',
  },
  {
    name: 'colorB',
    type: 'string',
    default: "'#3d5a80'",
    description: 'Mid tone for the warped field.',
  },
  {
    name: 'colorC',
    type: 'string',
    default: "'#98c1d9'",
    description: 'Highlight / fold accent.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Animation speed multiplier.',
  },
  {
    name: 'intensity',
    type: 'number',
    default: '1',
    description: 'Overall brightness of the warped field.',
  },
  {
    name: 'warp',
    type: 'number',
    default: '1',
    description: 'Domain-warp displacement strength.',
  },
  {
    name: 'scale',
    type: 'number',
    default: '1.4',
    description: 'Spatial scale of the noise field.',
  },
  {
    name: 'pointerPull',
    type: 'number',
    default: '0.45',
    description: 'Domain offset toward the pointer.',
  },
  {
    name: 'velocityPull',
    type: 'number',
    default: '0.7',
    description: 'Extra domain pull from pointer velocity.',
  },
];
