import type { PropDef } from '~/components/PropsTable';

export const toggleGroupRootProps: PropDef[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Default size for all items in the group.',
  },
];

export const toggleGroupItemProps: PropDef[] = [
  {
    name: 'value',
    type: 'string',
    default: '---',
    description: 'Value associated with this toggle item.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size override for this specific item.',
  },
  {
    name: 'leading',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered before the item label.',
  },
  {
    name: 'trailing',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered after the item label.',
  },
];
