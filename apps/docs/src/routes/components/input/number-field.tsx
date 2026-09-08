import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { numberFieldInputProps } from '~/data/components/number-field';
import NumberFieldHero from '~/examples/number-field/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/number-field/hero.tsx?raw';

export const Route = createFileRoute('/components/input/number-field')({
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
      title='Number Field'
      description='Numeric input with increment and decrement buttons.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <NumberFieldHero />
      </ComponentExample>

      <PropsTable props={numberFieldInputProps} title='NumberField.Input Props' />
    </DocsPage>
  );
}
