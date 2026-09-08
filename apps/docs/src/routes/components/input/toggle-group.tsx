import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { toggleGroupItemProps, toggleGroupRootProps } from '~/data/components/toggle-group';
import ToggleGroupHero from '~/examples/toggle-group/hero';
import ToggleGroupLeadingSlots from '~/examples/toggle-group/leading-slots';
import ToggleGroupSizes from '~/examples/toggle-group/sizes';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/toggle-group/hero.tsx?raw';
import leadingSlotsRaw from '~/examples/toggle-group/leading-slots.tsx?raw';
import sizesRaw from '~/examples/toggle-group/sizes.tsx?raw';

export const Route = createFileRoute('/components/input/toggle-group')({
  loader: async () => {
    const sources = { heroRaw, leadingSlotsRaw, sizesRaw };
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
      title='Toggle Group'
      description='Segmented control with size variants. Use leading and trailing slots for icons beside item labels.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <ToggleGroupHero />
      </ComponentExample>

      <ComponentExample
        title='Leading Slots'
        code={highlighted.leadingSlotsRaw}
        rawCode={leadingSlotsRaw}
      >
        <ToggleGroupLeadingSlots />
      </ComponentExample>

      <ComponentExample
        title='Sizes'
        code={highlighted.sizesRaw}
        rawCode={sizesRaw}
      >
        <ToggleGroupSizes />
      </ComponentExample>

      <PropsTable props={toggleGroupRootProps} title='ToggleGroup.Root Props' />
      <PropsTable props={toggleGroupItemProps} title='ToggleGroup.Item Props' />
    </DocsPage>
  );
}
