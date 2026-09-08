import { Flex, Text } from '@base/ui';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/tokens/colors')({
  component: ColorsPage,
});

const styles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s16,
  },
  sectionTitle: {
    paddingBottom: spacing.s12,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: spacing.s8,
  },
  rampGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
    gap: spacing.s8,
  },
  swatch: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
    alignItems: 'center',
  },
  swatchBox: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: radii.r12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  swatchBoxSmall: {
    width: '100%',
    height: spacing.s40,
    borderRadius: radii.r8,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  mono: {
    fontFamily: typography.fontMono,
  },
  shadowBox: {
    width: '100%',
    height: spacing.s64,
    borderRadius: radii.r12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface200,
  },
});

const swatchColors = stylex.create({
  background: { backgroundColor: colors.background },
  surface100: { backgroundColor: colors.surface100 },
  surface200: { backgroundColor: colors.surface200 },
  surface300: { backgroundColor: colors.surface300 },
  surface400: { backgroundColor: colors.surface400 },
  surface500: { backgroundColor: colors.surface500 },
  surface600: { backgroundColor: colors.surface600 },

  lighten4: { backgroundColor: colors.lighten4 },
  lighten6: { backgroundColor: colors.lighten6 },
  lighten8: { backgroundColor: colors.lighten8 },
  lighten12: { backgroundColor: colors.lighten12 },
  lighten16: { backgroundColor: colors.lighten16 },
  lighten50: { backgroundColor: colors.lighten50 },

  darken4: { backgroundColor: colors.darken4 },
  darken6: { backgroundColor: colors.darken6 },
  darken8: { backgroundColor: colors.darken8 },
  darken12: { backgroundColor: colors.darken12 },
  darken16: { backgroundColor: colors.darken16 },
  darken50: { backgroundColor: colors.darken50 },

  hover4: { backgroundColor: colors.hover4 },
  hover6: { backgroundColor: colors.hover6 },
  hover8: { backgroundColor: colors.hover8 },
  hover12: { backgroundColor: colors.hover12 },
  hover16: { backgroundColor: colors.hover16 },

  foregroundPrimary: { backgroundColor: colors.foregroundPrimary },
  foregroundPrimaryHover: { backgroundColor: colors.foregroundPrimaryHover },
  foregroundPrimaryInverse: { backgroundColor: colors.foregroundPrimaryInverse },
  foregroundSecondary: { backgroundColor: colors.foregroundSecondary },
  foregroundSecondaryHover: { backgroundColor: colors.foregroundSecondaryHover },
  foregroundSecondaryInverse: { backgroundColor: colors.foregroundSecondaryInverse },
  foregroundDisabled: { backgroundColor: colors.foregroundDisabled },

  border: { backgroundColor: colors.border },
  focusOutline: { backgroundColor: colors.focusOutline },
  highlight: { backgroundColor: colors.highlight },
  highlightForeground: { backgroundColor: colors.highlightForeground },

  statePositive: { backgroundColor: colors.statePositive },
  stateNegative: { backgroundColor: colors.stateNegative },
  stateSemiNegative: { backgroundColor: colors.stateSemiNegative },
  stateSemiPositive: { backgroundColor: colors.stateSemiPositive },
  stateNeutral: { backgroundColor: colors.stateNeutral },
  stateHighlight: { backgroundColor: colors.stateHighlight },

  buttonAccentBg: { backgroundColor: colors.buttonAccentBg },
  buttonAccentFg: { backgroundColor: colors.buttonAccentFg },
  buttonAccentHover: { backgroundColor: colors.buttonAccentHover },
  buttonPrimaryBg: { backgroundColor: colors.buttonPrimaryBg },
  buttonPrimaryFg: { backgroundColor: colors.buttonPrimaryFg },
  buttonPrimaryHover: { backgroundColor: colors.buttonPrimaryHover },

  data1: { backgroundColor: colors.data1 },
  data2: { backgroundColor: colors.data2 },
  data3: { backgroundColor: colors.data3 },
  data4: { backgroundColor: colors.data4 },
  data5: { backgroundColor: colors.data5 },
  data6: { backgroundColor: colors.data6 },
  data7: { backgroundColor: colors.data7 },
  data8: { backgroundColor: colors.data8 },

  chartAxis: { backgroundColor: colors.chartAxis },
  chartGrid: { backgroundColor: colors.chartGrid },
  chartCrosshair: { backgroundColor: colors.chartCrosshair },
  chartTooltipBg: { backgroundColor: colors.chartTooltipBg },
  chartTooltipFg: { backgroundColor: colors.chartTooltipFg },
});

