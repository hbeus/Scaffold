import { Flex, Separator, Text } from '@base/ui';

export default function SeparatorVertical() {
  return (
    <Flex direction='row' align='center' gap='s4'>
      <Text size='bodySm'>Left</Text>
      <Separator orientation='vertical' />
      <Text size='bodySm'>Right</Text>
    </Flex>
  );
}
