import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { alertDialogContentProps } from '~/data/components/alert-dialog';
import AlertDialogHero from '~/examples/alert-dialog/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/alert-dialog/hero.tsx?raw';

export const Route = createFileRoute('/components/overlays/alert-dialog')({
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
      title='Alert Dialog'
      description='Confirmation dialog for destructive or irreversible actions.'
    >
      <ComponentExample
        title='Destructive confirmation'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <AlertDialogHero />
      </ComponentExample>

      <PropsTable props={alertDialogContentProps} title='AlertDialog.Content Props' />
    </DocsPage>
  );
}
