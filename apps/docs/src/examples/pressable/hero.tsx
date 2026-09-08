import { Flex, Pressable, Text } from '@base/ui';

export default function PressableHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Pressable as='button' inset='s4'>
        <Text size='bodySm'>Inset s4</Text>
      </Pressable>
      <Pressable as='button' inset='s8'>
        <Text size='bodySm'>Inset s8</Text>
      </Pressable>
      <Pressable as='button' inset='s12'>
        <Text size='bodySm'>Inset s12</Text>
      </Pressable>
      <Pressable as='button' inset='s16'>
        <Text size='bodySm'>Inset s16</Text>
      </Pressable>
    </Flex>
  );
}
