import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { selectTriggerProps } from '~/data/components/select';
import SelectHero from '~/examples/select/hero';
import SelectSizes from '~/examples/select/sizes';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/select/hero.tsx?raw';
import sizesRaw from '~/examples/select/sizes.tsx?raw';

export const Route = createFileRoute('/components/input/select')({
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
      title='Select'
      description='Dropdown select with animated popup and size variants.'
    >
      <ComponentExample
        title='Default'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <SelectHero />
      </ComponentExample>

      <ComponentExample
        title='Sizes'
        code={highlighted.sizesRaw}
        rawCode={sizesRaw}
      >
        <SelectSizes />
      </ComponentExample>

      <PropsTable props={selectTriggerProps} title='Select.Trigger Props' />
    </DocsPage>
  );
}
