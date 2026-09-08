import { Button, Flex } from '@base/ui';

export default function ButtonVariants() {
  return (
    <Flex direction='row' gap='s8'>
      <Button variant='accent'>Accent</Button>
      <Button variant='primary'>Primary</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='inherit'>Inherit</Button>
    </Flex>
  );
}
