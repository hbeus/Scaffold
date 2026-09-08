import type { PropDef } from '~/components/PropsTable';

export const toolbarButtonProps: PropDef[] = [
  {
    name: 'leading',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered before the button label.',
  },
  {
    name: 'trailing',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered after the button label.',
  },
];
