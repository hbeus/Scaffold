import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { tooltipProps } from '~/data/components/tooltip';
import TooltipHero from '~/examples/tooltip/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/tooltip/hero.tsx?raw';

export const Route = createFileRoute('/components/overlays/tooltip')({
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
      title='Tooltip'
      description='Hover-triggered informational popup with arrow.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <TooltipHero />
      </ComponentExample>

      <PropsTable props={tooltipProps} />
    </DocsPage>
  );
}
