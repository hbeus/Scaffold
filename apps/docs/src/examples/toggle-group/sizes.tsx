import { Flex, ToggleGroup } from '@base/ui';

export default function ToggleGroupSizes() {
  return (
    <Flex direction='column' gap='s12'>
      <ToggleGroup.Root defaultValue={['a']}>
        <ToggleGroup.Item value='a' size='sm'>Small</ToggleGroup.Item>
        <ToggleGroup.Item value='b' size='sm'>Option</ToggleGroup.Item>
      </ToggleGroup.Root>
      <ToggleGroup.Root defaultValue={['a']}>
        <ToggleGroup.Item value='a' size='md'>Medium</ToggleGroup.Item>
        <ToggleGroup.Item value='b' size='md'>Option</ToggleGroup.Item>
      </ToggleGroup.Root>
      <ToggleGroup.Root defaultValue={['a']}>
        <ToggleGroup.Item value='a' size='lg'>Large</ToggleGroup.Item>
        <ToggleGroup.Item value='b' size='lg'>Option</ToggleGroup.Item>
      </ToggleGroup.Root>
    </Flex>
  );
}
