import { Button, Dialog } from '@base/ui';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function DialogHero() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={<Button variant='primary' />}>Open dialog</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Content>
              <Dialog.Title>Dialog title</Dialog.Title>
              <Dialog.Description>
                This is a compound component dialog built with Base UI, styled with StyleX, and
                animated with motion.dev.
              </Dialog.Description>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant='ghost' size='sm' />}>Cancel</Dialog.Close>
                <Dialog.Close render={<Button size='sm' />}>Confirm</Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
