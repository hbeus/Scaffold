import { ButtonState, Flex } from '@base/ui';

export default function ButtonStatesHero() {
  return (
    <Flex direction='row' gap='s8'>
      <ButtonState variant='positive'>Positive</ButtonState>
      <ButtonState variant='negative'>Negative</ButtonState>
      <ButtonState variant='semiNegative'>Semi Negative</ButtonState>
      <ButtonState variant='semiPositive'>Semi Positive</ButtonState>
      <ButtonState variant='neutral'>Neutral</ButtonState>
      <ButtonState variant='highlight'>Highlight</ButtonState>
    </Flex>
  );
}
