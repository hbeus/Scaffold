import { Toolbar } from '@base/ui';
import { IconBold, IconCopy, IconItalic, IconShare, IconUnderline } from '@tabler/icons-react';

export default function ToolbarHero() {
  return (
    <Toolbar.Root>
      <Toolbar.Group>
        <Toolbar.Button>
          <IconBold size={16} />
        </Toolbar.Button>
        <Toolbar.Button>
          <IconItalic size={16} />
        </Toolbar.Button>
        <Toolbar.Button>
          <IconUnderline size={16} />
        </Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Button>
          <IconCopy size={16} />
        </Toolbar.Button>
        <Toolbar.Button>
          <IconShare size={16} />
        </Toolbar.Button>
      </Toolbar.Group>
    </Toolbar.Root>
  );
}
