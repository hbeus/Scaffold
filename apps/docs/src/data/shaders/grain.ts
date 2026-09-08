import type { PropDef } from '~/components/PropsTable';

export const grainProps: PropDef[] = [
  {
    name: 'color',
    type: 'string',
    default: "'#1a1b1e'",
    description: 'Base color under the grain (hex, CSS color, or var(--token)).',
  },
  {
    name: 'amount',
    type: 'number',
    default: '0.12',
    description: 'Grain strength.',
  },
  {
    name: 'size',
    type: 'number',
    default: '1',
    description: 'Grain particle scale (higher = coarser).',
  },
  {
    name: 'speed',
    type: 'number',
    default: '1',
    description: 'How quickly the grain pattern refreshes.',
  },
  {
    name: 'lumaResponse',
    type: 'number',
    default: '0.35',
    description: 'Less grain in highlights when raised (0–1).',
  },
];
