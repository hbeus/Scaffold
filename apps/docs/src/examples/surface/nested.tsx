import { Card, Text } from '@base/ui';

export default function SurfaceNested() {
  return (
    <Card level={0} padding='md' gap='s16'>
      <Text size='bodySm' weight='medium'>
        Level 0 (page)
      </Text>
      <Card padding='md' gap='s16'>
        <Text size='bodySm' weight='medium'>
          Level 100 (auto)
        </Text>
        <Card padding='md' gap='s16'>
          <Text size='bodySm' weight='medium'>
            Level 200 (auto)
          </Text>
          <Card padding='md' gap='s16'>
            <Text size='bodySm' weight='medium'>
              Level 300 (auto)
            </Text>
            <Card padding='md' gap='s16'>
              <Text size='bodySm' weight='medium'>
                Level 400 (auto)
              </Text>
              <Card padding='md' gap='s16'>
                <Text size='bodySm' weight='medium'>
                  Level 500 (auto)
                </Text>
              </Card>
            </Card>
          </Card>
        </Card>
      </Card>
    </Card>
  );
}
