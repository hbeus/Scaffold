import { Button, Popover } from '@base/ui';

export default function PopoverHero() {
  return (
    <Popover.Root>
      <Popover.Trigger render={<Button variant='primary' />}>Open popover</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Title>Popover title</Popover.Title>
            <Popover.Description>
              This is a popover with an arrow pointing to its trigger element.
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
