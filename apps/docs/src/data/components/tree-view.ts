import type { PropDef } from '~/components/PropsTable';

export const treeViewRootProps: PropDef[] = [
  {
    name: 'activeHref',
    type: 'string | null',
    default: 'undefined',
    description: 'Href of the currently active item for highlight styling.',
  },
];

export const treeViewGroupProps: PropDef[] = [
  {
    name: 'label',
    type: 'ReactNode',
    default: '---',
    description: 'Text label displayed on the collapsible group header.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the group is expanded on initial render.',
  },
];

export const treeViewItemProps: PropDef[] = [
  {
    name: 'href',
    type: 'string',
    default: '---',
    description: 'Navigation URL for the tree item link.',
  },
];
