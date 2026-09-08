import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { cardProps } from '~/data/components/card';
import CardDirection from '~/examples/card/direction';
import CardHero from '~/examples/card/hero';
import CardPadding from '~/examples/card/padding';
import { highlightCode } from '~/lib/highlight';

import directionRaw from '~/examples/card/direction.tsx?raw';
import heroRaw from '~/examples/card/hero.tsx?raw';
import paddingRaw from '~/examples/card/padding.tsx?raw';

export const Route = createFileRoute('/components/layout/card')({
  loader: async () => {
    const sources = { heroRaw, paddingRaw, directionRaw };
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
      title='Card'
      description='Container with variant, padding, direction, and gap props.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <CardHero />
      </ComponentExample>

      <ComponentExample
        title='Padding'
        code={highlighted.paddingRaw}
        rawCode={paddingRaw}
      >
        <CardPadding />
      </ComponentExample>

      <ComponentExample
        title='Direction'
        code={highlighted.directionRaw}
        rawCode={directionRaw}
      >
        <CardDirection />
      </ComponentExample>

      <PropsTable props={cardProps} />
    </DocsPage>
  );
}
