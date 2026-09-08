import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { iconProps } from '~/data/components/icon';
import IconHero from '~/examples/icon/hero';
import IconSizes from '~/examples/icon/sizes';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/icon/hero.tsx?raw';
import sizesRaw from '~/examples/icon/sizes.tsx?raw';

export const Route = createFileRoute('/components/display/icon')({
  loader: async () => {
    const sources = { heroRaw, sizesRaw };
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
      title='Icon'
      description='Wrapper for Tabler icons with consistent sizing and alignment.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <IconHero />
      </ComponentExample>

      <ComponentExample
        title='Sizes'
        code={highlighted.sizesRaw}
        rawCode={sizesRaw}
      >
        <IconSizes />
      </ComponentExample>

      <PropsTable props={iconProps} />
    </DocsPage>
  );
}
