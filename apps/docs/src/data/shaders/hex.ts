import type { PropDef } from '~/components/PropsTable';

export const hexProps: PropDef[] = [
  {
    name: 'colorLine',
    type: 'string',
    default: "'#6eb6ff'",
    description: 'Hex edge / glow color.',
  },
  {
    name: 'colorFill',
    type: 'string',
    default: "'#0b1220'",
    description: 'Cell fill / background color.',
  },
  {
    name: 'scale',
    type: 'number',
    default: '8',
    description: 'Lattice density.',
  },
  {
    name: 'thickness',
    type: 'number',
    default: '1',
    description: 'Edge thickness.',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'Breathing / phase speed.',
  },
  {
    name: 'glow',
    type: 'number',
    default: '0.35',
    description: 'Soft glow along edges.',
  },
];
