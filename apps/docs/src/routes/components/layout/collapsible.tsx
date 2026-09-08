import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { collapsibleProps } from '~/data/components/collapsible';
import CollapsibleHero from '~/examples/collapsible/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/collapsible/hero.tsx?raw';

export const Route = createFileRoute('/components/layout/collapsible')({
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
      title='Collapsible'
      description='Single collapsible section with animated height transition.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <CollapsibleHero />
      </ComponentExample>

      <PropsTable props={collapsibleProps} />
    </DocsPage>
  );
}
