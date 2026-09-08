import { Button, Flex } from '@base/ui';

export default function ButtonRounded() {
  return (
    <Flex direction='row' gap='s8'>
      <Button>Default</Button>
      <Button rounded>Rounded</Button>
    </Flex>
  );
}
