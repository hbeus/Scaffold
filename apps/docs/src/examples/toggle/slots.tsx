import { Flex, Icon, Toggle } from '@base/ui';
import { IconBold, IconUnderline } from '@tabler/icons-react';
import { useState } from 'react';

export default function ToggleSlots() {
  const [bold, setBold] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <Flex gap='s8' wrap>
      <Toggle
        pressed={bold}
        onPressedChange={setBold}
        leading={<Icon icon={IconBold} />}
      >
        Bold
      </Toggle>
      <Toggle
        pressed={underline}
        onPressedChange={setUnderline}
        trailing={<Icon icon={IconUnderline} />}
      >
        Underline
      </Toggle>
    </Flex>
  );
}
