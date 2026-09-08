import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { otpFieldRootProps } from '~/data/components/otp-field';
import OtpFieldHero from '~/examples/otp-field/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/otp-field/hero.tsx?raw';

export const Route = createFileRoute('/components/input/otp-field')({
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
      title='OTP Field'
      description='One-time password input with individual character slots.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <OtpFieldHero />
      </ComponentExample>

      <PropsTable props={otpFieldRootProps} title='OtpField.Root Props' />
    </DocsPage>
  );
}
