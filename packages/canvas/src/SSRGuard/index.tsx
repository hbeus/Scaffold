import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface SSRGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SSRGuard({ children, fallback = null }: SSRGuardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
