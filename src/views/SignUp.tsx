// src/views/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../authentication/firebase'; // Import the auth object
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setUser } from '../redux/slice/userSlice'; // Import setUser action

export default function SignUp() {
  const [name, setName] = useState(''); // State for user name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Dispatch setUser action with name, email, and uid
      dispatch(setUser({ email: user.email || '', uid: user.uid, name }));

      console.log('User signed up:', email);
      // Navigate to the sign-in page after successful sign-up
      navigate('/signin');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-custom-bg">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded w-full py-2 px-3"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/signin')} 
            className="text-blue-500 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}






