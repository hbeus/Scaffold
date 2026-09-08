import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import DrawerHero from '~/examples/drawer/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/drawer/hero.tsx?raw';

export const Route = createFileRoute('/components/overlays/drawer')({
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
      title='Drawer'
      description='Side panel overlay that slides in from the edge.'
    >
      <ComponentExample
        title='Side panel'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <DrawerHero />
      </ComponentExample>
    </DocsPage>
  );
}
