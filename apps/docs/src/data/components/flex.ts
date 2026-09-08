import type { PropDef } from '~/components/PropsTable';

export const flexProps: PropDef[] = [
  {
    name: 'direction',
    type: "'row' | 'column' | 'row-reverse' | 'column-reverse'",
    default: "'row'",
    description: 'Flex direction of children.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
    default: 'undefined',
    description: 'Cross-axis alignment of children.',
  },
  {
    name: 'justify',
    type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
    default: 'undefined',
    description: 'Main-axis distribution of children.',
  },
  {
    name: 'gap',
    type: "'none' | 's2' | 's4' | 's8' | 's12' | 's16' | 's24' | 's32' | 's40'",
    default: "'none'",
    description: 'Gap between children.',
  },
  {
    name: 'wrap',
    type: "boolean | 'reverse'",
    default: 'undefined',
    description: 'Whether children wrap to new lines.',
  },
  {
    name: 'inline',
    type: 'boolean',
    default: 'undefined',
    description: 'Use inline-flex instead of flex.',
  },
  {
    name: 'grow',
    type: 'boolean',
    default: 'undefined',
    description: 'Whether the flex container grows to fill available space.',
  },
  {
    name: 'as',
    type: 'ElementType',
    default: "'div'",
    description: 'HTML element to render as.',
  },
];
