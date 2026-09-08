import { Card, Flex, Text } from '@base/ui';

export default function CardHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Card variant='filled'>
        <Text size='bodySm'>Filled variant (default)</Text>
      </Card>
      <Card variant='outline'>
        <Text size='bodySm'>Outline variant</Text>
      </Card>
    </Flex>
  );
}
