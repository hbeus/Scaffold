import { Checkbox, Flex, Text } from '@base/ui';

export default function CheckboxHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Flex as="label" gap="s8">
        <Checkbox size='md' />
        <Text size='bodySm'>Accept terms and conditions</Text>
      </Flex>
    </Flex>
  );
}
