import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { hexProps } from '~/data/shaders/hex';
import HexHero from '~/examples/shaders/hex-hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/shaders/hex-hero.tsx?raw';

export const Route = createFileRoute('/shaders/hex')({
  loader: async () => {
    return { heroRaw: await highlightCode({ data: { code: heroRaw } }) };
  },
  component: HexPage,
});

function HexPage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Hex'
      description='Subtle hexagonal lattice with breathing edges — geometric structure vs organic curtains.'
    >
      <ComponentExample title='Playground' code={highlighted.heroRaw} rawCode={heroRaw} defaultExpanded>
        <HexHero />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Hex
      </Text>
      <PropsTable props={hexProps} />
    </DocsPage>
  );
}
