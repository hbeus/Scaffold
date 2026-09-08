import { Card, Flex, Input, Select, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronDown } from '@tabler/icons-react';

const styles = stylex.create({
  field: {
    width: '100%',
    maxWidth: '280px',
  },
  nestedLabel: {
    marginBottom: spacing.s4,
  },
});

function FieldSet() {
  return (
    <Flex direction='column' gap='s8'>
      <Input placeholder='Email' style={styles.field} />
      <Select.Root>
        <Select.Trigger style={styles.field}>
          <Select.Value placeholder='Select…' />
          <Select.Icon>
            <IconChevronDown size={16} />
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

export default function SurfaceFields() {
  return (
    <Card level={0} padding='md' gap='s16'>
      <Text size='bodySm' weight='medium'>
        Level 0 (page)
      </Text>
      <FieldSet />
      <Card padding='sm' gap='s8'>
        <Text size='caption' color='secondary' style={styles.nestedLabel}>
          Level 100 (auto Card)
        </Text>
        <FieldSet />
        <Card padding='sm' gap='s8'>
          <Text size='caption' color='secondary'>
            Nested Card — field steps again
          </Text>
          <Input placeholder='Inside card' style={styles.field} />
        </Card>
      </Card>
    </Card>
  );
}
