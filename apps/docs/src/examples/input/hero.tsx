import { Flex, Input } from '@base/ui';

export default function InputHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Input size='sm' placeholder='Small input' />
      <Input size='md' placeholder='Medium input' />
      <Input size='lg' placeholder='Large input' />
    </Flex>
  );
}
