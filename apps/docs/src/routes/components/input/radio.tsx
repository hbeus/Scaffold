import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { radioItemProps } from '~/data/components/radio';
import RadioHero from '~/examples/radio/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/radio/hero.tsx?raw';

export const Route = createFileRoute('/components/input/radio')({
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
      title='Radio'
      description='Radio group with spring-animated indicator.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <RadioHero />
      </ComponentExample>

      <PropsTable props={radioItemProps} title='Radio.Item Props' />
    </DocsPage>
  );
}
