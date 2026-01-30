import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="pt-40 text-center">
      <h1 className="text-6xl font-bold text-indigo-500">404</h1>
      <p className="text-slate-400 mt-4">Page not found</p>

      <Link
        to="/"
        className="inline-block mt-6 text-indigo-400"
      >
        Go Home
      </Link>
    </div>
  );
}
