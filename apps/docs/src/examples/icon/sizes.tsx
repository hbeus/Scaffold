import { Flex, Icon } from '@base/ui';
import { IconCopy } from '@tabler/icons-react';

export default function IconSizes() {
  return (
    <Flex direction='row' gap='s8' align='end'>
      <Icon icon={IconCopy} size={12} />
      <Icon icon={IconCopy} size={14} />
      <Icon icon={IconCopy} size={18} />
      <Icon icon={IconCopy} size={24} />
    </Flex>
  );
}
