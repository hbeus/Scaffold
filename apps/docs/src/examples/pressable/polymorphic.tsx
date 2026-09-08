import { Flex, Pressable, Text } from '@base/ui';

export default function PressablePolymorphic() {
  return (
    <Flex direction='column' gap='s8'>
      <Pressable as='button' role='button' inset='s8'>
        <Flex direction='row' gap='s8' align='center'>
          <Text size='bodySm' weight='medium'>
            As button element
          </Text>
        </Flex>
      </Pressable>
      <Pressable as='button' disabled inset='s8'>
        <Text size='bodySm' color='secondary'>
          Disabled state
        </Text>
      </Pressable>
    </Flex>
  );
}
