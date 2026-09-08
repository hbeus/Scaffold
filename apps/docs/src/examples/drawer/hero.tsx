import { Button, Drawer, Flex } from '@base/ui';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function DrawerHero() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger render={<Button variant='primary' />}>Open drawer</Drawer.Trigger>
      <AnimatePresence>
        {open && (
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Popup>
              <Drawer.Content>
                <Drawer.Title>Drawer title</Drawer.Title>
                <Drawer.Description>
                  This is a side panel drawer. It slides in from the right edge of the screen.
                </Drawer.Description>
                <Flex direction='row' gap='s8'>
                  <Drawer.Close render={<Button variant='ghost' size='sm' />}>Close</Drawer.Close>
                </Flex>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Portal>
        )}
      </AnimatePresence>
    </Drawer.Root>
  );
}
