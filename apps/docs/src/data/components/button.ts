import type { PropDef } from '~/components/PropsTable';

export const buttonProps: PropDef[] = [
  {
    name: 'variant',
    type: "'accent' | 'primary' | 'ghost' | 'inherit'",
    default: "'primary'",
    description:
      'Visual style. Primary paints the next surface level via SurfaceLevel.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Controls height, padding, and font size.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    description: 'Applies full border-radius for a pill shape.',
  },
  {
    name: 'fill',
    type: 'boolean',
    default: 'false',
    description: 'Stretches the button to full container width.',
  },
  {
    name: 'leading',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Content rendered before the label, typically an icon.',
  },
  {
    name: 'trailing',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Content rendered after the label, typically an icon.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button and reduces opacity.',
  },
];
