import { Icon, ToggleGroup } from '@base/ui';
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from '@tabler/icons-react';

export default function ToggleGroupLeadingSlots() {
  return (
    <ToggleGroup.Root defaultValue={['center']}>
      <ToggleGroup.Item value='left' leading={<Icon icon={IconAlignLeft} />}>
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item value='center' leading={<Icon icon={IconAlignCenter} />}>
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item value='right' leading={<Icon icon={IconAlignRight} />}>
        Right
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
