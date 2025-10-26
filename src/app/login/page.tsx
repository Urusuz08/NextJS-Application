'use client';

import { useState } from 'react';
import User from './User';
import Admin from './Admin';

export default function LoginPage() {
  const [role, setRole] = useState<'user' | 'admin' | null>(null);

  if (role === 'user') {
    return <User />;
  }

  if (role === 'admin') {
    return <Admin />;
  }

  return (
   <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/train-image.png')" }}
      >

   <div className="w-full max-w-xs p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login As</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setRole('user')}
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            User
          </button>
          <button
            onClick={() => setRole('admin')}
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
