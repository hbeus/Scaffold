import { Flex, Switch, Text } from '@base/ui';
import { useState } from 'react';

export default function SwitchControlled() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Flex direction='row' align='center' justify='between'>
      <Text size='bodySm'>Enable notifications</Text>
      <Switch checked={notifications} onCheckedChange={setNotifications} />
    </Flex>
  );
}
