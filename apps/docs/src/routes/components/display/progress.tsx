import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { progressRootProps } from '~/data/components/progress';
import ProgressHero from '~/examples/progress/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/progress/hero.tsx?raw';

export const Route = createFileRoute('/components/display/progress')({
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
      title='Progress'
      description='Progress bar with label and value display.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <ProgressHero />
      </ComponentExample>

      <PropsTable props={progressRootProps} title='Progress.Root Props' />
    </DocsPage>
  );
}
