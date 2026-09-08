import { Flex, Text } from '@base/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/shaders/')({
  component: ShadersOverviewPage,
});

function ShadersOverviewPage() {
  return (
    <DocsPage
      title='Shaders'
      description='GPU page backgrounds from @base/shaders — OGL fullscreen presets behind a compound Shader API. Progressive enhancement with Fallback and Reveal.'
    >
      <Flex direction='column' gap='s24'>
        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Install
          </Text>
          <Text color='secondary'>
            Add the workspace package in an app that already has React 19, then import the compound{' '}
            <InlineCode>Shader</InlineCode> export.
          </Text>
          <pre>
            {`pnpm add @base/shaders --filter <app>
import { Shader, resolveColor } from '@base/shaders'`}
          </pre>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Compound API
          </Text>
          <Text color='secondary'>
            <InlineCode>Shader.Root</InlineCode> owns the canvas lifecycle. Exactly one named Preset
            registers as a headless child.
          </Text>
          <pre>
            {`<Shader.Root style={{ height: 320 }} fallback={…}>
  <Shader.Mesh colorA="#fd9038" colorB="#266df0" colorC="#ff5b59" colorD="#13dd8d" />
</Shader.Root>`}
          </pre>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Runtime
          </Text>
          <Text color='secondary'>
            Client-only mount, RAF paused when offscreen or the tab is hidden, DPR capped,{' '}
            <InlineCode>prefers-reduced-motion</InlineCode> freezes after a static frame, and{' '}
            <InlineCode>fallback</InlineCode> stays visible until Reveal (first successful frame).
            Pointer-aware presets opt in via registration; Root tracks the host in 0–1 bottom-left
            coords with velocity (<InlineCode>vx</InlineCode>/<InlineCode>vy</InlineCode>, norm
            units/s, smoothed + idle decay) and passes <InlineCode>null</InlineCode> under reduced
            motion.
          </Text>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Colors & tokens
          </Text>
          <Text color='secondary'>
            Preset color props accept hex, CSS colors, and <InlineCode>var(--token)</InlineCode>.
            Resolution goes through public <InlineCode>resolveColor</InlineCode> (no StyleX /{' '}
            <InlineCode>@base/ui</InlineCode> dependency). Prefer resolving against the Root host so
            cascade matches the shader surface.
          </Text>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Presets
          </Text>
          <Text color='secondary'>
            <Link to='/shaders/mesh'>Mesh</Link>,{' '}
            <Link to='/shaders/palette'>Palette</Link>,{' '}
            <Link to='/shaders/blobs'>Blobs</Link> —
            each with DialKit playgrounds and props.
          </Text>
        </Flex>
      </Flex>
    </DocsPage>
  );
}
