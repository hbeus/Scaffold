import { Flex, NumberField } from '@base/ui';
import { IconMinus, IconPlus } from '@tabler/icons-react';

export default function NumberFieldHero() {
  return (
    <Flex direction='column' gap='s8'>
      <NumberField.Root defaultValue={5}>
        <NumberField.Group>
          <NumberField.Decrement>
            <IconMinus size={14} />
          </NumberField.Decrement>
          <NumberField.Input />
          <NumberField.Increment>
            <IconPlus size={14} />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
      <NumberField.Root defaultValue={0} min={0} max={100}>
        <NumberField.Group>
          <NumberField.Decrement>
            <IconMinus size={14} />
          </NumberField.Decrement>
          <NumberField.Input size='sm' />
          <NumberField.Increment>
            <IconPlus size={14} />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </Flex>
  );
}
