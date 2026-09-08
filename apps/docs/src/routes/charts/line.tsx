import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import LineHero from '~/examples/charts/line-hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/charts/line-hero.tsx?raw';

export const Route = createFileRoute('/charts/line')({
  loader: async () => {
    const hero = await highlightCode({ data: { code: heroRaw } });
    return { hero };
  },
  component: LinePage,
});

function LinePage() {
  const { hero } = Route.useLoaderData();

  return (
    <DocsPage
      title='Line'
      description='Multi-series lines on CartesianChart — nearest-x Chart tooltip lists every Series at the active category.'
    >
      <ComponentExample title='Playground' code={hero} rawCode={heroRaw} defaultExpanded>
        <LineHero />
      </ComponentExample>
    </DocsPage>
  );
}
