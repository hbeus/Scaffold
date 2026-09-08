import { Button, Flex, Progress } from '@base/ui';
import { useState } from 'react';

export default function ProgressHero() {
  const [value, setValue] = useState(65);

  return (
    <Flex direction='column' gap='s12'>
      <Progress.Root value={value}>
        <Flex direction='row' justify='between'>
          <Progress.Label>Uploading...</Progress.Label>
          <Progress.Value />
        </Flex>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
      <Flex direction='row' gap='s8'>
        <Button variant='ghost' size='xs' onClick={() => setValue(v => Math.max(0, v - 10))}>
          -10
        </Button>
        <Button variant='ghost' size='xs' onClick={() => setValue(v => Math.min(100, v + 10))}>
          +10
        </Button>
      </Flex>
    </Flex>
  );
}
