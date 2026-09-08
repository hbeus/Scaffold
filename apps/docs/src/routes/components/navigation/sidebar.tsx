import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { sidebarAnchorProps, sidebarRootProps } from '~/data/components/sidebar';
import SidebarHero from '~/examples/sidebar/hero';
import SidebarRight from '~/examples/sidebar/right';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/sidebar/hero.tsx?raw';
import rightRaw from '~/examples/sidebar/right.tsx?raw';

export const Route = createFileRoute('/components/navigation/sidebar')({
  loader: async () => {
    const sources = { heroRaw, rightRaw };
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
      title='Sidebar'
      description='Fixed sidebar navigation with animated bar indicators and responsive compact mode.'
    >
      <ComponentExample
        title='Default'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <SidebarHero />
      </ComponentExample>

      <ComponentExample
        title='Right position'
        code={highlighted.rightRaw}
        rawCode={rightRaw}
      >
        <SidebarRight />
      </ComponentExample>

      <PropsTable props={sidebarRootProps} title='Sidebar.Root Props' />
      <PropsTable props={sidebarAnchorProps} title='Sidebar.Anchor Props' />
    </DocsPage>
  );
}
