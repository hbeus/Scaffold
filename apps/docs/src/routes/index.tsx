import { Flex, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const styles = stylex.create({
  page: {
    paddingBlock: spacing.s64,
  },
});

function HomePage() {
  return (
    <Flex direction='column' gap='s16' style={styles.page}>
      <Text as='h1' size='hero'>
        Base UI
      </Text>
      <Text as='p' size='headline' color='secondary'>
        A component library built on Base UI primitives, styled with StyleX tokens, and animated
        with Motion.
      </Text>
      <Text as='p' size='body' color='secondary'>
        Browse the component library using the sidebar navigation. Each page shows live examples
        with variants, sizes, and states.
      </Text>
    </Flex>
  );
}
