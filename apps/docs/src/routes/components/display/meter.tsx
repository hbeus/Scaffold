import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { meterRootProps } from '~/data/components/meter';
import MeterHero from '~/examples/meter/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/meter/hero.tsx?raw';

export const Route = createFileRoute('/components/display/meter')({
  loader: async () => {
    const sources = { heroRaw };
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
      title='Meter'
      description='Meter gauge for displaying measured values.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <MeterHero />
      </ComponentExample>

      <PropsTable props={meterRootProps} title='Meter.Root Props' />
    </DocsPage>
  );
}
