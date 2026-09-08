import { Button, Flex } from '@base/ui';

export default function ButtonDisabled() {
  return (
    <Flex direction='row' gap='s8'>
      <Button variant='accent' disabled>
        Accent
      </Button>
      <Button variant='primary' disabled>
        Primary
      </Button>
      <Button variant='ghost' disabled>
        Ghost
      </Button>
    </Flex>
  );
}
