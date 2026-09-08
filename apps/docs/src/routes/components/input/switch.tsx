import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { switchProps } from '~/data/components/switch';
import SwitchControlled from '~/examples/switch/controlled';
import SwitchHero from '~/examples/switch/hero';
import { highlightCode } from '~/lib/highlight';

import controlledRaw from '~/examples/switch/controlled.tsx?raw';
import heroRaw from '~/examples/switch/hero.tsx?raw';

export const Route = createFileRoute('/components/input/switch')({
  loader: async () => {
    const sources = { heroRaw, controlledRaw };
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
      title='Switch'
      description='Toggle switch with spring-animated thumb.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <SwitchHero />
      </ComponentExample>

      <ComponentExample
        title='Controlled'
        code={highlighted.controlledRaw}
        rawCode={controlledRaw}
      >
        <SwitchControlled />
      </ComponentExample>

      <PropsTable props={switchProps} />
    </DocsPage>
  );
}
