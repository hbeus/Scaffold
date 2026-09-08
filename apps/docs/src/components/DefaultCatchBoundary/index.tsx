import { ErrorComponent, type ErrorComponentProps, Link, useRouter } from '@tanstack/react-router';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div>
      <ErrorComponent error={error} />
      <button type='button' onClick={() => router.invalidate()}>
        Try Again
      </button>
      <Link to='/'>Home</Link>
    </div>
  );
}
