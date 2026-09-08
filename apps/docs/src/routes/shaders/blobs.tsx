import { Text } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { blobsProps } from '~/data/shaders/blobs';
import BlobsHero from '~/examples/shaders/blobs-hero';
import heroRaw from '~/examples/shaders/blobs-hero.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/shaders/blobs')({
  loader: async () => {
    return { heroRaw: await highlightCode({ data: { code: heroRaw } }) };
  },
  component: BlobsPage,
});

function BlobsPage() {
  const highlighted = Route.useLoaderData();

  return (
    <DocsPage
      title='Blobs'
      description='Soft metaballs that attract toward the pointer; velocity shoves the field. Opts into Root Pointer.'
    >
      <ComponentExample
        title='Playground'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <BlobsHero />
      </ComponentExample>

      <Text as='h2' size='title'>
        Shader.Blobs
      </Text>
      <PropsTable props={blobsProps} />
    </DocsPage>
  );
}
