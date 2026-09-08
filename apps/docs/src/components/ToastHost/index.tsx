import { Toast, type ToastPosition } from '@base/ui';

export function ToastHost({ position = 'bottom-right' }: { position?: ToastPosition }) {
  const { toasts } = Toast.useManager();

  return (
    <Toast.Portal>
      <Toast.Viewport position={position}>
        {toasts.map(toast => (
          <Toast.Root key={toast.id} toast={toast}>
            <Toast.Content>
              <Toast.Icon type={toast.type} />
              <Toast.Body>
                {toast.title && <Toast.Title />}
                {toast.description && <Toast.Description />}
              </Toast.Body>
              {toast.actionProps && <Toast.Action {...toast.actionProps} />}
              <Toast.Close />
            </Toast.Content>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}
