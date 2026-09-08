import type { PropDef } from '~/components/PropsTable';

export const buttonStateProps: PropDef[] = [
  {
    name: 'variant',
    type: "'positive' | 'negative' | 'semiNegative' | 'semiPositive' | 'neutral' | 'highlight'",
    default: "'negative'",
    description: 'Color variant of the button state.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height and font size.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    description: 'Whether to use fully rounded pill shape.',
  },
  {
    name: 'fill',
    type: 'boolean',
    default: 'false',
    description: 'Whether the button stretches to fill its container.',
  },
  {
    name: 'leading',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered before the label.',
  },
  {
    name: 'trailing',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered after the label.',
  },
];
