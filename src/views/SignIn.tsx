import { useNavigate } from "react-router-dom"; // Import useNavigate from "react-router-dom"
import React from "react"; // Import React for JSX and event types

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform sign-in logic here (e.g., API call)
    navigate("/browse"); // Change this to the route you want to navigate to after sign-in
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-500 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
