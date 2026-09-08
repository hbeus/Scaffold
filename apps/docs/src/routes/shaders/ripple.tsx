import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { rippleProps } from '~/data/shaders/ripple';
import RippleHero from '~/examples/shaders/ripple-hero';
import heroRaw from '~/examples/shaders/ripple-hero.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/shaders/ripple')({
  loader: async () => {
    return { heroRaw: await highlightCode({ data: { code: heroRaw } }) };
  },
  component: RipplePage,
});

function RipplePage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Ripple'
      description='Concentric rings from the pointer (normalized host coords). Velocity boosts amplitude and frequency. Opts into Root Pointer; under reduced motion, rings idle quietly at center.'
    >
      <ComponentExample
        title='Playground'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <RippleHero />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Ripple
      </Text>
      <PropsTable props={rippleProps} />
    </DocsPage>
  );
}
