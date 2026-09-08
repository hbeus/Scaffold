import { Button, Flex, Toast } from '@base/ui';

const types = ['success', 'info', 'warning', 'error'] as const;

export default function ToastTypes() {
  const toast = Toast.useManager();

  return (
    <Flex gap='s8' wrap>
      {types.map(type => (
        <Button
          key={type}
          size='sm'
          variant='ghost'
          onClick={() =>
            toast.add({
              type,
              title: type.charAt(0).toUpperCase() + type.slice(1),
              description: `A ${type} toast notification`,
            })
          }
        >
          {type}
        </Button>
      ))}
    </Flex>
  );
}
