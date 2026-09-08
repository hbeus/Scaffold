import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import ScrollAreaHero from '~/examples/scroll-area/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/scroll-area/hero.tsx?raw';

export const Route = createFileRoute('/components/layout/scroll-area')({
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
      title='Scroll Area'
      description='Custom scrollbar overlay with viewport, scrollbar, and thumb. Scroll-aware edge fade is on by default (scrollFade={false} to disable) — see Utilities → Scroll Fade for the scrollFade helper. Put surface/background on Root or a parent — the mask dissolves the Viewport, including any background painted on it or its children.'
    >
      <ComponentExample
        title='Vertical scroll'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <ScrollAreaHero />
      </ComponentExample>
    </DocsPage>
  );
}
