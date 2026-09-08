import { Flex, Input } from '@base/ui';

export default function InputStates() {
  return (
    <Flex direction='column' gap='s8'>
      <Input placeholder='Default' />
      <Input disabled placeholder='Disabled' />
    </Flex>
  );
}
