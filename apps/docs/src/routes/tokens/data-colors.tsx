import { Flex, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/tokens/data-colors')({
  component: DataColorsPage,
});

const DATA = [
  colors.data1,
  colors.data2,
  colors.data3,
  colors.data4,
  colors.data5,
  colors.data6,
  colors.data7,
  colors.data8,
] as const;

const CHROME = [
  { name: 'chartAxis', value: colors.chartAxis },
  { name: 'chartGrid', value: colors.chartGrid },
  { name: 'chartCrosshair', value: colors.chartCrosshair },
  { name: 'chartTooltipBg', value: colors.chartTooltipBg },
  { name: 'chartTooltipFg', value: colors.chartTooltipFg },
] as const;

const styles = stylex.create({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.s12,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.s6,
  },
});

function DataColorsPage() {
  return (
    <DocsPage
      title='Data Colors'
      description='Categorical Data ramp and Chart chrome tokens generated per palette and light/dark mode for @base/charts.'
    >
      <Flex direction='column' gap='s24'>
        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Data ramp
          </Text>
          <Text color='secondary'>
            <InlineCode>colors.data1</InlineCode>…<InlineCode>data8</InlineCode> — hue-orbit from
            brand hue (fixed categorical table on the achromatic default palette). Switch theme /
            palette in the docs chrome to see them update.
          </Text>
          <div {...stylex.props(styles.grid)}>
            {DATA.map((value, i) => (
              <div key={i} {...stylex.props(styles.item)}>
                <div {...stylex.props(styles.swatch)} style={{ background: value }} />
                <Text size='caption'>data{i + 1}</Text>
              </div>
            ))}
          </div>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Chart chrome
          </Text>
          <Text color='secondary'>
            Axis, grid, crosshair, and tooltip surface — derived from foreground / surface, not the
            Data ramp.
          </Text>
          <div {...stylex.props(styles.grid)}>
            {CHROME.map(token => (
              <div key={token.name} {...stylex.props(styles.item)}>
                <div {...stylex.props(styles.swatch)} style={{ background: token.value }} />
                <Text size='caption'>{token.name}</Text>
              </div>
            ))}
          </div>
        </Flex>
      </Flex>
    </DocsPage>
  );
}
