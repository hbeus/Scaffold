import type { PropDef } from '~/components/PropsTable';

export const tooltipProps: PropDef[] = [
  {
    name: 'delay',
    type: 'number',
    default: '600',
    description: 'Delay in ms before the tooltip appears on hover.',
  },
  {
    name: 'closeDelay',
    type: 'number',
    default: '0',
    description: 'Delay in ms before the tooltip disappears after hover ends.',
  },
];
