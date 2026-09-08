import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { accordionItemProps, accordionRootProps } from '~/data/components/accordion';
import AccordionDisabled from '~/examples/accordion/disabled';
import AccordionHero from '~/examples/accordion/hero';
import AccordionMultiple from '~/examples/accordion/multiple';
import { highlightCode } from '~/lib/highlight';

import disabledRaw from '~/examples/accordion/disabled.tsx?raw';
import heroRaw from '~/examples/accordion/hero.tsx?raw';
import multipleRaw from '~/examples/accordion/multiple.tsx?raw';

export const Route = createFileRoute('/components/layout/accordion')({
  loader: async () => {
    const sources = { heroRaw, multipleRaw, disabledRaw };
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
      title='Accordion'
      description='Compound component -- Accordion.Root wraps Accordion.Item children with animated panels.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <AccordionHero />
      </ComponentExample>

      <ComponentExample
        title='Multiple'
        code={highlighted.multipleRaw}
        rawCode={multipleRaw}
      >
        <AccordionMultiple />
      </ComponentExample>

      <ComponentExample
        title='Disabled'
        code={highlighted.disabledRaw}
        rawCode={disabledRaw}
      >
        <AccordionDisabled />
      </ComponentExample>

      <PropsTable props={accordionRootProps} title='Accordion.Root Props' />
      <PropsTable props={accordionItemProps} title='Accordion.Item Props' />
    </DocsPage>
  );
}
