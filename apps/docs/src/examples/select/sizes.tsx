import { Flex, Select } from '@base/ui';
import { IconChevronDown } from '@tabler/icons-react';

export default function SelectSizes() {
  return (
    <Flex direction='column' gap='s8'>
      <Select.Root>
        <Select.Trigger size='sm'>
          <Select.Value placeholder='Small' />
          <Select.Icon>
            <IconChevronDown size={14} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.Item value='a'>
                <Select.ItemText>Option A</Select.ItemText>
              </Select.Item>
              <Select.Item value='b'>
                <Select.ItemText>Option B</Select.ItemText>
              </Select.Item>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      <Select.Root>
        <Select.Trigger size='lg'>
          <Select.Value placeholder='Large' />
          <Select.Icon>
            <IconChevronDown size={18} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.Item value='a'>
                <Select.ItemText>Option A</Select.ItemText>
              </Select.Item>
              <Select.Item value='b'>
                <Select.ItemText>Option B</Select.ItemText>
              </Select.Item>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </Flex>
  );
}
