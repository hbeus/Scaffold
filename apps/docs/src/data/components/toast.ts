import type { PropDef } from '~/components/PropsTable';

export const toastProviderProps: PropDef[] = [
  {
    name: 'limit',
    type: 'number',
    default: '3',
    description:
      'Maximum visible toasts. Older toasts are marked limited and animate out (opacity, scale, blur).',
  },
];

export const toastViewportProps: PropDef[] = [
  {
    name: 'position',
    type: "'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center'",
    default: "'bottom-right'",
    description:
      'Corner/edge placement. Bottom positions enter from below; top positions enter from above.',
  },
];

export const toastRootProps: PropDef[] = [
  {
    name: 'toast',
    type: 'ToastObject',
    default: '—',
    description: 'The toast object from the manager to render.',
  },
  {
    name: 'swipeDirection',
    type: "'up' | 'down' | 'left' | 'right' | Array",
    default: 'Derived from position',
    description:
      'Swipe-to-dismiss directions. Defaults to away from the viewport edge (e.g. down+right for bottom-right).',
  },
];

export const toastIconProps: PropDef[] = [
  {
    name: 'type',
    type: "'success' | 'info' | 'warning' | 'error' | 'loading' | string",
    default: '—',
    description: 'Renders a status icon. Unknown types render nothing.',
  },
];
