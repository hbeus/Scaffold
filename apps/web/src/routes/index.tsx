import { Flex, Pressable, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronRight } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

import { Link } from '~/components/Link';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const styles = stylex.create({
  main: {
    maxWidth: '640px',
    minHeight: '100vh',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  navLink: {
    paddingBlock: spacing.s16,
  },
});

function HomePage() {
  return (
    <Flex as='main' direction='column' gap='s40' style={styles.main}>
      <Flex as='header' direction='column' gap='s4' style={styles.header}>
        <Text as='h1' size='hero'>
          Base
        </Text>
        <Text as='p' size='display' color='secondary'>
          Simple monorepo starter built with TanStack Start, StyleX, and Base UI.
        </Text>
      </Flex>
      <section>
        <Text as='h2' size='label' weight='medium' color='secondary'>
          Patterns
        </Text>
        <nav {...stylex.props(styles.nav)}>
          <Pressable inset='s16' role='link'>
            <Link to='/data'>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Flex direction='column' gap='s4'>
                  <Text>Data Fetching</Text>
                  <Text size='bodySm' color='secondary'>
                    Server functions with React Query hydration
                  </Text>
                </Flex>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
          <Pressable inset='s16' role='link'>
            <Link to='/mock'>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Flex direction='column' gap='s4'>
                  <Text>Mock App</Text>
                  <Text size='bodySm' color='secondary'>
                    Full SaaS landing page with components in context
                  </Text>
                </Flex>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
        </nav>
      </section>
    </Flex>
  );
}
