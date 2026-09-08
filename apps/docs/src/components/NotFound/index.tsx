import { Link } from '~/components/Link';

export function NotFound() {
  return (
    <div>
      <p>The page you are looking for does not exist.</p>
      <Link to='/'>Go home</Link>
    </div>
  );
}
