import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { treeViewGroupProps, treeViewItemProps, treeViewRootProps } from '~/data/components/tree-view';
import TreeViewHero from '~/examples/tree-view/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/tree-view/hero.tsx?raw';

export const Route = createFileRoute('/components/navigation/tree-view')({
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
      title='Tree View'
      description='Collapsible tree navigation with nested groups and items.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <TreeViewHero />
      </ComponentExample>

      <PropsTable props={treeViewRootProps} title='TreeView.Root Props' />
      <PropsTable props={treeViewGroupProps} title='TreeView.Group Props' />
      <PropsTable props={treeViewItemProps} title='TreeView.Item Props' />
    </DocsPage>
  );
}
