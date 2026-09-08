import { Flex, Switch, Text } from '@base/ui';
import { useState } from 'react';

export default function SwitchHero() {
  const [checked, setChecked] = useState(false);

  return (
    <Flex direction='column' gap='s8'>
      <Flex direction='row' align='center' justify='between'>
        <Text size='bodySm'>Small</Text>
        <Switch size='sm' checked={checked} onCheckedChange={setChecked} />
      </Flex>
      <Flex direction='row' align='center' justify='between'>
        <Text size='bodySm'>Medium</Text>
        <Switch size='md' checked={checked} onCheckedChange={setChecked} />
      </Flex>
    </Flex>
  );
}
