import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { grainProps } from '~/data/shaders/grain';
import GrainHero from '~/examples/shaders/grain-hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/shaders/grain-hero.tsx?raw';

export const Route = createFileRoute('/shaders/grain')({
  loader: async () => {
    return { heroRaw: await highlightCode({ data: { code: heroRaw } }) };
  },
  component: GrainPage,
});

function GrainPage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Grain'
      description='Animated film / sensor grain over a flat color — quiet texture that sits under UI without competing for silhouette.'
    >
      <ComponentExample title='Playground' code={highlighted.heroRaw} rawCode={heroRaw} defaultExpanded>
        <GrainHero />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Grain
      </Text>
      <PropsTable props={grainProps} />
    </DocsPage>
  );
}
