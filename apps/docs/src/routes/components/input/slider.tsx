import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { sliderRootProps } from '~/data/components/slider';
import SliderHero from '~/examples/slider/hero';
import SliderRange from '~/examples/slider/range';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/slider/hero.tsx?raw';
import rangeRaw from '~/examples/slider/range.tsx?raw';

export const Route = createFileRoute('/components/input/slider')({
  loader: async () => {
    const sources = { heroRaw, rangeRaw };
    const entries = await Promise.all(
      Object.entries(sources).map(async ([key, code]) => {
        const html = await highlightCode({ data: { code } });
        return [key, html] as const;
      }),
    );
    return Object.fromEntries(entries) as Record<string, string>;
  },
  component: PageComponent,
});

function PageComponent() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Slider'
      description='Range slider with label, value output, and range mode.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <SliderHero />
      </ComponentExample>

      <ComponentExample
        title='Range'
        code={highlighted.rangeRaw}
        rawCode={rangeRaw}
      >
        <SliderRange />
      </ComponentExample>

      <PropsTable props={sliderRootProps} title='Slider.Root Props' />
    </DocsPage>
  );
}
