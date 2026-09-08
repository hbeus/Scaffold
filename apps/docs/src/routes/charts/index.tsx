import { Flex, Text } from '@base/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/charts/')({
  component: ChartsOverviewPage,
});

function ChartsOverviewPage() {
  return (
    <DocsPage
      title='Charts'
      description='Theme-aware visualizations from @base/charts — VisX geometry, StyleX data colors, and motion presentation behind compound CartesianChart and DonutChart APIs.'
    >
      <Flex direction='column' gap='s24'>
        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Install
          </Text>
          <Text color='secondary'>
            Add the workspace package in an app that already has React 19 and{' '}
            <InlineCode>@base/ui</InlineCode> theming, then import the compounds.
          </Text>
          <pre>
            {`pnpm add @base/charts --filter <app>
import { CartesianChart, DonutChart } from '@base/charts'`}
          </pre>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Compound API
          </Text>
          <Text color='secondary'>
            <InlineCode>CartesianChart.Root</InlineCode> owns data, scales, and size for bar, line,
            and area. Compose <InlineCode>Grid</InlineCode>, <InlineCode>Axis</InlineCode>, series
            parts, <InlineCode>Tooltip</InlineCode>, and <InlineCode>Crosshair</InlineCode>{' '}
            explicitly. <InlineCode>DonutChart</InlineCode> is a separate polar compound. Pie is{' '}
            <InlineCode>DonutChart</InlineCode> with <InlineCode>innerRadiusRatio={'{0}'}</InlineCode>
            .
          </Text>
          <pre>
            {`import { letterFrequency } from '@visx/mock-data'

<CartesianChart.Root data={letterFrequency.slice(0, 12)} x="letter" label="Letter frequency">
  <CartesianChart.Grid />
  <CartesianChart.Axis position="left" />
  <CartesianChart.Axis position="bottom" />
  <CartesianChart.Bar dataKey="frequency" />
  <CartesianChart.Tooltip />
</CartesianChart.Root>`}
          </pre>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Theme
          </Text>
          <Text color='secondary'>
            Series paint with Data colors (<InlineCode>colors.data1</InlineCode>…{' '}
            <InlineCode>data8</InlineCode>) from <InlineCode>@base/ui</InlineCode>. Chart chrome
            uses <InlineCode>colors.chart*</InlineCode>. See{' '}
            <Link to='/tokens/data-colors'>Data Colors</Link>.
          </Text>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Charts
          </Text>
          <Text color='secondary'>
            <Link to='/charts/bar'>Bar</Link>, <Link to='/charts/line'>Line</Link>,{' '}
            <Link to='/charts/area'>Area</Link>, <Link to='/charts/donut'>Donut</Link>.
          </Text>
        </Flex>
      </Flex>
    </DocsPage>
  );
}
