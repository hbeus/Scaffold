import { Button, Toast } from '@base/ui';

function createEvent() {
  return new Promise<{ id: string }>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({ id: 'evt_123' });
      } else {
        reject(new Error('Network error'));
      }
    }, 1500);
  });
}

export default function ToastPromise() {
  const toast = Toast.useManager();

  return (
    <Button
      size='sm'
      onClick={() => {
        void toast.promise(createEvent(), {
          loading: { type: 'loading', title: 'Creating event…' },
          success: {
            type: 'success',
            title: 'Event created',
            description: 'Your calendar was updated',
          },
          error: {
            type: 'error',
            title: 'Could not create event',
            description: 'Please try again',
          },
        });
      }}
    >
      Create event
    </Button>
  );
}
