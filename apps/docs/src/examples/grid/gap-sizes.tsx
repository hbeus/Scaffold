import { Card, Flex, Grid, Text } from '@base/ui';

export default function GridGapSizes() {
  return (
    <Flex direction='column' gap='s12'>
      <Grid columns={4} gap='s4'>
        <Card padding='sm'>
          <Text size='bodySm'>s4</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>s4</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>s4</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>s4</Text>
        </Card>
      </Grid>
      <Grid columns={4} gap='s16'>
        <Card padding='sm'>
          <Text size='bodySm'>s16</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>s16</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>s16</Text>
        </Card>
        <Card padding='sm'>
          <Text size='bodySm'>s16</Text>
        </Card>
      </Grid>
    </Flex>
  );
}
