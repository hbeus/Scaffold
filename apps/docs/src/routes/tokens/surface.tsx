import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/tokens/surface')({
  beforeLoad: () => {
    throw redirect({ to: '/utilities/surface' });
  },
});
