import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { pressableProps } from '~/data/components/pressable';
import PressableHero from '~/examples/pressable/hero';
import PressablePolymorphic from '~/examples/pressable/polymorphic';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/pressable/hero.tsx?raw';
import polymorphicRaw from '~/examples/pressable/polymorphic.tsx?raw';

export const Route = createFileRoute('/components/input/pressable')({
  loader: async () => {
    const sources = { heroRaw, polymorphicRaw };
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
      title='Pressable'
      description='Generic pressable surface with inset hover highlight and motion whileTap.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <PressableHero />
      </ComponentExample>

      <ComponentExample
        title='Polymorphic Usage'
        code={highlighted.polymorphicRaw}
        rawCode={polymorphicRaw}
      >
        <PressablePolymorphic />
      </ComponentExample>

      <PropsTable props={pressableProps} />
    </DocsPage>
  );
}
