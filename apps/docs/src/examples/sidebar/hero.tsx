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

export default function SidebarHero() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <Sidebar.Root activeId='overview' style={styles.sidebar}>
        <Sidebar.Anchor id='overview' href='#overview'>
          Overview
        </Sidebar.Anchor>
        <Sidebar.Anchor id='features' href='#features'>
          Features
        </Sidebar.Anchor>
        <Sidebar.Anchor id='api' href='#api'>
          API
        </Sidebar.Anchor>
        <Sidebar.Anchor id='examples' href='#examples'>
          Examples
        </Sidebar.Anchor>
      </Sidebar.Root>
    </div>
  );
}
