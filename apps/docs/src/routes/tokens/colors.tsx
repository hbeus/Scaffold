import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/tokens/colors')({
  beforeLoad: () => {
    throw redirect({ to: '/tokens/themes' });
  },
});
