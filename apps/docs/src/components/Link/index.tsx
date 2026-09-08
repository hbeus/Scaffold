import type { LinkComponentProps } from '@tanstack/react-router';
import { Link as RouterLink, useRouter } from '@tanstack/react-router';
import type { MouseEvent } from 'react';

import { navigateWithTransition, type ViewTransitionEffect } from '~/lib/view-transition';

type Props = LinkComponentProps & {
  transitionEffect?: ViewTransitionEffect;
};

export function Link({ transitionEffect, onClick, ...props }: Props) {
  const router = useRouter();

  return (
    <RouterLink
      {...props}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        const href = e.currentTarget.getAttribute('href');
        if (!href) return;

        e.preventDefault();
        navigateWithTransition(() => router.navigate({ to: href }), transitionEffect);
      }}
    />
  );
}
