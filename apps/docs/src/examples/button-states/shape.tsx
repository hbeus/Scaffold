import { ButtonState, Flex } from '@base/ui';

export default function ButtonStatesShape() {
  return (
    <Flex gap='s8' wrap>
      <ButtonState variant='positive'>Square</ButtonState>
      <ButtonState variant='positive' rounded>Rounded</ButtonState>
    </Flex>
  );
}
