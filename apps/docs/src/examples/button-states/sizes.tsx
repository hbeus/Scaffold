import { ButtonState, Flex } from '@base/ui';

export default function ButtonStatesSizes() {
  return (
    <Flex direction='row' align='center' gap='s8'>
      <ButtonState variant='positive' size='xs'>Extra Small</ButtonState>
      <ButtonState variant='positive' size='sm'>Small</ButtonState>
      <ButtonState variant='positive' size='md'>Medium</ButtonState>
      <ButtonState variant='positive' size='lg'>Large</ButtonState>
    </Flex>
  );
}
