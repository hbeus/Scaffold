import { ButtonState, Flex, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import {
  COLOR_SCHEMES,
  type ColorScheme,
  PALETTES,
  type Palette,
  THEME,
  themeMap,
} from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute, Link } from '@tanstack/react-router';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/tokens/themes')({
  component: ThemesPage,
});

const STATE_VARIANTS = [
  'positive',
  'semiPositive',
  'neutral',
  'semiNegative',
  'negative',
  'highlight',
] as const;

const styles = stylex.create({
  link: {
    color: 'inherit',
    textDecoration: 'underline',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: spacing.s16,
  },
  themeCard: {
    padding: spacing.s20,
    borderRadius: '12px',
  },
  themeLabel: {
    marginBottom: spacing.s16,
  },
  section: {
    marginBottom: spacing.s16,
  },
  sectionLabel: {
    marginBottom: spacing.s8,
  },
  swatchGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.s8,
  },
  swatch: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.s4,
  },
  swatchColor: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
  },
  fgRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
  },
  fgDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
  },
  accentRow: {
    display: 'flex',
    gap: spacing.s8,
    alignItems: 'center',
  },
  accentBtn: {
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    borderRadius: '8px',
    borderWidth: 0,
    fontWeight: 500,
    fontSize: '0.8rem',
  },
});

function StateSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div {...stylex.props(styles.swatch)}>
      <div {...stylex.props(styles.swatchColor)} style={{ backgroundColor: `oklch(${color})` }} />
      <Text size='label' color='secondary'>
        {label}
      </Text>
    </div>
  );
}

function ThemeCard({ palette, scheme }: { palette: Palette; scheme: ColorScheme }) {
  const themeKey = `${palette}-${scheme}` as const;
  const themeOverride = themeMap[themeKey];
  const mode = THEME[palette][scheme];

  return (
    <div
      {...stylex.props(styles.themeCard, themeOverride ?? undefined)}
      style={{ backgroundColor: `oklch(${mode.background.base})` }}
    >
      <Text as='h3' size='body' weight='semibold' style={styles.themeLabel}>
        {palette} / {scheme}
      </Text>

      <div {...stylex.props(styles.section)}>
        <Text size='label' color='secondary' style={styles.sectionLabel}>
          States
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          {STATE_VARIANTS.map(variant => (
            <StateSwatch key={variant} color={mode.state[variant]} label={variant} />
          ))}
        </div>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text size='label' color='secondary' style={styles.sectionLabel}>
          ButtonState
        </Text>
        <Flex direction='column' gap='s4'>
          {STATE_VARIANTS.map(variant => (
            <ButtonState key={variant} variant={variant} size='sm'>
              {variant}
            </ButtonState>
          ))}
        </Flex>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text size='label' color='secondary' style={styles.sectionLabel}>
          Foreground hover
        </Text>
        <div {...stylex.props(styles.fgRow)}>
          <div
            {...stylex.props(styles.fgDot)}
            style={{ backgroundColor: `oklch(${mode.foreground.primary})` }}
          />
          <Text size='label' color='secondary'>
            primary
          </Text>
          <Text size='label' color='secondary'>
            →
          </Text>
          <div
            {...stylex.props(styles.fgDot)}
            style={{ backgroundColor: `oklch(${mode.foreground.primaryHover})` }}
          />
          <Text size='label' color='secondary'>
            hover
          </Text>
        </div>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text size='label' color='secondary' style={styles.sectionLabel}>
          Accent button
        </Text>
        <div {...stylex.props(styles.accentRow)}>
          <button
            type='button'
            {...stylex.props(styles.accentBtn)}
            style={{
              backgroundColor: `oklch(${mode.button.accentBg})`,
              color: `oklch(${mode.button.accentFg})`,
            }}
          >
            Accent
          </button>
          <button
            type='button'
            {...stylex.props(styles.accentBtn)}
            style={{
              backgroundColor: `oklch(${mode.button.accentHover})`,
              color: `oklch(${mode.button.accentFg})`,
            }}
          >
            Hover
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemesPage() {
  return (
    <DocsPage
      title='Themes'
      description={
        <>
          OKLCH-generated palette × scheme combos via <InlineCode>themeMap</InlineCode>. Each card
          applies its own <InlineCode>createTheme</InlineCode> override. Edit configs and run{' '}
          <InlineCode>pnpm generate:themes</InlineCode> — details in the{' '}
          <Link to='/guides/theming' {...stylex.props(styles.link)}>
            Theming
          </Link>{' '}
          guide.
        </>
      }
    >
      <div {...stylex.props(styles.grid)}>
        {PALETTES.flatMap(palette =>
          COLOR_SCHEMES.map(scheme => (
            <ThemeCard key={`${palette}-${scheme}`} palette={palette} scheme={scheme} />
          )),
        )}
      </div>
    </DocsPage>
  );
}
