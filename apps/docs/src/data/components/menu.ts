import type { PropDef } from '~/components/PropsTable';

export const menuRootProps: PropDef[] = [
  {
    name: 'defaultValue',
    type: 'Value | null',
    default: 'null',
    description: 'Uncontrolled value of the initially open item.',
  },
  {
    name: 'value',
    type: 'Value | null',
    default: 'null',
    description: 'Controlled value of the currently open item. Nullish closes the menu.',
  },
  {
    name: 'onValueChange',
    type: '(value: Value | null, eventDetails) => void',
    default: 'undefined',
    description: 'Called when the open item value changes.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '50',
    description: 'Delay in ms before the popup opens on hover.',
  },
  {
    name: 'closeDelay',
    type: 'number',
    default: '50',
    description: 'Delay in ms before the popup closes on hover out.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Orientation of the menu.',
  },
];
