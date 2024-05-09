import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <h1>Page not found (404)</h1>
      <Link to="/login">Go to login page</Link>
    </>
  );
}
