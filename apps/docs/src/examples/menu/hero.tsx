import { Menu, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronDown } from '@tabler/icons-react';

const overviewLinks = [
  {
    href: '#quick-start',
    title: 'Quick Start',
    description: 'Install and assemble your first component.',
  },
  {
    href: '#accessibility',
    title: 'Accessibility',
    description: 'Learn how we build accessible components.',
  },
  {
    href: '#releases',
    title: 'Releases',
    description: "See what's new in the latest versions.",
  },
  {
    href: '#about',
    title: 'About',
    description: 'Learn more about the project and mission.',
  },
] as const;

const handbookLinks = [
  {
    href: '#styling',
    title: 'Styling',
    description: 'Style with StyleX and design tokens.',
  },
  {
    href: '#animation',
    title: 'Animation',
    description: 'Animate with motion.dev transitions.',
  },
  {
    href: '#composition',
    title: 'Composition',
    description: 'Compose parts with the render prop.',
  },
] as const;

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.s4,
    minWidth: 320,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
    minWidth: 240,
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.s4,
    textDecoration: 'none',
    width: '100%',
  },
});

export default function MenuHero() {
  return (
    <Menu.Root>
      <Menu.List>
        <Menu.Item>
          <Menu.Trigger>
            Overview
            <Menu.Icon>
              <IconChevronDown size={14} />
            </Menu.Icon>
          </Menu.Trigger>
          <Menu.Content>
            <div {...stylex.props(styles.grid)}>
              {overviewLinks.map((item) => (
                <Menu.Link key={item.href} href={item.href} style={styles.link}>
                  <Text size='bodySm' weight='medium'>
                    {item.title}
                  </Text>
                  <Text size='caption' color='secondary'>
                    {item.description}
                  </Text>
                </Menu.Link>
              ))}
            </div>
          </Menu.Content>
        </Menu.Item>

        <Menu.Item>
          <Menu.Trigger>
            Handbook
            <Menu.Icon>
              <IconChevronDown size={14} />
            </Menu.Icon>
          </Menu.Trigger>
          <Menu.Content>
            <div {...stylex.props(styles.list)}>
              {handbookLinks.map((item) => (
                <Menu.Link key={item.href} href={item.href} style={styles.link}>
                  <Text size='bodySm' weight='medium'>
                    {item.title}
                  </Text>
                  <Text size='caption' color='secondary'>
                    {item.description}
                  </Text>
                </Menu.Link>
              ))}
            </div>
          </Menu.Content>
        </Menu.Item>

        <Menu.Item>
          <Menu.Link href='https://github.com/hbeus/Base'>GitHub</Menu.Link>
        </Menu.Item>
      </Menu.List>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Arrow />
            <Menu.Viewport />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
