import { useEffect, useState, type ReactNode } from 'react';

export type ClientGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ClientGuard({ children, fallback = null }: ClientGuardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
