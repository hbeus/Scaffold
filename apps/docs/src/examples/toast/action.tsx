import { Button, Toast } from '@base/ui';

export default function ToastActionExample() {
  const toast = Toast.useManager();

  return (
    <Button
      size='sm'
      onClick={() => {
        const id = toast.add({
          title: 'Event created',
          description: 'Sunday, December 3 at 9:00 AM',
          actionProps: {
            children: 'Undo',
            onClick() {
              toast.close(id);
            },
          },
        });
      }}
    >
      Show with action
    </Button>
  );
}
