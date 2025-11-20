// src/pages/Unauthorized.tsx
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        Go back to home
      </Link>
    </div>
  );
};

export default Unauthorized;