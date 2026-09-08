import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { dropdownProps } from '~/data/components/dropdown';
import DropdownHero from '~/examples/dropdown/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/dropdown/hero.tsx?raw';

export const Route = createFileRoute('/components/overlays/dropdown')({
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
      title='Dropdown'
      description='Action menu with items, icons, and separators.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <DropdownHero />
      </ComponentExample>

      <PropsTable props={dropdownProps} />
    </DocsPage>
  );
}
