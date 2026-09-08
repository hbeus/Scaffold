import { Card, Flex, Text } from '@base/ui';

export default function CardPadding() {
  return (
    <Flex direction='column' gap='s8'>
      <Card padding='sm'>
        <Text size='bodySm'>Small padding</Text>
      </Card>
      <Card padding='md'>
        <Text size='bodySm'>Medium padding (default)</Text>
      </Card>
      <Card padding='lg'>
        <Text size='bodySm'>Large padding</Text>
      </Card>
    </Flex>
  );
}
