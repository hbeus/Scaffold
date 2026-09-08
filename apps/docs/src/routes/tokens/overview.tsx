import { Flex, Text } from '@base/ui';
import { borders } from '@base/ui/tokens/borders.stylex';
import { elementSize } from '@base/ui/tokens/elementSize.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { size } from '@base/ui/tokens/size.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute, Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/tokens/overview')({
  component: OverviewPage,
});

const styles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s24,
  },
  sectionTitle: {
    paddingBottom: spacing.s12,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  subsection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
  swatchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
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
  rampGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: spacing.s8,
  },
  previewColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s12,
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  mono: {
    fontFamily: typography.fontMono,
  },
  radiiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: spacing.s12,
  },
  radiiBox: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: colors.lighten8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s12,
  },
  spacingLabel: {
    minWidth: '48px',
  },
  spacingBar: {
    height: spacing.s16,
    backgroundColor: colors.highlight,
    borderRadius: radii.r4,
  },
  sizeBar: {
    height: spacing.s12,
    backgroundColor: colors.buttonAccentBg,
    borderRadius: radii.r4,
  },
  elementSizeBar: {
    backgroundColor: colors.lighten8,
    borderRadius: radii.r8,
    display: 'flex',
    alignItems: 'center',
    paddingInline: spacing.s12,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    paddingBlock: spacing.s8,
    paddingInline: spacing.s8,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  td: {
    paddingBlock: spacing.s8,
    paddingInline: spacing.s8,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  borderDemo: {
    width: '100%',
    height: spacing.s48,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r8,
    backgroundColor: colors.lighten4,
  },
  link: {
    color: colors.highlight,
    textDecoration: 'underline',
  },
});

const swatchColors = stylex.create({
  background: { backgroundColor: colors.background },
  foregroundPrimary: { backgroundColor: colors.foregroundPrimary },
  foregroundPrimaryHover: { backgroundColor: colors.foregroundPrimaryHover },
  foregroundPrimaryInverse: { backgroundColor: colors.foregroundPrimaryInverse },
  foregroundSecondary: { backgroundColor: colors.foregroundSecondary },
  foregroundSecondaryHover: { backgroundColor: colors.foregroundSecondaryHover },
  foregroundSecondaryInverse: { backgroundColor: colors.foregroundSecondaryInverse },
  foregroundDisabled: { backgroundColor: colors.foregroundDisabled },
  border: { backgroundColor: colors.border },
  highlight: { backgroundColor: colors.highlight },
  highlightForeground: { backgroundColor: colors.highlightForeground },
  statePositive: { backgroundColor: colors.statePositive },
  stateNegative: { backgroundColor: colors.stateNegative },
  surface300: { backgroundColor: colors.surface300 },
  focusOutline: { backgroundColor: colors.focusOutline },
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
  buttonAccentBg: { backgroundColor: colors.buttonAccentBg },
  buttonAccentFg: { backgroundColor: colors.buttonAccentFg },
  buttonAccentHover: { backgroundColor: colors.buttonAccentHover },
  buttonPrimaryBg: { backgroundColor: colors.buttonPrimaryBg },
  buttonPrimaryFg: { backgroundColor: colors.buttonPrimaryFg },
  buttonPrimaryHover: { backgroundColor: colors.buttonPrimaryHover },
});

const spacingBarWidths = stylex.create({
  s1: { width: spacing.s1 },
  s2: { width: spacing.s2 },
  s4: { width: spacing.s4 },
  s6: { width: spacing.s6 },
  s8: { width: spacing.s8 },
  s10: { width: spacing.s10 },
  s12: { width: spacing.s12 },
  s14: { width: spacing.s14 },
  s16: { width: spacing.s16 },
  s18: { width: spacing.s18 },
  s20: { width: spacing.s20 },
  s24: { width: spacing.s24 },
  s28: { width: spacing.s28 },
  s32: { width: spacing.s32 },
  s40: { width: spacing.s40 },
  s48: { width: spacing.s48 },
  s56: { width: spacing.s56 },
  s64: { width: spacing.s64 },
  s72: { width: spacing.s72 },
  s80: { width: spacing.s80 },
  s96: { width: spacing.s96 },
  s112: { width: spacing.s112 },
  s128: { width: spacing.s128 },
});

