import { Button, Flex } from '@base/ui';

export default function ButtonSizes() {
  return (
    <Flex direction='row' gap='s8' align='center'>
      <Button size='xs'>Extra Small</Button>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
    </Flex>
  );
}
