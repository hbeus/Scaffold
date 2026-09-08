import type { PropDef } from '~/components/PropsTable';

export const tabsRootProps: PropDef[] = [
  {
    name: 'fill',
    type: 'boolean',
    default: 'false',
    description: 'Stretch the root and equal-width tab items to fill the parent.',
  },
  {
    name: 'onValueChange',
    type: '(value: TabValue) => void',
    default: 'undefined',
    description: 'Called when the active tab value changes.',
  },
];

export const tabsListProps: PropDef[] = [
  {
    name: 'variant',
    type: "'underline' | 'button'",
    default: "'underline'",
    description: 'Visual style of the tab list.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height and font size of all tabs.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: '—',
    description:
      'Accessible name for the tab list. Recommended when the page has multiple tab lists.',
  },
];

export const tabsMenuProps: PropDef[] = [
  {
    name: 'label',
    type: 'string',
    default: "'More tabs'",
    description:
      'Fallback accessible name and tooltip when no menu item is active. When a menu item is selected, both use that item’s title instead.',
  },
];

export const tabsMenuItemProps: PropDef[] = [
  {
    name: 'value',
    type: 'TabValue',
    default: '—',
    description: 'The tab value this item activates when selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the item is disabled.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description:
      'Plain-text label for the menu item (also used for the trigger tooltip when active).',
  },
];
