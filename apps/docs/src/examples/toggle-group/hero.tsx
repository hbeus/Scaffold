import { ToggleGroup } from '@base/ui';

export default function ToggleGroupHero() {
  return (
    <ToggleGroup.Root defaultValue={['center']}>
      <ToggleGroup.Item value='left'>Left</ToggleGroup.Item>
      <ToggleGroup.Item value='center'>Center</ToggleGroup.Item>
      <ToggleGroup.Item value='right'>Right</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
