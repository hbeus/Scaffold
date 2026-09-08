import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { paletteProps } from '~/data/shaders/palette';
import PaletteHero from '~/examples/shaders/palette-hero';
import heroRaw from '~/examples/shaders/palette-hero.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/shaders/palette')({
  loader: async () => {
    return { heroRaw: await highlightCode({ data: { code: heroRaw } }) };
  },
  component: PalettePage,
});

function PalettePage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Palette'
      description='Spectral color field (Quilez-style cosine). mode="angular" is the Spectrum / conic multi-stop wash — same Preset, not a separate name.'
    >
      <ComponentExample
        title='Playground'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <PaletteHero />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Palette
      </Text>
      <PropsTable props={paletteProps} />
    </DocsPage>
  );
}
