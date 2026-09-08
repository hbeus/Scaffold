import { Card, Flex, type SurfaceLevelValue, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  item: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

function SurfaceItem({ level }: { level: SurfaceLevelValue }) {
  return (
    <Card level={level} padding='md' gap='s4' style={styles.item}>
      <Text size='title' weight='bold'>
        Level {level}
      </Text>
      <Text size='bodySm' color='secondary'>
        bgSurface-{level}
      </Text>
    </Card>
  );
}

export default function SurfaceLevels() {
  return (
    <Flex direction='column' gap='s8' grow>
      <SurfaceItem level={0} />
      <SurfaceItem level={100} />
      <SurfaceItem level={200} />
      <SurfaceItem level={300} />
      <SurfaceItem level={400} />
      <SurfaceItem level={500} />
    </Flex>
  );
}
