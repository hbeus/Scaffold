import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { dialogContentProps } from '~/data/components/dialog';
import DialogHero from '~/examples/dialog/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/dialog/hero.tsx?raw';

export const Route = createFileRoute('/components/overlays/dialog')({
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
      title='Dialog'
      description='Compound component pattern — Dialog.Root, Dialog.Trigger, Dialog.Content, etc.'
    >
      <ComponentExample
        title='Modal'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <DialogHero />
      </ComponentExample>

      <PropsTable props={dialogContentProps} title='Dialog.Content Props' />
    </DocsPage>
  );
}
