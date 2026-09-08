import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { buttonStateProps } from '~/data/components/button-states';
import ButtonStatesHero from '~/examples/button-states/hero';
import ButtonStatesShape from '~/examples/button-states/shape';
import ButtonStatesSizes from '~/examples/button-states/sizes';
import ButtonStatesSlots from '~/examples/button-states/slots';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/button-states/hero.tsx?raw';
import shapeRaw from '~/examples/button-states/shape.tsx?raw';
import sizesRaw from '~/examples/button-states/sizes.tsx?raw';
import slotsRaw from '~/examples/button-states/slots.tsx?raw';

export const Route = createFileRoute('/components/input/button-states')({
  loader: async () => {
    const sources = { heroRaw, sizesRaw, shapeRaw, slotsRaw };
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
      title='Button States'
      description='Wraps Base UI ButtonState with color variants.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <ButtonStatesHero />
      </ComponentExample>

      <ComponentExample
        title='Sizes'
        code={highlighted.sizesRaw}
        rawCode={sizesRaw}
      >
        <ButtonStatesSizes />
      </ComponentExample>

      <ComponentExample
        title='Shape'
        code={highlighted.shapeRaw}
        rawCode={shapeRaw}
      >
        <ButtonStatesShape />
      </ComponentExample>

      <ComponentExample
        title='Leading and Trailing Slots'
        code={highlighted.slotsRaw}
        rawCode={slotsRaw}
      >
        <ButtonStatesSlots />
      </ComponentExample>

      <PropsTable props={buttonStateProps} />
    </DocsPage>
  );
}