const sizeBarWidths = stylex.create({
  s4: { width: size.s4 },
  s8: { width: size.s8 },
  s12: { width: size.s12 },
  s16: { width: size.s16 },
  s24: { width: size.s24 },
  s32: { width: size.s32 },
  s40: { width: size.s40 },
  s48: { width: size.s48 },
  s64: { width: size.s64 },
  s80: { width: size.s80 },
  s96: { width: size.s96 },
  s128: { width: size.s128 },
});

const elementSizeHeights = stylex.create({
  xs: { height: elementSize.xs },
  sm: { height: elementSize.sm },
  md: { height: elementSize.md },
  lg: { height: elementSize.lg },
  xl: { height: elementSize.xl },
});

const radiiBoxStyles = stylex.create({
  r2: { borderRadius: radii.r2 },
  r4: { borderRadius: radii.r4 },
  r6: { borderRadius: radii.r6 },
  r8: { borderRadius: radii.r8 },
  r10: { borderRadius: radii.r10 },
  r12: { borderRadius: radii.r12 },
  r14: { borderRadius: radii.r14 },
  r16: { borderRadius: radii.r16 },
  r20: { borderRadius: radii.r20 },
  r24: { borderRadius: radii.r24 },
  r32: { borderRadius: radii.r32 },
  full: { borderRadius: radii.full },
});

