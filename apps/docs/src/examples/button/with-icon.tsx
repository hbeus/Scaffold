import { Button, Icon } from '@base/ui';
import { Flex } from '@base/ui';
import { IconPlus, IconArrowRight } from '@tabler/icons-react';

export default function ButtonWithIcon() {
  return (
    <Flex direction='row' gap='s8'>
      <Button leading={<Icon icon={IconPlus} />}>Create</Button>
      <Button variant='ghost' trailing={<Icon icon={IconArrowRight} />}>
        Continue
      </Button>
    </Flex>
  );
}
