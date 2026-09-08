import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { auroraProps } from '~/data/shaders/aurora';
import { shaderRootProps } from '~/data/shaders/root';
import AuroraFallback from '~/examples/shaders/aurora-fallback';
import AuroraHero from '~/examples/shaders/aurora-hero';
import AuroraTokens from '~/examples/shaders/aurora-tokens';
import { highlightCode } from '~/lib/highlight';

import fallbackRaw from '~/examples/shaders/aurora-fallback.tsx?raw';
import heroRaw from '~/examples/shaders/aurora-hero.tsx?raw';
import tokensRaw from '~/examples/shaders/aurora-tokens.tsx?raw';

export const Route = createFileRoute('/shaders/aurora')({
  loader: async () => {
    const sources = { heroRaw, fallbackRaw, tokensRaw };
    const entries = await Promise.all(
      Object.entries(sources).map(async ([key, code]) => {
        const html = await highlightCode({ data: { code } });
        return [key, html] as const;
      }),
    );
    return Object.fromEntries(entries) as Record<string, string>;
  },
  component: AuroraPage,
});

function AuroraPage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Aurora'
      description='Named Preset for soft animated curtains. Tune colorA, colorB, speed, intensity, and bandCount — DialKit is wired in the live preview below.'
    >
      <ComponentExample title='Playground' code={highlighted.heroRaw} rawCode={heroRaw} defaultExpanded>
        <AuroraHero />
      </ComponentExample>

      <ComponentExample title='Fallback' code={highlighted.fallbackRaw} rawCode={fallbackRaw}>
        <AuroraFallback />
      </ComponentExample>

      <ComponentExample title='CSS variables' code={highlighted.tokensRaw} rawCode={tokensRaw}>
        <AuroraTokens />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Root
      </Text>
      <PropsTable props={shaderRootProps} />

      <Text as='h2' size='title'>
        Shader.Aurora
      </Text>
      <PropsTable props={auroraProps} />
    </DocsPage>
  );
}
