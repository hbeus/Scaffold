import type { PropDef } from '~/components/PropsTable';

export const iconProps: PropDef[] = [
  {
    name: 'icon',
    type: 'ComponentType',
    default: '---',
    description: 'Tabler icon component to render.',
  },
  {
    name: 'size',
    type: 'string | number',
    default: '14',
    description: 'Width and height of the icon in pixels.',
  },
  {
    name: 'strokeWidth',
    type: 'string | number',
    default: '2',
    description: 'Stroke width of the icon paths.',
  },
];
