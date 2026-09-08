import type { PropDef } from '~/components/PropsTable';

export const gridProps: PropDef[] = [
  {
    name: 'columns',
    type: 'number',
    default: 'undefined',
    description: 'Number of equal-width columns.',
  },
  {
    name: 'rows',
    type: 'number',
    default: 'undefined',
    description: 'Number of equal-height rows.',
  },
  {
    name: 'gap',
    type: "'none' | 's2' | 's4' | 's8' | 's12' | 's16' | 's24' | 's32' | 's40'",
    default: "'none'",
    description: 'Gap between grid cells.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'stretch'",
    default: 'undefined',
    description: 'Vertical alignment of items within cells.',
  },
  {
    name: 'justify',
    type: "'start' | 'center' | 'end' | 'stretch'",
    default: 'undefined',
    description: 'Horizontal alignment of items within cells.',
  },
  {
    name: 'flow',
    type: "'row' | 'column' | 'dense'",
    default: 'undefined',
    description: 'Grid auto-flow direction.',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'div'",
    description: 'HTML element to render as.',
  },
];
