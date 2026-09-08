import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { avatarRootProps } from '~/data/components/avatar';
import AvatarFallback from '~/examples/avatar/fallback';
import AvatarHero from '~/examples/avatar/hero';
import { highlightCode } from '~/lib/highlight';

import fallbackRaw from '~/examples/avatar/fallback.tsx?raw';
import heroRaw from '~/examples/avatar/hero.tsx?raw';

export const Route = createFileRoute('/components/display/avatar')({
  loader: async () => {
    const sources = { heroRaw, fallbackRaw };
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
      title='Avatar'
      description='User avatar with size variants and fallback initials.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <AvatarHero />
      </ComponentExample>

      <ComponentExample
        title='Fallback Initials'
        code={highlighted.fallbackRaw}
        rawCode={fallbackRaw}
      >
        <AvatarFallback />
      </ComponentExample>

      <PropsTable props={avatarRootProps} title='Avatar.Root Props' />
    </DocsPage>
  );
}
