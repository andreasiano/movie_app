// src/views/Landing.tsx

import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-custom-bg text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Movie App</h1>
      <p className="text-lg mb-8">Discover and manage your favorite movies!</p>
      <button 
        onClick={() => navigate('/signup')}  // Navigate to Sign Up instead of Sign In
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Get Started
      </button>
      <div className="mt-4">
        <p>Already a member?</p>
        <span 
          onClick={() => navigate('/signin')} 
          className="text-blue-500 cursor-pointer"
        >
          Sign In
        </span>
      </div>
    </div>
  );
}


