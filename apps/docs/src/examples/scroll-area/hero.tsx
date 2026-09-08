import { ScrollArea, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    height: 200,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    padding: spacing.s8,
  },
});

export default function ScrollAreaHero() {
  return (
    <ScrollArea.Root style={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div {...stylex.props(styles.content)}>
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i} size='bodySm' color='secondary'>
                Scrollable item {i + 1}
              </Text>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