const shadowStyles = stylex.create({
  elevated: { boxShadow: colors.shadowElevated },
  elevatedInner: { boxShadow: colors.shadowElevatedInner },
});

function Swatch({
  name,
  colorStyle,
  small,
}: {
  name: string;
  colorStyle: stylex.StyleXStyles;
  small?: boolean;
}) {
  return (
    <div {...stylex.props(styles.swatch)}>
      <div {...stylex.props(small ? styles.swatchBoxSmall : styles.swatchBox, colorStyle)} />
      <Text size='caption' color='secondary' style={styles.mono}>
        {name}
      </Text>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='headline' weight='semibold' style={styles.sectionTitle}>
        {title}
      </Text>
      {children}
    </section>
  );
}

function ColorsPage() {
  return (
    <DocsPage
      title='Colors'
      description={
        <>
          All color tokens from <InlineCode>colors</InlineCode> in{' '}
          <InlineCode>@base/ui/tokens/themes.stylex</InlineCode>. Values follow the active theme.
          Import via <InlineCode>{`import { colors } from '@base/ui/tokens/themes.stylex'`}</InlineCode>.
        </>
      }
    >
      <Flex direction='column' gap='s40'>
        <Section title='Background & Surfaces'>
          <div {...stylex.props(styles.grid)}>
            <Swatch name='background' colorStyle={swatchColors.background} />
            <Swatch name='surface100' colorStyle={swatchColors.surface100} />
            <Swatch name='surface200' colorStyle={swatchColors.surface200} />
            <Swatch name='surface300' colorStyle={swatchColors.surface300} />
            <Swatch name='surface400' colorStyle={swatchColors.surface400} />
            <Swatch name='surface500' colorStyle={swatchColors.surface500} />
            <Swatch name='surface600' colorStyle={swatchColors.surface600} />
          </div>
        </Section>

        <Section title='Foreground'>
          <div {...stylex.props(styles.grid)}>
            <Swatch name='foregroundPrimary' colorStyle={swatchColors.foregroundPrimary} />
            <Swatch name='foregroundPrimaryHover' colorStyle={swatchColors.foregroundPrimaryHover} />
            <Swatch name='foregroundPrimaryInverse' colorStyle={swatchColors.foregroundPrimaryInverse} />
            <Swatch name='foregroundSecondary' colorStyle={swatchColors.foregroundSecondary} />
            <Swatch name='foregroundSecondaryHover' colorStyle={swatchColors.foregroundSecondaryHover} />
            <Swatch name='foregroundSecondaryInverse' colorStyle={swatchColors.foregroundSecondaryInverse} />
            <Swatch name='foregroundDisabled' colorStyle={swatchColors.foregroundDisabled} />
          </div>
        </Section>

        <Section title='Lighten Ramp'>
          <Text as='p' size='bodySm' color='secondary'>
            Semi-transparent white overlays for layering on dark surfaces.
          </Text>
          <div {...stylex.props(styles.rampGrid)}>
            <Swatch name='lighten4' colorStyle={swatchColors.lighten4} small />
            <Swatch name='lighten6' colorStyle={swatchColors.lighten6} small />
            <Swatch name='lighten8' colorStyle={swatchColors.lighten8} small />
            <Swatch name='lighten12' colorStyle={swatchColors.lighten12} small />
            <Swatch name='lighten16' colorStyle={swatchColors.lighten16} small />
            <Swatch name='lighten50' colorStyle={swatchColors.lighten50} small />
          </div>
        </Section>

        <Section title='Darken Ramp'>
          <Text as='p' size='bodySm' color='secondary'>
            Semi-transparent black overlays for layering on light surfaces.
          </Text>
          <div {...stylex.props(styles.rampGrid)}>
            <Swatch name='darken4' colorStyle={swatchColors.darken4} small />
            <Swatch name='darken6' colorStyle={swatchColors.darken6} small />
            <Swatch name='darken8' colorStyle={swatchColors.darken8} small />
            <Swatch name='darken12' colorStyle={swatchColors.darken12} small />
            <Swatch name='darken16' colorStyle={swatchColors.darken16} small />
            <Swatch name='darken50' colorStyle={swatchColors.darken50} small />
          </div>
        </Section>

        <Section title='Hover Ramp'>
          <Text as='p' size='bodySm' color='secondary'>
            Theme-aware hover overlays — lighten in dark mode, darken in light mode.
          </Text>
          <div {...stylex.props(styles.rampGrid)}>
            <Swatch name='hover4' colorStyle={swatchColors.hover4} small />
            <Swatch name='hover6' colorStyle={swatchColors.hover6} small />
            <Swatch name='hover8' colorStyle={swatchColors.hover8} small />
            <Swatch name='hover12' colorStyle={swatchColors.hover12} small />
            <Swatch name='hover16' colorStyle={swatchColors.hover16} small />
          </div>
        </Section>

        <Section title='Border & Focus'>
          <div {...stylex.props(styles.grid)}>
            <Swatch name='border' colorStyle={swatchColors.border} />
            <Swatch name='focusOutline' colorStyle={swatchColors.focusOutline} />
          </div>
        </Section>

        <Section title='Highlight'>
          <div {...stylex.props(styles.grid)}>
            <Swatch name='highlight' colorStyle={swatchColors.highlight} />
            <Swatch name='highlightForeground' colorStyle={swatchColors.highlightForeground} />
          </div>
        </Section>

        <Section title='State'>
          <div {...stylex.props(styles.grid)}>
            <Swatch name='statePositive' colorStyle={swatchColors.statePositive} />
            <Swatch name='stateSemiPositive' colorStyle={swatchColors.stateSemiPositive} />
            <Swatch name='stateNeutral' colorStyle={swatchColors.stateNeutral} />
            <Swatch name='stateSemiNegative' colorStyle={swatchColors.stateSemiNegative} />
            <Swatch name='stateNegative' colorStyle={swatchColors.stateNegative} />
            <Swatch name='stateHighlight' colorStyle={swatchColors.stateHighlight} />
          </div>
        </Section>

        <Section title='Button'>
          <div {...stylex.props(styles.grid)}>
            <Swatch name='buttonAccentBg' colorStyle={swatchColors.buttonAccentBg} />
            <Swatch name='buttonAccentFg' colorStyle={swatchColors.buttonAccentFg} />
            <Swatch name='buttonAccentHover' colorStyle={swatchColors.buttonAccentHover} />
            <Swatch name='buttonPrimaryBg' colorStyle={swatchColors.buttonPrimaryBg} />
            <Swatch name='buttonPrimaryFg' colorStyle={swatchColors.buttonPrimaryFg} />
            <Swatch name='buttonPrimaryHover' colorStyle={swatchColors.buttonPrimaryHover} />
          </div>
        </Section>

        <Section title='Data'>
          <Text as='p' size='bodySm' color='secondary'>
            Categorical data palette for charts and visualizations.
          </Text>
          <div {...stylex.props(styles.rampGrid)}>
            <Swatch name='data1' colorStyle={swatchColors.data1} small />
            <Swatch name='data2' colorStyle={swatchColors.data2} small />
            <Swatch name='data3' colorStyle={swatchColors.data3} small />
            <Swatch name='data4' colorStyle={swatchColors.data4} small />
            <Swatch name='data5' colorStyle={swatchColors.data5} small />
            <Swatch name='data6' colorStyle={swatchColors.data6} small />
            <Swatch name='data7' colorStyle={swatchColors.data7} small />
            <Swatch name='data8' colorStyle={swatchColors.data8} small />
          </div>
        </Section>

        <Section title='Chart'>
          <div {...stylex.props(styles.grid)}>
            <Swatch name='chartAxis' colorStyle={swatchColors.chartAxis} />
            <Swatch name='chartGrid' colorStyle={swatchColors.chartGrid} />
            <Swatch name='chartCrosshair' colorStyle={swatchColors.chartCrosshair} />
            <Swatch name='chartTooltipBg' colorStyle={swatchColors.chartTooltipBg} />
            <Swatch name='chartTooltipFg' colorStyle={swatchColors.chartTooltipFg} />
          </div>
        </Section>

        <Section title='Shadow'>
          <Flex direction='column' gap='s12'>
            <div {...stylex.props(styles.swatch)}>
              <div {...stylex.props(styles.shadowBox, shadowStyles.elevated)}>
                <Text size='caption' color='secondary' style={styles.mono}>
                  shadowElevated
                </Text>
              </div>
            </div>
            <div {...stylex.props(styles.swatch)}>
              <div {...stylex.props(styles.shadowBox, shadowStyles.elevatedInner)}>
                <Text size='caption' color='secondary' style={styles.mono}>
                  shadowElevatedInner
                </Text>
              </div>
            </div>
          </Flex>
        </Section>
      </Flex>
    </DocsPage>
  );
}
