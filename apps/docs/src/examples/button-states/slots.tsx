import { ButtonState, Flex, Icon } from '@base/ui';
import { IconCheck, IconChevronRight, IconCirclePlus } from '@tabler/icons-react';

export default function ButtonStatesSlots() {
  return (
    <Flex gap='s8' wrap>
      <ButtonState variant='positive' leading={<Icon icon={IconCheck} />}>
        Leading slot icon
      </ButtonState>
      <ButtonState variant='positive' trailing={<Icon icon={IconChevronRight} />}>
        Trailing slot icon
      </ButtonState>
      <ButtonState
        variant='positive'
        leading={<Icon icon={IconCirclePlus} />}
        trailing={<Icon icon={IconChevronRight} />}
      >
        Leading and trailing slot icons
      </ButtonState>
    </Flex>
  );
}
