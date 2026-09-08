import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { meshProps } from '~/data/shaders/mesh';
import MeshHero from '~/examples/shaders/mesh-hero';
import heroRaw from '~/examples/shaders/mesh-hero.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/shaders/mesh')({
  loader: async () => {
    return { heroRaw: await highlightCode({ data: { code: heroRaw } }) };
  },
  component: MeshPage,
});

function MeshPage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Mesh'
      description='Soft multi-hue atmosphere (Attio-class wash). Ambient by default; pointer attract and velocity bias via props. Opts into Root Pointer.'
    >
      <ComponentExample
        title='Playground'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <MeshHero />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Mesh
      </Text>
      <PropsTable props={meshProps} />
    </DocsPage>
  );
}
