import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { warpProps } from '~/data/shaders/warp';
import WarpHero from '~/examples/shaders/warp-hero';
import heroRaw from '~/examples/shaders/warp-hero.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/shaders/warp')({
  loader: async () => {
    return { heroRaw: await highlightCode({ data: { code: heroRaw } }) };
  },
  component: WarpPage,
});

function WarpPage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Warp'
      description='Domain-warped noise folds — cloudy marble sheets. Pointer and velocity pull the domain; opts into Root Pointer.'
    >
      <ComponentExample
        title='Playground'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <WarpHero />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Warp
      </Text>
      <PropsTable props={warpProps} />
    </DocsPage>
  );
}