const borderWidths = stylex.create({
  default: { borderWidth: borders.default },
  focus: { borderWidth: borders.focus },
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

function ColorTokensSection() {
  return (
    <Section title='Colors'>
      <Text as='p' size='bodySm' color='secondary'>
        Semantic <InlineCode>colors</InlineCode> from{' '}
        <InlineCode>@base/ui/tokens/themes.stylex</InlineCode>. Values follow the active app theme.
        Compare palettes on{' '}
        <Link to='/tokens/themes' {...stylex.props(styles.link)}>
          Themes
        </Link>
        .
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary'>
          Core
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='background' colorStyle={swatchColors.background} />
          <Swatch name='surface300' colorStyle={swatchColors.surface300} />
          <Swatch name='border' colorStyle={swatchColors.border} />
          <Swatch name='highlight' colorStyle={swatchColors.highlight} />
          <Swatch name='highlightFg' colorStyle={swatchColors.highlightForeground} />
          <Swatch name='focusOutline' colorStyle={swatchColors.focusOutline} />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary'>
          Foreground
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='primary' colorStyle={swatchColors.foregroundPrimary} />
          <Swatch name='primaryHover' colorStyle={swatchColors.foregroundPrimaryHover} />
          <Swatch name='primaryInverse' colorStyle={swatchColors.foregroundPrimaryInverse} />
          <Swatch name='secondary' colorStyle={swatchColors.foregroundSecondary} />
          <Swatch name='secondaryHover' colorStyle={swatchColors.foregroundSecondaryHover} />
          <Swatch name='secondaryInverse' colorStyle={swatchColors.foregroundSecondaryInverse} />
          <Swatch name='disabled' colorStyle={swatchColors.foregroundDisabled} />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary'>
          State
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='positive' colorStyle={swatchColors.statePositive} />
          <Swatch name='negative' colorStyle={swatchColors.stateNegative} />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary'>
          Lighten ramp
        </Text>
        <div {...stylex.props(styles.rampGrid)}>
          <Swatch name='4' colorStyle={swatchColors.lighten4} small />
          <Swatch name='6' colorStyle={swatchColors.lighten6} small />
          <Swatch name='8' colorStyle={swatchColors.lighten8} small />
          <Swatch name='12' colorStyle={swatchColors.lighten12} small />
          <Swatch name='16' colorStyle={swatchColors.lighten16} small />
          <Swatch name='50' colorStyle={swatchColors.lighten50} small />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary'>
          Darken ramp
        </Text>
        <div {...stylex.props(styles.rampGrid)}>
          <Swatch name='4' colorStyle={swatchColors.darken4} small />
          <Swatch name='6' colorStyle={swatchColors.darken6} small />
          <Swatch name='8' colorStyle={swatchColors.darken8} small />
          <Swatch name='12' colorStyle={swatchColors.darken12} small />
          <Swatch name='16' colorStyle={swatchColors.darken16} small />
          <Swatch name='50' colorStyle={swatchColors.darken50} small />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary'>
          Hover ramp
        </Text>
        <div {...stylex.props(styles.rampGrid)}>
          <Swatch name='4' colorStyle={swatchColors.hover4} small />
          <Swatch name='6' colorStyle={swatchColors.hover6} small />
          <Swatch name='8' colorStyle={swatchColors.hover8} small />
          <Swatch name='12' colorStyle={swatchColors.hover12} small />
          <Swatch name='16' colorStyle={swatchColors.hover16} small />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary'>
          Button
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='accentBg' colorStyle={swatchColors.buttonAccentBg} />
          <Swatch name='accentFg' colorStyle={swatchColors.buttonAccentFg} />
          <Swatch name='accentHover' colorStyle={swatchColors.buttonAccentHover} />
          <Swatch name='primaryBg' colorStyle={swatchColors.buttonPrimaryBg} />
          <Swatch name='primaryFg' colorStyle={swatchColors.buttonPrimaryFg} />
          <Swatch name='primaryHover' colorStyle={swatchColors.buttonPrimaryHover} />
        </div>
      </div>
    </Section>
  );
}

function RadiiSection() {
  const radiiValues = [
    'r2',
    'r4',
    'r6',
    'r8',
    'r10',
    'r12',
    'r14',
    'r16',
    'r20',
    'r24',
    'r32',
    'full',
  ] as const;

  return (
    <Section title='Radii'>
      <Text as='p' size='bodySm' color='secondary'>
        <InlineCode>@base/ui/tokens/radii.stylex</InlineCode>
      </Text>
      <div {...stylex.props(styles.radiiGrid)}>
        {radiiValues.map(r => (
          <div key={r} {...stylex.props(styles.swatch)}>
            <div {...stylex.props(styles.radiiBox, radiiBoxStyles[r])} />
            <Text size='caption' color='secondary' style={styles.mono}>
              {r}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SpacingSection() {
  const spacingValues = [
    { name: 's1', px: 1 },
    { name: 's2', px: 2 },
    { name: 's4', px: 4 },
    { name: 's6', px: 6 },
    { name: 's8', px: 8 },
    { name: 's10', px: 10 },
    { name: 's12', px: 12 },
    { name: 's14', px: 14 },
    { name: 's16', px: 16 },
    { name: 's18', px: 18 },
    { name: 's20', px: 20 },
    { name: 's24', px: 24 },
    { name: 's28', px: 28 },
    { name: 's32', px: 32 },
    { name: 's40', px: 40 },
    { name: 's48', px: 48 },
    { name: 's56', px: 56 },
    { name: 's64', px: 64 },
    { name: 's72', px: 72 },
    { name: 's80', px: 80 },
    { name: 's96', px: 96 },
    { name: 's112', px: 112 },
    { name: 's128', px: 128 },
  ] as const;

  return (
    <Section title='Spacing'>
      <Text as='p' size='bodySm' color='secondary'>
        Padding, margin, and gap — <InlineCode>@base/ui/tokens/spacing.stylex</InlineCode>
      </Text>
      <Flex direction='column' gap='s4'>
        {spacingValues.map(s => (
          <div key={s.name} {...stylex.props(styles.spacingRow)}>
            <Text size='caption' color='secondary' style={[styles.mono, styles.spacingLabel]}>
              {s.name}
            </Text>
            <div {...stylex.props(styles.spacingBar, spacingBarWidths[s.name])} />
            <Text size='caption' color='secondary' style={styles.mono}>
              {s.px}px
            </Text>
          </div>
        ))}
      </Flex>
    </Section>
  );
}

function SizeSection() {
  const sizeValues = [
    { name: 's4', px: 4 },
    { name: 's8', px: 8 },
    { name: 's12', px: 12 },
    { name: 's16', px: 16 },
    { name: 's24', px: 24 },
    { name: 's32', px: 32 },
    { name: 's40', px: 40 },
    { name: 's48', px: 48 },
    { name: 's64', px: 64 },
    { name: 's80', px: 80 },
    { name: 's96', px: 96 },
    { name: 's128', px: 128 },
  ] as const;

  return (
    <Section title='Size'>
      <Text as='p' size='bodySm' color='secondary'>
        Arbitrary dimensions (width/height) — <InlineCode>@base/ui/tokens/size.stylex</InlineCode>.
        Full scale includes negatives (<InlineCode>n1</InlineCode>, <InlineCode>n2</InlineCode>) and
        steps through <InlineCode>s128</InlineCode>.
      </Text>
      <Flex direction='column' gap='s4'>
        {sizeValues.map(s => (
          <div key={s.name} {...stylex.props(styles.spacingRow)}>
            <Text size='caption' color='secondary' style={[styles.mono, styles.spacingLabel]}>
              {s.name}
            </Text>
            <div {...stylex.props(styles.sizeBar, sizeBarWidths[s.name])} />
            <Text size='caption' color='secondary' style={styles.mono}>
              {s.px}px
            </Text>
          </div>
        ))}
      </Flex>
    </Section>
  );
}

function ElementSizeSection() {
  const sizes = [
    { name: 'xs', px: 28 },
    { name: 'sm', px: 32 },
    { name: 'md', px: 36 },
    { name: 'lg', px: 40 },
    { name: 'xl', px: 44 },
  ] as const;

  return (
    <Section title='Element sizes'>
      <Text as='p' size='bodySm' color='secondary'>
        Component heights — <InlineCode>@base/ui/tokens/elementSize.stylex</InlineCode>
      </Text>
      <Flex direction='column' gap='s8'>
        {sizes.map(s => (
          <div key={s.name} {...stylex.props(styles.elementSizeBar, elementSizeHeights[s.name])}>
            <Text size='caption' color='secondary' style={styles.mono}>
              {s.name} — {s.px}px
            </Text>
          </div>
        ))}
      </Flex>
    </Section>
  );
}

function BordersSection() {
  return (
    <Section title='Borders'>
      <Text as='p' size='bodySm' color='secondary'>
        <InlineCode>@base/ui/tokens/borders.stylex</InlineCode>
      </Text>
      <Flex direction='column' gap='s12'>
        {(['default', 'focus'] as const).map(name => (
          <div key={name} {...stylex.props(styles.subsection)}>
            <Text size='caption' color='secondary' style={styles.mono}>
              {name}
            </Text>
            <div {...stylex.props(styles.borderDemo, borderWidths[name])} />
          </div>
        ))}
      </Flex>
    </Section>
  );
}

function BreakpointsSection() {
  const entries = [
    { name: 'sm', value: '@media (max-width: 640px)' },
    { name: 'md', value: '@media (max-width: 768px)' },
    { name: 'lg', value: '@media (max-width: 1024px)' },
    { name: 'xl', value: '@media (max-width: 1280px)' },
  ] as const;

  return (
    <Section title='Breakpoints'>
      <Text as='p' size='bodySm' color='secondary'>
        StyleX <InlineCode>defineConsts</InlineCode> media queries —{' '}
        <InlineCode>@base/ui/tokens/breakpoints.stylex</InlineCode>
      </Text>
      <table {...stylex.props(styles.table)}>
        <thead>
          <tr>
            <th {...stylex.props(styles.th)}>
              <Text size='label' weight='semibold'>
                Token
              </Text>
            </th>
            <th {...stylex.props(styles.th)}>
              <Text size='label' weight='semibold'>
                Query
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.name}>
              <td {...stylex.props(styles.td)}>
                <Text size='caption' style={styles.mono}>
                  {entry.name}
                </Text>
              </td>
              <td {...stylex.props(styles.td)}>
                <Text size='caption' color='secondary' style={styles.mono}>
                  {entry.value}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function ZIndexSection() {
  const entries = [
    { name: 'base', value: '0' },
    { name: 'raised', value: '1' },
    { name: 'dropdown', value: '10' },
    { name: 'sticky', value: '20' },
    { name: 'fixed', value: '30' },
    { name: 'overlay', value: '40' },
    { name: 'modalBackdrop', value: '50' },
    { name: 'modal', value: '51' },
    { name: 'popover', value: '60' },
    { name: 'tooltip', value: '70' },
    { name: 'toast', value: '80' },
    { name: 'max', value: '9999' },
  ] as const;

  return (
    <Section title='Z-index'>
      <Text as='p' size='bodySm' color='secondary'>
        <InlineCode>@base/ui/tokens/zIndex.stylex</InlineCode>
      </Text>
      <table {...stylex.props(styles.table)}>
        <thead>
          <tr>
            <th {...stylex.props(styles.th)}>
              <Text size='label' weight='semibold'>
                Token
              </Text>
            </th>
            <th {...stylex.props(styles.th)}>
              <Text size='label' weight='semibold'>
                Value
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.name}>
              <td {...stylex.props(styles.td)}>
                <Text size='caption' style={styles.mono}>
                  {entry.name}
                </Text>
              </td>
              <td {...stylex.props(styles.td)}>
                <Text size='caption' color='secondary' style={styles.mono}>
                  {entry.value}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function EasingSection() {
  const groups = [
    {
      title: 'In',
      entries: [
        { name: 'inQuad', value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)' },
        { name: 'inCubic', value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' },
        { name: 'inQuart', value: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)' },
        { name: 'inQuint', value: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)' },
        { name: 'inExpo', value: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)' },
        { name: 'inCirc', value: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)' },
      ],
    },
    {
      title: 'Out',
      entries: [
        { name: 'outQuad', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        { name: 'outCubic', value: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
        { name: 'outQuart', value: 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
        { name: 'outQuint', value: 'cubic-bezier(0.23, 1, 0.32, 1)' },
        { name: 'outExpo', value: 'cubic-bezier(0.19, 1, 0.22, 1)' },
        { name: 'outCirc', value: 'cubic-bezier(0.075, 0.82, 0.165, 1)' },
        { name: 'outFluid', value: 'cubic-bezier(0.32, 0.72, 0, 1)' },
      ],
    },
    {
      title: 'In-out',
      entries: [
        { name: 'inOutQuad', value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' },
        { name: 'inOutCubic', value: 'cubic-bezier(0.645, 0.045, 0.355, 1)' },
        { name: 'inOutQuart', value: 'cubic-bezier(0.77, 0, 0.175, 1)' },
        { name: 'inOutQuint', value: 'cubic-bezier(0.86, 0, 0.07, 1)' },
        { name: 'inOutExpo', value: 'cubic-bezier(1, 0, 0, 1)' },
        { name: 'inOutCirc', value: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)' },
      ],
    },
  ];

  return (
    <Section title='Easing'>
      <Text as='p' size='bodySm' color='secondary'>
        Cubic-bezier curves as <InlineCode>easing</InlineCode> —{' '}
        <InlineCode>@base/ui/tokens/transitionTiming.stylex</InlineCode>
      </Text>
      <Flex direction='column' gap='s24'>
        {groups.map(group => (
          <div key={group.title} {...stylex.props(styles.subsection)}>
            <Text as='h3' size='label' weight='medium' color='secondary'>
              {group.title}
            </Text>
            <Flex direction='column' gap='s4'>
              {group.entries.map(entry => (
                <Text key={entry.name} size='caption' style={styles.mono}>
                  {entry.name} — {entry.value}
                </Text>
              ))}
            </Flex>
          </div>
        ))}
      </Flex>
    </Section>
  );
}

function TypographySection() {
  return (
    <Section title='Typography'>
      <Text as='p' size='bodySm' color='secondary'>
        <InlineCode>@base/ui/tokens/typography.stylex</InlineCode> — see also{' '}
        <Link to='/tokens/typography' {...stylex.props(styles.link)}>
          Typography
        </Link>
        .
      </Text>
      <div {...stylex.props(styles.previewColumn)}>
        <Text size='hero'>Hero — 32px</Text>
        <Text size='display'>Display — 28px</Text>
        <Text size='headline'>Headline — 22px</Text>
        <Text size='title'>Title — 18px</Text>
        <Text size='body'>Body — 15px</Text>
        <Text size='bodySm'>Body Sm — 13px</Text>
        <Text size='label'>Label — 12px</Text>
        <Text size='caption'>Caption — 11px</Text>
      </div>
    </Section>
  );
}

function OverviewPage() {
  return (
    <DocsPage
      title='Overview'
      description={
        <>
          Design tokens at a glance. Import from <InlineCode>@base/ui/tokens/*.stylex</InlineCode>.
          Colors are generated into <InlineCode>themes.stylex</InlineCode> — see{' '}
          <Link to='/tokens/themes' {...stylex.props(styles.link)}>
            Themes
          </Link>{' '}
          and the{' '}
          <Link to='/guides/theming' {...stylex.props(styles.link)}>
            Theming
          </Link>{' '}
          guide.
        </>
      }
    >
      <ColorTokensSection />
      <RadiiSection />
      <SpacingSection />
      <SizeSection />
      <ElementSizeSection />
      <BordersSection />
      <BreakpointsSection />
      <ZIndexSection />
      <EasingSection />
      <TypographySection />
    </DocsPage>
  );
}
