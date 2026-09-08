import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { separatorProps } from '~/data/components/separator';
import SeparatorHero from '~/examples/separator/hero';
import SeparatorVertical from '~/examples/separator/vertical';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/separator/hero.tsx?raw';
import verticalRaw from '~/examples/separator/vertical.tsx?raw';

export const Route = createFileRoute('/components/display/separator')({
  loader: async () => {
    const sources = { heroRaw, verticalRaw };
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
      title='Separator'
      description='Horizontal and vertical dividers.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <SeparatorHero />
      </ComponentExample>

      <ComponentExample
        title='Vertical'
        code={highlighted.verticalRaw}
        rawCode={verticalRaw}
      >
        <SeparatorVertical />
      </ComponentExample>

      <PropsTable props={separatorProps} />
    </DocsPage>
  );
}
