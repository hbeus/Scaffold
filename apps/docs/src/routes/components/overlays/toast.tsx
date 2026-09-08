import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import {
  toastIconProps,
  toastProviderProps,
  toastRootProps,
  toastViewportProps,
} from '~/data/components/toast';
import ToastActionExample from '~/examples/toast/action';
import actionRaw from '~/examples/toast/action.tsx?raw';
import ToastHero from '~/examples/toast/hero';
import heroRaw from '~/examples/toast/hero.tsx?raw';
import ToastPromise from '~/examples/toast/promise';
import promiseRaw from '~/examples/toast/promise.tsx?raw';
import ToastTypes from '~/examples/toast/types';
import typesRaw from '~/examples/toast/types.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/components/overlays/toast')({
  loader: async () => {
    const sources = { heroRaw, typesRaw, actionRaw, promiseRaw };
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
      title='Toast'
      description='Temporary stacked notifications with swipe dismiss, powered by Base UI and Motion.'
    >
      <ComponentExample title='Stack' code={highlighted.heroRaw} rawCode={heroRaw} defaultExpanded>
        <ToastHero />
      </ComponentExample>

      <ComponentExample title='Types' code={highlighted.typesRaw} rawCode={typesRaw}>
        <ToastTypes />
      </ComponentExample>

      <ComponentExample title='Action' code={highlighted.actionRaw} rawCode={actionRaw}>
        <ToastActionExample />
      </ComponentExample>

      <ComponentExample title='Promise' code={highlighted.promiseRaw} rawCode={promiseRaw}>
        <ToastPromise />
      </ComponentExample>

      <PropsTable props={toastProviderProps} title='Toast.Provider Props' />
      <PropsTable props={toastViewportProps} title='Toast.Viewport Props' />
      <PropsTable props={toastRootProps} title='Toast.Root Props' />
      <PropsTable props={toastIconProps} title='Toast.Icon Props' />
    </DocsPage>
  );
}
