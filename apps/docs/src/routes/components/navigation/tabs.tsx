import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { tabsListProps, tabsMenuItemProps, tabsMenuProps, tabsRootProps } from '~/data/components/tabs';
import TabsButton from '~/examples/tabs/button';
import buttonRaw from '~/examples/tabs/button.tsx?raw';
import TabsFill from '~/examples/tabs/fill';
import fillRaw from '~/examples/tabs/fill.tsx?raw';
import TabsFillButton from '~/examples/tabs/fill-button';
import fillButtonRaw from '~/examples/tabs/fill-button.tsx?raw';
import TabsMenu from '~/examples/tabs/menu';
import menuRaw from '~/examples/tabs/menu.tsx?raw';
import TabsMenuFill from '~/examples/tabs/menu-fill';
import menuFillRaw from '~/examples/tabs/menu-fill.tsx?raw';
import TabsUnderline from '~/examples/tabs/underline';
import underlineRaw from '~/examples/tabs/underline.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/components/navigation/tabs')({
  loader: async () => {
    const sources = {
      underlineRaw,
      buttonRaw,
      fillRaw,
      fillButtonRaw,
      menuRaw,
      menuFillRaw,
    };
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
      title='Tabs'
      description='Tabbed content with a Motion layoutId indicator. Wrap panels in Tabs.Panels. Use Tabs.Menu for overflow items.'
    >
      <ComponentExample
        title='Underline'
        code={highlighted.underlineRaw}
        rawCode={underlineRaw}
        defaultExpanded
      >
        <TabsUnderline />
      </ComponentExample>

      <ComponentExample title='Button' code={highlighted.buttonRaw} rawCode={buttonRaw}>
        <TabsButton />
      </ComponentExample>

      <ComponentExample title='Fill' code={highlighted.fillRaw} rawCode={fillRaw}>
        <TabsFill />
      </ComponentExample>

      <ComponentExample
        title='Fill button'
        code={highlighted.fillButtonRaw}
        rawCode={fillButtonRaw}
      >
        <TabsFillButton />
      </ComponentExample>

      <ComponentExample title='Menu' code={highlighted.menuRaw} rawCode={menuRaw}>
        <TabsMenu />
      </ComponentExample>

      <ComponentExample title='Menu with fill' code={highlighted.menuFillRaw} rawCode={menuFillRaw}>
        <TabsMenuFill />
      </ComponentExample>

      <PropsTable props={tabsRootProps} title='Tabs.Root Props' />
      <PropsTable props={tabsListProps} title='Tabs.List Props' />
      <PropsTable props={tabsMenuProps} title='Tabs.Menu Props' />
      <PropsTable props={tabsMenuItemProps} title='Tabs.MenuItem Props' />
    </DocsPage>
  );
}
