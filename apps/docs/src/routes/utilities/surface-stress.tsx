import {
  Avatar,
  Button,
  Card,
  Flex,
  Input,
  Meter,
  Progress,
  Separator,
  Switch,
  Tabs,
  Text,
  Toggle,
  ToggleGroup,
} from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronDown } from '@tabler/icons-react';
import { Select } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/utilities/surface-stress')({
  component: SurfaceStressPage,
});

const styles = stylex.create({
  page: {
    maxWidth: '100%',
    paddingBlock: spacing.s32,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.s16,
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing.s12,
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing.s12,
  },
  fullWidth: {
    width: '100%',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingInline: spacing.s8,
    paddingBlock: spacing.s2,
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  badgePositive: {
    backgroundColor: colors.statePositive,
    color: colors.background,
  },
  badgeNeutral: {
    backgroundColor: colors.stateNeutral,
    color: colors.background,
  },
  badgeNegative: {
    backgroundColor: colors.stateNegative,
    color: colors.background,
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: colors.statePositive,
    flexShrink: 0,
  },
  dotOffline: {
    backgroundColor: colors.foregroundDisabled,
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.s8,
  },
  miniCard: {
    minHeight: '80px',
  },
});

function StatCard({ label, value, change, trend }: { label: string; value: string; change: string; trend: 'up' | 'down' | 'flat' }) {
  return (
    <Card padding='md' gap='s8'>
      <Text size='caption' color='secondary'>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <span {...stylex.props(
        styles.badge,
        trend === 'up' ? styles.badgePositive : trend === 'down' ? styles.badgeNegative : styles.badgeNeutral,
      )}>
        {change}
      </span>
    </Card>
  );
}

function TeamMember({ initials, name, role, online }: { initials: string; name: string; role: string; online: boolean }) {
  return (
    <Flex direction='row' gap='s12' align='center'>
      <Avatar.Root size='md'>
        <Avatar.Fallback>{initials}</Avatar.Fallback>
      </Avatar.Root>
      <Flex direction='column' gap='s2' grow>
        <Flex direction='row' gap='s8' align='center'>
          <Text size='bodySm' weight='medium'>{name}</Text>
          <div {...stylex.props(styles.dot, !online && styles.dotOffline)} />
        </Flex>
        <Text size='caption' color='secondary'>{role}</Text>
      </Flex>
    </Flex>
  );
}

function TaskItem({ task, status }: { task: string; status: 'done' | 'in-progress' | 'blocked' }) {
  return (
    <div {...stylex.props(styles.taskRow)}>
      <Text size='bodySm'>{task}</Text>
      <span {...stylex.props(
        styles.badge,
        status === 'done' ? styles.badgePositive : status === 'blocked' ? styles.badgeNegative : styles.badgeNeutral,
      )}>
        {status}
      </span>
    </div>
  );
}

function SettingsSection() {
  return (
    <Card padding='md' gap='s16'>
      <Text size='title' weight='bold'>Settings</Text>
      <Separator />
      <Card padding='sm' gap='s12'>
        <Text size='bodySm' weight='medium'>Notifications</Text>
        <Flex direction='row' justify='between' align='center'>
          <Text size='bodySm' color='secondary'>Email alerts</Text>
          <Switch defaultChecked />
        </Flex>
        <Flex direction='row' justify='between' align='center'>
          <Text size='bodySm' color='secondary'>Push notifications</Text>
          <Switch />
        </Flex>
        <Card padding='sm' gap='s8'>
          <Text size='caption' weight='medium'>Advanced</Text>
          <Flex direction='row' justify='between' align='center'>
            <Text size='caption' color='secondary'>Digest frequency</Text>
            <Select.Root defaultValue='daily'>
              <Select.Trigger>
                <Select.Value placeholder='Select…' />
                <Select.Icon><IconChevronDown size={14} /></Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.Item value='realtime'><Select.ItemText>Real-time</Select.ItemText></Select.Item>
                    <Select.Item value='daily'><Select.ItemText>Daily</Select.ItemText></Select.Item>
                    <Select.Item value='weekly'><Select.ItemText>Weekly</Select.ItemText></Select.Item>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </Flex>
          <Card padding='sm' gap='s8'>
            <Text size='caption' color='secondary'>Custom filter</Text>
            <Input placeholder='e.g. severity:critical' style={styles.fullWidth} />
            <Flex direction='row' gap='s8'>
              <Button variant='primary' size='sm'>Save</Button>
              <Button variant='ghost' size='sm'>Reset</Button>
            </Flex>
          </Card>
        </Card>
      </Card>
    </Card>
  );
}

function ProjectCard({ name, progress, tasks, members }: { name: string; progress: number; tasks: number; members: string[] }) {
  return (
    <Card padding='md' gap='s12'>
      <Flex direction='row' justify='between' align='center'>
        <Text size='bodySm' weight='bold'>{name}</Text>
        <Text size='caption' color='secondary'>{tasks} tasks</Text>
      </Flex>
      <Progress.Root value={progress}>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
      <Flex direction='row' gap='s4'>
        {members.map(m => (
          <Avatar.Root key={m} size='sm'>
            <Avatar.Fallback>{m}</Avatar.Fallback>
          </Avatar.Root>
        ))}
      </Flex>
    </Card>
  );
}

function ActivityFeed() {
  return (
    <Card padding='md' gap='s12'>
      <Text size='title' weight='bold'>Activity</Text>
      <Separator />
      <Card padding='sm' gap='s8'>
        <Flex direction='row' gap='s8' align='center'>
          <Avatar.Root size='sm'><Avatar.Fallback>HB</Avatar.Fallback></Avatar.Root>
          <Flex direction='column' gap='s2'>
            <Text size='bodySm'>Hampus pushed 3 commits</Text>
            <Text size='caption' color='secondary'>2 minutes ago</Text>
          </Flex>
        </Flex>
      </Card>
      <Card padding='sm' gap='s8'>
        <Flex direction='row' gap='s8' align='center'>
          <Avatar.Root size='sm'><Avatar.Fallback>AL</Avatar.Fallback></Avatar.Root>
          <Flex direction='column' gap='s2'>
            <Text size='bodySm'>Alex opened a pull request</Text>
            <Text size='caption' color='secondary'>15 minutes ago</Text>
          </Flex>
        </Flex>
        <Card padding='sm' gap='s4'>
          <Text size='caption' weight='medium'>PR #142: Update auth flow</Text>
          <Text size='caption' color='secondary'>Refactors session handling to use short-lived tokens</Text>
          <Flex direction='row' gap='s8'>
            <Button variant='primary' size='xs'>Review</Button>
            <Button variant='ghost' size='xs'>Dismiss</Button>
          </Flex>
        </Card>
      </Card>
      <Card padding='sm' gap='s8'>
        <Flex direction='row' gap='s8' align='center'>
          <Avatar.Root size='sm'><Avatar.Fallback>MK</Avatar.Fallback></Avatar.Root>
          <Flex direction='column' gap='s2'>
            <Text size='bodySm'>Maria resolved an incident</Text>
            <Text size='caption' color='secondary'>1 hour ago</Text>
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
}

function DeepNestDemo() {
  return (
    <Card padding='md' gap='s12'>
      <Text size='title' weight='bold'>Deep Nesting</Text>
      <Text size='caption' color='secondary'>
        Every Card auto-increments the surface level. Components inside each card adapt automatically.
      </Text>
      <Separator />
      <Card padding='md' gap='s12'>
        <Text size='bodySm' weight='medium'>Level 200 — Project overview</Text>
        <div {...stylex.props(styles.grid2)}>
          <Card padding='sm' gap='s8' style={styles.miniCard}>
            <Text size='caption' color='secondary'>Sprint velocity</Text>
            <Meter.Root value={68}>
              <Meter.Track><Meter.Indicator /></Meter.Track>
            </Meter.Root>
          </Card>
          <Card padding='sm' gap='s8' style={styles.miniCard}>
            <Text size='caption' color='secondary'>Bug ratio</Text>
            <Meter.Root value={23}>
              <Meter.Track><Meter.Indicator /></Meter.Track>
            </Meter.Root>
          </Card>
        </div>
        <Card padding='sm' gap='s8'>
          <Text size='bodySm' weight='medium'>Level 400 — Task detail</Text>
          <Input placeholder='Task name' style={styles.fullWidth} />
          <Flex direction='row' gap='s8'>
            <ToggleGroup.Root type='single' defaultValue='medium'>
              <ToggleGroup.Item value='low'>Low</ToggleGroup.Item>
              <ToggleGroup.Item value='medium'>Med</ToggleGroup.Item>
              <ToggleGroup.Item value='high'>High</ToggleGroup.Item>
            </ToggleGroup.Root>
          </Flex>
          <Card padding='sm' gap='s8'>
            <Text size='caption' weight='medium'>Level 500 — Subtask</Text>
            <Flex direction='row' gap='s8' align='center'>
              <Toggle size='sm' defaultPressed>Done</Toggle>
              <Text size='caption' color='secondary'>Write unit tests</Text>
            </Flex>
            <Flex direction='row' gap='s8' align='center'>
              <Toggle size='sm'>Done</Toggle>
              <Text size='caption' color='secondary'>Update docs</Text>
            </Flex>
            <Flex direction='row' gap='s8'>
              <Button variant='primary' size='sm' fill>Save</Button>
              <Button variant='ghost' size='sm' fill>Cancel</Button>
            </Flex>
          </Card>
        </Card>
      </Card>
    </Card>
  );
}

function SurfaceStressPage() {
  return (
    <Flex direction='column' gap='s24' style={styles.page}>
      <Flex direction='column' gap='s8'>
        <Text as='h1' size='headline' weight='bold'>Surface Level Stress Test</Text>
        <Text color='secondary'>
          A dense dashboard exercising every surface-aware component at multiple nesting depths. Every Card, Button, Input, Select, Toggle, Avatar, and form field on this page consumes the surface ladder via useSurface — no manual color props anywhere.
        </Text>
      </Flex>

      <div {...stylex.props(styles.grid4)}>
        <StatCard label='Revenue' value='$48.2k' change='+12.5%' trend='up' />
        <StatCard label='Users' value='2,847' change='+4.2%' trend='up' />
        <StatCard label='Errors' value='23' change='-8.1%' trend='down' />
        <StatCard label='Latency' value='142ms' change='0.0%' trend='flat' />
      </div>

      <div {...stylex.props(styles.grid2)}>
        <Card padding='md' gap='s12'>
          <Text size='title' weight='bold'>Team</Text>
          <Separator />
          <TeamMember initials='HB' name='Hampus' role='Lead Engineer' online />
          <TeamMember initials='AL' name='Alex' role='Frontend' online />
          <TeamMember initials='MK' name='Maria' role='Backend' online={false} />
          <TeamMember initials='JD' name='Jordan' role='Design' online />
          <Card padding='sm' gap='s8'>
            <Text size='caption' weight='medium'>Quick add</Text>
            <Input placeholder='Name' style={styles.fullWidth} />
            <Input placeholder='Role' style={styles.fullWidth} />
            <Button variant='primary' size='sm' fill>Add member</Button>
          </Card>
        </Card>

        <Card padding='md' gap='s12'>
          <Text size='title' weight='bold'>Sprint Backlog</Text>
          <Separator />
          <Tabs.Root defaultValue='active'>
            <Tabs.List variant='button'>
              <Tabs.Tab value='active'>Active</Tabs.Tab>
              <Tabs.Tab value='review'>Review</Tabs.Tab>
              <Tabs.Tab value='done'>Done</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panels>
              <Tabs.Panel value='active'>
                <Flex direction='column' gap='s8'>
                  <Card padding='sm' gap='s8'>
                    <TaskItem task='Implement OAuth flow' status='in-progress' />
                    <TaskItem task='Add rate limiting' status='in-progress' />
                    <TaskItem task='Fix timezone bug' status='blocked' />
                  </Card>
                </Flex>
              </Tabs.Panel>
              <Tabs.Panel value='review'>
                <Flex direction='column' gap='s8'>
                  <Card padding='sm' gap='s8'>
                    <TaskItem task='Refactor query layer' status='in-progress' />
                    <TaskItem task='Update API docs' status='in-progress' />
                  </Card>
                </Flex>
              </Tabs.Panel>
              <Tabs.Panel value='done'>
                <Flex direction='column' gap='s8'>
                  <Card padding='sm' gap='s8'>
                    <TaskItem task='Set up CI pipeline' status='done' />
                    <TaskItem task='Database migration' status='done' />
                    <TaskItem task='Auth middleware' status='done' />
                  </Card>
                </Flex>
              </Tabs.Panel>
            </Tabs.Panels>
          </Tabs.Root>
        </Card>
      </div>

      <div {...stylex.props(styles.grid3)}>
        <ProjectCard name='API Gateway' progress={72} tasks={18} members={['HB', 'AL']} />
        <ProjectCard name='Dashboard v2' progress={45} tasks={24} members={['MK', 'JD', 'AL']} />
        <ProjectCard name='Mobile App' progress={91} tasks={8} members={['HB', 'MK']} />
      </div>

      <div {...stylex.props(styles.grid2)}>
        <ActivityFeed />
        <SettingsSection />
      </div>

      <DeepNestDemo />
    </Flex>
  );
}
