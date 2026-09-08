import { Card, Flex, Text } from '@base/ui';

export default function FlexWrap() {
  return (
    <Flex direction='row' gap='s8' wrap>
      <Card padding='sm'>
        <Text size='bodySm'>Item 1</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Item 2</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Item 3</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Item 4</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Item 5</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Item 6</Text>
      </Card>
    </Flex>
  );
}
