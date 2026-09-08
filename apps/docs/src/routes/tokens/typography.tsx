import { Text } from '@base/ui';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/tokens/typography')({
  component: TypographyPage,
});

const sampleText = 'The quick brown fox jumps over the lazy dog';
const sampleParagraph =
  'Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.';

const scales = [
  { name: 'Hero', size: 'hero', px: 32, ratio: 1.2 },
  { name: 'Display', size: 'display', px: 28, ratio: 1.2 },
  { name: 'Headline', size: 'headline', px: 22, ratio: 1.2 },
  { name: 'Title', size: 'title', px: 18, ratio: 1.4 },
  { name: 'Body', size: 'body', px: 15, ratio: 1.4 },
  { name: 'Body Sm', size: 'bodySm', px: 13, ratio: 1.4 },
  { name: 'Label', size: 'label', px: 12, ratio: 1.4 },
  { name: 'Caption', size: 'caption', px: 11, ratio: 1.4 },
] as const;

const styles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
  sectionTitle: {
    marginBottom: spacing.s16,
    paddingBottom: spacing.s12,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  scaleRow: {
    paddingBlock: spacing.s20,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  scaleRowLast: {
    borderBottomWidth: 0,
  },
  scaleMeta: {
    display: 'flex',
    alignItems: 'baseline',
    gap: spacing.s12,
    marginBottom: spacing.s8,
  },
  scaleName: {
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    minWidth: '80px',
  },
  mono: {
    fontFamily: typography.fontMono,
  },
  weightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.s24,
  },
  weightCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s6,
  },
  paragraphGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: spacing.s32,
  },
  paragraphColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
  uppercase: {
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: spacing.s24,
  },
  colorCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    padding: spacing.s20,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
  },
  mixedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s16,
  },
});

function TypographyPage() {
  return (
    <DocsPage
      title='Typography'
      description={
        <>
          Eight steps from 11px to 32px via{' '}
          <InlineCode>@base/ui/tokens/typography.stylex</InlineCode>. Unitless line-heights: 1.2
          headings, 1.4 body.
        </>
      }
    >
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='headline' weight='semibold' style={styles.sectionTitle}>
          Type Scale
        </Text>
        {scales.map((s, i) => (
          <div
            key={s.size}
            {...stylex.props(styles.scaleRow, i === scales.length - 1 && styles.scaleRowLast)}
          >
            <div {...stylex.props(styles.scaleMeta)}>
              <Text size='label' weight='semibold' color='secondary' style={styles.scaleName}>
                {s.name}
              </Text>
              <Text size='caption' color='secondary' style={styles.mono}>
                {s.px}px / {s.ratio} line-height
              </Text>
            </div>
            <Text size={s.size} weight='medium'>
              {sampleText}
            </Text>
          </div>
        ))}
      </section>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='headline' weight='semibold' style={styles.sectionTitle}>
          Weights
        </Text>
        <div {...stylex.props(styles.weightsGrid)}>
          {(['regular', 'medium', 'semibold', 'bold'] as const).map(w => (
            <div key={w} {...stylex.props(styles.weightCard)}>
              <Text size='caption' color='secondary' style={styles.mono}>
                {w}
              </Text>
              <Text size='headline' weight={w}>
                Aa
              </Text>
              <Text size='body' weight={w}>
                {sampleText}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='headline' weight='semibold' style={styles.sectionTitle}>
          Paragraph Readability
        </Text>
        <div {...stylex.props(styles.paragraphGrid)}>
          <div {...stylex.props(styles.paragraphColumn)}>
            <Text size='label' weight='semibold' color='secondary' style={styles.uppercase}>
              Body (15px / 1.4)
            </Text>
            <Text size='body' weight='regular'>
              {sampleParagraph}
            </Text>
          </div>
          <div {...stylex.props(styles.paragraphColumn)}>
            <Text size='label' weight='semibold' color='secondary' style={styles.uppercase}>
              Body Sm (13px / 1.4)
            </Text>
            <Text size='bodySm' weight='regular'>
              {sampleParagraph}
            </Text>
          </div>
          <div {...stylex.props(styles.paragraphColumn)}>
            <Text size='label' weight='semibold' color='secondary' style={styles.uppercase}>
              Label (12px / 1.4)
            </Text>
            <Text size='label' weight='regular'>
              {sampleParagraph}
            </Text>
          </div>
          <div {...stylex.props(styles.paragraphColumn)}>
            <Text size='label' weight='semibold' color='secondary' style={styles.uppercase}>
              Caption (11px / 1.4)
            </Text>
            <Text size='caption' weight='regular'>
              {sampleParagraph}
            </Text>
          </div>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='headline' weight='semibold' style={styles.sectionTitle}>
          Color Variants
        </Text>
        <div {...stylex.props(styles.colorGrid)}>
          <div {...stylex.props(styles.colorCard)}>
            <Text size='label' weight='semibold' color='secondary'>
              PRIMARY
            </Text>
            <Text size='headline' color='primary'>
              Main content text
            </Text>
            <Text size='body' color='primary'>
              {sampleParagraph}
            </Text>
          </div>
          <div {...stylex.props(styles.colorCard)}>
            <Text size='label' weight='semibold' color='secondary'>
              SECONDARY
            </Text>
            <Text size='headline' color='secondary'>
              Supporting text
            </Text>
            <Text size='body' color='secondary'>
              {sampleParagraph}
            </Text>
          </div>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='headline' weight='semibold' style={styles.sectionTitle}>
          Monospace
        </Text>
        {(['body', 'bodySm', 'label', 'caption'] as const).map(s => {
          const scale = scales.find(sc => sc.size === s);
          return (
            <div key={s} {...stylex.props(styles.scaleRow)}>
              <div {...stylex.props(styles.scaleMeta)}>
                <Text size='label' weight='semibold' color='secondary' style={styles.scaleName}>
                  {scale?.name}
                </Text>
                <Text size='caption' color='secondary' style={styles.mono}>
                  {scale?.px}px mono
                </Text>
              </div>
              <Text size={s} weight='regular' style={styles.mono}>
                const result = await db.query(users).where(eq(users.id, 42));
              </Text>
            </div>
          );
        })}
      </section>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='headline' weight='semibold' style={styles.sectionTitle}>
          Mixed Content
        </Text>
        <div {...stylex.props(styles.mixedSection)}>
          <Text as='h1' size='hero' weight='bold'>
            Project Dashboard
          </Text>
          <Text as='p' size='body' weight='regular' color='secondary'>
            Overview of your active projects and recent activity across all workspaces.
          </Text>
          <Text as='h2' size='display' weight='semibold'>
            Active Projects
          </Text>
          <Text as='h3' size='headline' weight='semibold'>
            Design System v2
          </Text>
          <Text as='p' size='body' weight='regular'>
            A comprehensive overhaul of the component library, introducing new tokens, updated
            spacing scale, and improved accessibility patterns.
          </Text>
          <Text as='h3' size='title' weight='medium'>
            Recent Updates
          </Text>
          <Text as='p' size='bodySm' weight='regular' color='secondary'>
            Typography tokens were reorganised on 5 July 2026. The type scale now uses unitless
            line-heights grouped by role: 1.2 for headings, 1.4 for body.
          </Text>
          <Text size='label' weight='medium' color='secondary'>
            Last updated 3 minutes ago
          </Text>
          <Text size='caption' color='secondary'>
            Build #4821 deployed to production
          </Text>
        </div>
      </section>
    </DocsPage>
  );
}
