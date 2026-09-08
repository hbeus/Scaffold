import { Text, Tabs } from '@base/ui';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    width: '100%',
    maxWidth: '20rem',
  },
});

export default function TabsMenu() {
  return (
    <Tabs.Root defaultValue='account' style={styles.root}>
      <Tabs.List variant='underline'>
        <Tabs.Tab value='account'>Account</Tabs.Tab>
        <Tabs.Tab value='settings'>Settings</Tabs.Tab>
        <Tabs.Tab value='billing'>Billing</Tabs.Tab>
        <Tabs.Menu>
          <Tabs.MenuItem value='team'>Team</Tabs.MenuItem>
          <Tabs.MenuItem value='security'>Security</Tabs.MenuItem>
          <Tabs.MenuItem value='notifications'>Notifications</Tabs.MenuItem>
          <Tabs.MenuItem value='integrations'>Integrations</Tabs.MenuItem>
        </Tabs.Menu>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value='account'>
          <Text size='bodySm' color='secondary'>
            Manage your account details and profile information.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value='settings'>
          <Text size='bodySm' color='secondary'>
            Configure your notification preferences and privacy settings.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value='billing'>
          <Text size='bodySm' color='secondary'>
            View your billing history and update payment methods.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value='team'>
          <Text size='bodySm' color='secondary'>
            Invite teammates and manage roles.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value='security'>
          <Text size='bodySm' color='secondary'>
            Passkeys, sessions, and two-factor authentication.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value='notifications'>
          <Text size='bodySm' color='secondary'>
            Email and push notification preferences.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value='integrations'>
          <Text size='bodySm' color='secondary'>
            Connected apps and API tokens.
          </Text>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs.Root>
  );
}
