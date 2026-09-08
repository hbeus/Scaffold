import type { PropDef } from '~/components/PropsTable';

export const paletteProps: PropDef[] = [
  {
    name: 'colorA',
    type: 'string',
    default: "'#0b1020'",
    description: 'Palette base / dark stop.',
  },
  {
    name: 'colorB',
    type: 'string',
    default: "'#fd9038'",
    description: 'Warm spectral accent.',
  },
  {
    name: 'colorC',
    type: 'string',
    default: "'#266df0'",
    description: 'Cool spectral accent.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Color drift speed.',
  },
  {
    name: 'intensity',
    type: 'number',
    default: '1',
    description: 'Overall brightness.',
  },
  {
    name: 'mode',
    type: "'field' | 'angular'",
    default: "'field'",
    description: 'field = cosine bands; angular = Spectrum-style conic wash.',
  },
  {
    name: 'stops',
    type: 'number',
    default: '4',
    description: 'How many hue bands across the field.',
  },
];
