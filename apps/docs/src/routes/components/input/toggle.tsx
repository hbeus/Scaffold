import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { toggleProps } from '~/data/components/toggle';
import ToggleHero from '~/examples/toggle/hero';
import ToggleSlots from '~/examples/toggle/slots';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/toggle/hero.tsx?raw';
import slotsRaw from '~/examples/toggle/slots.tsx?raw';

export const Route = createFileRoute('/components/input/toggle')({
  loader: async () => {
    const sources = { heroRaw, slotsRaw };
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
      title='Toggle'
      description='Pressable two-state toggle button. Use leading and trailing slots for icons beside the label.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <ToggleHero />
      </ComponentExample>

      <ComponentExample
        title='Leading and Trailing Slots'
        code={highlighted.slotsRaw}
        rawCode={slotsRaw}
      >
        <ToggleSlots />
      </ComponentExample>

      <PropsTable props={toggleProps} />
    </DocsPage>
  );
}
