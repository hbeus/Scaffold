import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import SurfaceButtons from '~/examples/surface/buttons';
import SurfaceDialogJump from '~/examples/surface/dialog-jump';
import SurfaceFields from '~/examples/surface/fields';
import SurfaceLevels from '~/examples/surface/levels';
import SurfaceNested from '~/examples/surface/nested';
import { highlightCode } from '~/lib/highlight';

import buttonsRaw from '~/examples/surface/buttons.tsx?raw';
import dialogJumpRaw from '~/examples/surface/dialog-jump.tsx?raw';
import fieldsRaw from '~/examples/surface/fields.tsx?raw';
import levelsRaw from '~/examples/surface/levels.tsx?raw';
import nestedRaw from '~/examples/surface/nested.tsx?raw';

export const Route = createFileRoute('/utilities/surface')({
  loader: async () => {
    const sources = { levelsRaw, nestedRaw, dialogJumpRaw, buttonsRaw, fieldsRaw };
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
      title='Surface Levels'
      description='Six opaque surface levels (0–500) via React context. Wrap with SurfaceLevel to auto-increment (+100) or jump to an absolute level, then paint with useSurface(). Filled controls (Button primary, Card, fields) consume this ladder; hover washes stay on lighten tokens.'
    >
      <ComponentExample title='All Levels' code={highlighted.levelsRaw} rawCode={levelsRaw} defaultExpanded>
        <SurfaceLevels />
      </ComponentExample>

      <ComponentExample title='Nested Auto-Increment' code={highlighted.nestedRaw} rawCode={nestedRaw}>
        <SurfaceNested />
      </ComponentExample>

      <ComponentExample
        title='Absolute Jump (Dialog Pattern)'
        code={highlighted.dialogJumpRaw}
        rawCode={dialogJumpRaw}
      >
        <SurfaceDialogJump />
      </ComponentExample>

      <ComponentExample title='Buttons on Surfaces' code={highlighted.buttonsRaw} rawCode={buttonsRaw}>
        <SurfaceButtons />
      </ComponentExample>

      <ComponentExample title='Fields on Surfaces' code={highlighted.fieldsRaw} rawCode={fieldsRaw}>
        <SurfaceFields />
      </ComponentExample>
    </DocsPage>
  );
}
