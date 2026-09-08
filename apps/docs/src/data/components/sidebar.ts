import type { PropDef } from '~/components/PropsTable';

export const sidebarRootProps: PropDef[] = [
  {
    name: 'activeId',
    type: 'string | null',
    default: 'null',
    description: 'The id of the currently active anchor.',
  },
  {
    name: 'position',
    type: "'left' | 'right'",
    default: "'left'",
    description: 'Which side the sidebar renders on.',
  },
  {
    name: 'onNavigate',
    type: '(id: string) => void',
    default: 'undefined',
    description: 'Callback when an anchor is clicked.',
  },
];

export const sidebarAnchorProps: PropDef[] = [
  {
    name: 'id',
    type: 'string',
    default: '—',
    description: 'Unique identifier for this anchor. Required.',
  },
  {
    name: 'href',
    type: 'string',
    default: '—',
    description: 'Navigation target URL. Required.',
  },
];
