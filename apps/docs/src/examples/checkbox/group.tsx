import { Checkbox, CheckboxGroup, Flex, Text } from '@base/ui';

export default function CheckboxGroupExample() {
  return (
    <CheckboxGroup>
      <Flex direction='column' gap='s8'>
          <Flex as="label" gap="s8">
            <Checkbox name='prefs' value='terms' id='checkbox-terms' />
            <Text size='bodySm'>Accept terms</Text>
          </Flex>
        <Flex as="label" gap="s8">
          <Checkbox name='prefs' value='newsletter' />
          <Text size='bodySm'>Subscribe to newsletter</Text>
        </Flex>
        <Flex as="label" gap="s8">
            <Checkbox name='prefs' value='updates' />
          <Text size='bodySm'>Receive updates</Text>
        </Flex>
      </Flex>
    </CheckboxGroup>
  );
}
