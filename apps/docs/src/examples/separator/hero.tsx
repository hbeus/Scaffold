import { Flex, Separator, Text } from '@base/ui';

export default function SeparatorHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Text size='bodySm'>Content above</Text>
      <Separator />
      <Text size='bodySm'>Content below</Text>
    </Flex>
  );
}
