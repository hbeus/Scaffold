import { Flex, Icon } from '@base/ui';
import { IconBold, IconCopy, IconItalic, IconShare, IconTrash, IconUnderline } from '@tabler/icons-react';

export default function IconHero() {
  return (
    <Flex direction='row' gap='s8' align='center'>
      <Icon icon={IconBold} />
      <Icon icon={IconItalic} />
      <Icon icon={IconUnderline} />
      <Icon icon={IconCopy} />
      <Icon icon={IconShare} />
      <Icon icon={IconTrash} />
    </Flex>
  );
}
