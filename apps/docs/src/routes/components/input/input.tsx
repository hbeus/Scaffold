import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { inputProps } from '~/data/components/input';
import InputHero from '~/examples/input/hero';
import InputStates from '~/examples/input/states';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/input/hero.tsx?raw';
import statesRaw from '~/examples/input/states.tsx?raw';

export const Route = createFileRoute('/components/input/input')({
  loader: async () => {
    const sources = { heroRaw, statesRaw };
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
      title='Input'
      description='Wraps Base UI Input with size variants.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <InputHero />
      </ComponentExample>

      <ComponentExample
        title='States'
        code={highlighted.statesRaw}
        rawCode={statesRaw}
      >
        <InputStates />
      </ComponentExample>

      <PropsTable props={inputProps} />
    </DocsPage>
  );
}
