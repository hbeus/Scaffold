import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import BarGroupExample from '~/examples/charts/bar-group';
import BarHero from '~/examples/charts/bar-hero';
import BarStackExample from '~/examples/charts/bar-stack';
import { highlightCode } from '~/lib/highlight';

import groupRaw from '~/examples/charts/bar-group.tsx?raw';
import heroRaw from '~/examples/charts/bar-hero.tsx?raw';
import stackRaw from '~/examples/charts/bar-stack.tsx?raw';

export const Route = createFileRoute('/charts/bar')({
  loader: async () => {
    const [hero, stack, group] = await Promise.all([
      highlightCode({ data: { code: heroRaw } }),
      highlightCode({ data: { code: stackRaw } }),
      highlightCode({ data: { code: groupRaw } }),
    ]);
    return { hero, stack, group };
  },
  component: BarPage,
});

function BarPage() {
  const { hero, stack, group } = Route.useLoaderData();

  return (
    <DocsPage
      title='Bar'
      description='Cartesian bar series on the shared CartesianChart shell — theme Data colors, mount motion, and Chart tooltip. Use layout="stack" or layout="group" for multi-series bars.'
    >
      <ComponentExample title='Playground' code={hero} rawCode={heroRaw} defaultExpanded>
        <BarHero />
      </ComponentExample>
      <ComponentExample title='Stacked' code={stack} rawCode={stackRaw}>
        <BarStackExample />
      </ComponentExample>
      <ComponentExample title='Grouped' code={group} rawCode={groupRaw}>
        <BarGroupExample />
      </ComponentExample>
    </DocsPage>
  );
}
