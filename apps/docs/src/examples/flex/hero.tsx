import { Card, Flex, Text } from '@base/ui';

export default function FlexHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Flex direction='row' gap='s8'>
        <Card padding='sm'>
          <Text size='bodySm'>Row 1</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>Row 2</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>Row 3</Text>
        </Card>
      </Flex>
      <Flex direction='column' gap='s8'>
        <Card padding='sm'>
          <Text size='bodySm'>Column 1</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>Column 2</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>Column 3</Text>
        </Card>
      </Flex>
    </Flex>
  );
}
