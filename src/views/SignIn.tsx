// src/views/SignIn.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', email);
      // Navigate to the main content after successful sign-in
      navigate('/browse'); // Replace with your desired route
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Error signing in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in with Google:', user);
      // Navigate to the main content after successful sign-in
      navigate('/browse'); // Replace with your desired route
    } catch (error) {
      setError('Failed to sign in with Google.');
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-custom-bg">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Sign In
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white py-2 rounded mt-4">
          Sign In with Google
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/signup')} 
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}



