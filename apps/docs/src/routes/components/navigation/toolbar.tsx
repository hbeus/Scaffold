import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { toolbarButtonProps } from '~/data/components/toolbar';
import ToolbarHero from '~/examples/toolbar/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/toolbar/hero.tsx?raw';

export const Route = createFileRoute('/components/navigation/toolbar')({
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
      title='Toolbar'
      description='Grouped action buttons with separators.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <ToolbarHero />
      </ComponentExample>

      <PropsTable props={toolbarButtonProps} title='Toolbar.Button Props' />
    </DocsPage>
  );
}
