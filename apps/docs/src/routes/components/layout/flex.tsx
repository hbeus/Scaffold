import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { flexProps } from '~/data/components/flex';
import FlexAlignment from '~/examples/flex/alignment';
import FlexHero from '~/examples/flex/hero';
import FlexWrap from '~/examples/flex/wrap';
import { highlightCode } from '~/lib/highlight';

import alignmentRaw from '~/examples/flex/alignment.tsx?raw';
import heroRaw from '~/examples/flex/hero.tsx?raw';
import wrapRaw from '~/examples/flex/wrap.tsx?raw';

export const Route = createFileRoute('/components/layout/flex')({
  loader: async () => {
    const sources = { heroRaw, alignmentRaw, wrapRaw };
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
      title='Flex'
      description='Flexbox layout primitive with direction, gap, align, justify, and wrap props.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <FlexHero />
      </ComponentExample>

      <ComponentExample
        title='Alignment'
        code={highlighted.alignmentRaw}
        rawCode={alignmentRaw}
      >
        <FlexAlignment />
      </ComponentExample>

      <ComponentExample
        title='Wrap'
        code={highlighted.wrapRaw}
        rawCode={wrapRaw}
      >
        <FlexWrap />
      </ComponentExample>

      <PropsTable props={flexProps} />
    </DocsPage>
  );
}
