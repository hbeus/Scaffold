import { Button, Dropdown } from '@base/ui';
import { IconCopy, IconShare, IconTrash } from '@tabler/icons-react';

export default function DropdownHero() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger render={<Button variant='primary' />}>Actions</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Positioner>
          <Dropdown.Popup>
            <Dropdown.Item>
              <IconCopy size={14} />
              Copy
            </Dropdown.Item>
            <Dropdown.Item>
              <IconShare size={14} />
              Share
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>
              <IconTrash size={14} />
              Delete
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Positioner>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
