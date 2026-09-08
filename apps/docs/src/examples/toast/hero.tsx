import { Button, Flex, Toast } from '@base/ui';

export default function ToastHero() {
  const toast = Toast.useManager();

  return (
    <Flex gap='s8' wrap>
      <Button
        size='sm'
        onClick={() =>
          toast.add({
            title: 'Event created',
            description: 'Sunday, December 3 at 9:00 AM',
          })
        }
      >
        Show toast
      </Button>
      <Button
        size='sm'
        variant='ghost'
        onClick={() => {
          toast.add({ title: 'First notification' });
          toast.add({ title: 'Second notification' });
          toast.add({ title: 'Third notification', description: 'Hover the stack to expand' });
        }}
      >
        Stack three
      </Button>
      <Button
        size='sm'
        variant='ghost'
        onClick={() => {
          for (let i = 1; i <= 5; i++) {
            toast.add({ title: `Toast ${i}`, description: 'Limit is 3 — extras fade out' });
          }
        }}
      >
        Overflow (5)
      </Button>
    </Flex>
  );
}
