import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { popoverProps } from '~/data/components/popover';
import PopoverHero from '~/examples/popover/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/popover/hero.tsx?raw';

export const Route = createFileRoute('/components/overlays/popover')({
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
      title='Popover'
      description='Positioned popup with arrow, title, and description.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <PopoverHero />
      </ComponentExample>

      <PropsTable props={popoverProps} />
    </DocsPage>
  );
}
