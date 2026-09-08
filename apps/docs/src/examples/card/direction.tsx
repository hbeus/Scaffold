import { Card, Text } from '@base/ui';

export default function CardDirection() {
  return (
    <Card direction='row' gap='s8'>
      <Text size='bodySm'>Row item 1</Text>
      <Text size='bodySm'>Row item 2</Text>
      <Text size='bodySm'>Row item 3</Text>
    </Card>
  );
}
