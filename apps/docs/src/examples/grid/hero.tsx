import { Card, Grid, Text } from '@base/ui';

export default function GridHero() {
  return (
    <Grid columns={3} gap='s8'>
      <Card padding='sm'>
        <Text size='bodySm'>Col 1</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Col 2</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Col 3</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Col 4</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Col 5</Text>
      </Card>
      <Card padding='sm'>
        <Text size='bodySm'>Col 6</Text>
      </Card>
    </Grid>
  );
}
