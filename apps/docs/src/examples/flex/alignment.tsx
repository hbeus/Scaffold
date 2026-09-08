import { Card, Flex, Text } from '@base/ui';

export default function FlexAlignment() {
  return (
    <Flex direction='row' gap='s8' align='center' justify='between'>
      <Card padding='sm'>
        <Text size='bodySm'>Start</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Center</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>End</Text>
      </Card>
    </Flex>
  );
}
