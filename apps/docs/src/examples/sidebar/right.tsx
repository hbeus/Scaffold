import { Sidebar } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  sidebar: {
    position: 'absolute',
    display: 'flex',
    paddingBlock: spacing.s16,
  },
});

export default function SidebarRight() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <Sidebar.Root activeId='intro' position='right' style={styles.sidebar}>
        <Sidebar.Anchor id='intro' href='#intro'>
          Introduction
        </Sidebar.Anchor>
        <Sidebar.Anchor id='setup' href='#setup'>
          Setup
        </Sidebar.Anchor>
        <Sidebar.Anchor id='usage' href='#usage'>
          Usage
        </Sidebar.Anchor>
      </Sidebar.Root>
    </div>
  );
}
