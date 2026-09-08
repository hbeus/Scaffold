import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { gridProps } from '~/data/components/grid';
import GridGapSizes from '~/examples/grid/gap-sizes';
import GridHero from '~/examples/grid/hero';
import { highlightCode } from '~/lib/highlight';

import gapSizesRaw from '~/examples/grid/gap-sizes.tsx?raw';
import heroRaw from '~/examples/grid/hero.tsx?raw';

export const Route = createFileRoute('/components/layout/grid')({
  loader: async () => {
    const sources = { heroRaw, gapSizesRaw };
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
      title='Grid'
      description='CSS grid layout primitive with columns, rows, and gap props.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <GridHero />
      </ComponentExample>

      <ComponentExample
        title='Gap Sizes'
        code={highlighted.gapSizesRaw}
        rawCode={gapSizesRaw}
      >
        <GridGapSizes />
      </ComponentExample>

      <PropsTable props={gridProps} />
    </DocsPage>
  );
}
