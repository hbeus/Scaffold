import type { PropDef } from '~/components/PropsTable';

export const separatorProps: PropDef[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Direction of the divider line.',
  },
];
