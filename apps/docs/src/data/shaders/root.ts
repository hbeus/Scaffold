import type { PropDef } from '~/components/PropsTable';

export const shaderRootProps: PropDef[] = [
  {
    name: 'fallback',
    type: 'React.ReactNode',
    default: 'undefined',
    description:
      'Non-WebGL stand-in shown until the first successful frame (and while the client guard has not mounted).',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Class name for the host element that wraps the canvas.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    default: 'undefined',
    description: 'Inline styles for the host element (size the Root to give the canvas dimensions).',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Exactly one named Preset (e.g. Shader.Aurora, Shader.Ripple).',
  },
];
