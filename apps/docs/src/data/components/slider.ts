import type { PropDef } from '~/components/PropsTable';

export const sliderRootProps: PropDef[] = [
  {
    name: 'defaultValue',
    type: 'number | number[]',
    default: 'undefined',
    description: 'Initial value. Pass an array for range mode.',
  },
  {
    name: 'value',
    type: 'number | number[]',
    default: 'undefined',
    description: 'Controlled value.',
  },
  {
    name: 'onValueChange',
    type: '(value: number, thumbIndex: number) => void',
    default: 'undefined',
    description: 'Callback fired when the value changes.',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Minimum value of the slider range.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum value of the slider range.',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    description: 'Step increment between values.',
  },
];
