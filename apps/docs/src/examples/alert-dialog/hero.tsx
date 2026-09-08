import { AlertDialog, Button, Flex } from '@base/ui';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function AlertDialogHero() {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={<Button variant='primary' />}>Delete item</AlertDialog.Trigger>
      <AnimatePresence>
        {open && (
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Content>
              <AlertDialog.Title>Are you sure?</AlertDialog.Title>
              <AlertDialog.Description>
                This action cannot be undone. The item will be permanently deleted.
              </AlertDialog.Description>
              <Flex direction='row' gap='s8' justify='end'>
                <AlertDialog.Close render={<Button variant='ghost' size='sm' />}>
                  Cancel
                </AlertDialog.Close>
                <AlertDialog.Close render={<Button size='sm' />}>Delete</AlertDialog.Close>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}
