import { Select } from '@base/ui';
import { IconChevronDown } from '@tabler/icons-react';

export default function SelectHero() {
  return (
    <Select.Root defaultValue='apple'>
      <Select.Trigger>
        <Select.Value placeholder='Select a fruit...' />
        <Select.Icon>
          <IconChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value='apple'>
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.Item value='banana'>
              <Select.ItemText>Banana</Select.ItemText>
            </Select.Item>
            <Select.Item value='cherry'>
              <Select.ItemText>Cherry</Select.ItemText>
            </Select.Item>
            <Select.Item value='grape'>
              <Select.ItemText>Grape</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
