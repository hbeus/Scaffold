import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { checkboxRootProps } from '~/data/components/checkbox';
import CheckboxGroupExample from '~/examples/checkbox/group';
import CheckboxHero from '~/examples/checkbox/hero';
import { highlightCode } from '~/lib/highlight';

import groupRaw from '~/examples/checkbox/group.tsx?raw';
import heroRaw from '~/examples/checkbox/hero.tsx?raw';

export const Route = createFileRoute('/components/input/checkbox')({
  loader: async () => {
    const sources = { heroRaw, groupRaw };
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
      title='Checkbox'
      description='Checkbox with spring-animated indicator and group support.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <CheckboxHero />
      </ComponentExample>

      <ComponentExample
        title='Group'
        code={highlighted.groupRaw}
        rawCode={groupRaw}
      >
        <CheckboxGroupExample />
      </ComponentExample>

      <PropsTable props={checkboxRootProps} title='Checkbox.Root Props' />
    </DocsPage>
  );
}
