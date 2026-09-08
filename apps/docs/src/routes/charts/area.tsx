import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import AreaHero from '~/examples/charts/area-hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/charts/area-hero.tsx?raw';

export const Route = createFileRoute('/charts/area')({
  loader: async () => {
    const hero = await highlightCode({ data: { code: heroRaw } });
    return { hero };
  },
  component: AreaPage,
});

function AreaPage() {
  const { hero } = Route.useLoaderData();

  return (
    <DocsPage
      title='Area'
      description='Filled area series on the shared cartesian shell with Data color fill and stroke.'
    >
      <ComponentExample title='Playground' code={hero} rawCode={heroRaw} defaultExpanded>
        <AreaHero />
      </ComponentExample>
    </DocsPage>
  );
}
