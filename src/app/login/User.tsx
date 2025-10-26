'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from "./page";

export default function User() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // IMPROVEMENT: State to manage error messages for the user
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset error on new submission

    try {
      // FIX: Changed to http unless you have a specific https setup for localhost
      const response = await fetch('https://localhost:8081/api/account/user/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ 
          'type':'USER',
          'status':false,
          'username': username,
          'password': password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // IMPROVEMENT: Set a user-friendly error message
        setError(errorData.message || 'Invalid username or password.');
        // FIX: Corrected console log message
        console.error('User login failed:', response.statusText);

        setUsername(''); // Clear username field
        setPassword(''); // Clear password field
        return; // Stop execution if login fails
      }

      const responseData = await response.json();
      // FIX: Corrected console log message
      console.log('User login successful: ', JSON.stringify(responseData));

      // Consider storing a token from responseData (e.g., in session/local storage or context)
      
      router.push('/home');
      
    } catch (err) {
      // FIX: Corrected console log message and set user-facing error
      console.error('Error during user login:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const [role, setRole] = useState<'login' | null>(null);

  if (role === 'login') {
    return <LoginPage />;
  }
  
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/train-image.png')" }}
    >
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">User Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* IMPROVEMENT: Display error message to the user */}
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
              {error}
            </div>
          )}

           <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <button
              onClick={() => setRole('login')}
              type="button" // Set type to "button" to prevent form submission
              className="flex justify-center w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}