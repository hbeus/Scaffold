import { Flex, Toggle } from '@base/ui';
import { IconBold, IconItalic } from '@tabler/icons-react';
import { useState } from 'react';

export default function ToggleHero() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <Flex direction='row' gap='s8' align='center'>
      <Toggle pressed={bold} onPressedChange={setBold}>
        <IconBold size={16} />
      </Toggle>
      <Toggle pressed={italic} onPressedChange={setItalic}>
        <IconItalic size={16} />
      </Toggle>
    </Flex>
  );
}
