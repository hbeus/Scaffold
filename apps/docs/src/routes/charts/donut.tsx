import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';
import DonutHero from '~/examples/charts/donut-hero';
import PieHero from '~/examples/charts/pie-hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/charts/donut-hero.tsx?raw';
import pieRaw from '~/examples/charts/pie-hero.tsx?raw';

export const Route = createFileRoute('/charts/donut')({
  loader: async () => {
    const [hero, pie] = await Promise.all([
      highlightCode({ data: { code: heroRaw } }),
      highlightCode({ data: { code: pieRaw } }),
    ]);
    return { hero, pie };
  },
  component: DonutPage,
});

function DonutPage() {
  const { hero, pie } = Route.useLoaderData();

  return (
    <DocsPage
      title='Donut'
      description='Polar DonutChart with Arc segments, optional center Label, and charts-owned Tooltip. Pie is the same compound with innerRadiusRatio={0}.'
    >
      <ComponentExample title='Playground' code={hero} rawCode={heroRaw} defaultExpanded>
        <DonutHero />
      </ComponentExample>
      <Text color='secondary'>
        Set <InlineCode>innerRadiusRatio={'{0}'}</InlineCode> for a full pie. Center{' '}
        <InlineCode>Label</InlineCode> is optional and unchanged for pie.
      </Text>
      <ComponentExample title='Pie' code={pie} rawCode={pieRaw}>
        <PieHero />
      </ComponentExample>
    </DocsPage>
  );
}
