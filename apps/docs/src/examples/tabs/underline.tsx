import { Text, Tabs } from '@base/ui';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    width: '20rem',
  },
});

export default function TabsUnderline() {
  return (
    <Tabs.Root defaultValue='account' style={styles.root}>
      <Tabs.List variant='underline'>
        <Tabs.Tab value='account'>Account</Tabs.Tab>
        <Tabs.Tab value='settings'>Settings</Tabs.Tab>
        <Tabs.Tab value='billing'>Billing</Tabs.Tab>
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
      </Tabs.Panels>
    </Tabs.Root>
  );
}
