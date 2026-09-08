import { Button, Card, Flex, Text } from '@base/ui';
import type { ReactNode } from 'react';

function SurfaceCard({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <Card padding='md' gap='s16'>
      <Text size='bodySm' weight='medium'>
        {label}
      </Text>
      <Flex direction='row' gap='s8'>
        <Button variant='primary' fill>
          Primary
        </Button>
        <Button variant='accent' fill>
          Accent
        </Button>
        <Button variant='ghost' fill>
          Ghost
        </Button>
      </Flex>
      {children}
    </Card>
  );
}

export default function SurfaceButtons() {
  return (
    <Card level={0} padding='md' gap='s16'>
      <Text size='bodySm' weight='medium'>
        Level 0 (page)
      </Text>
      <Flex direction='row' gap='s8'>
        <Button variant='primary' fill>
          Primary
        </Button>
        <Button variant='accent' fill>
          Accent
        </Button>
        <Button variant='ghost' fill>
          Ghost
        </Button>
      </Flex>
      <SurfaceCard label='Level 100'>
        <SurfaceCard label='Level 200'>
          <SurfaceCard label='Level 300' />
        </SurfaceCard>
      </SurfaceCard>
    </Card>
  );
}
