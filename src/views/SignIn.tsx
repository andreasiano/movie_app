import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import img from '../assets/Screenshot 2024-09-07 215002.png'; // Ensure the path is correct
import { auth } from "../firebase/firebase"; // Import auth from the initialized firebase file
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in email:", user.email);
      navigate("/browse");
    } catch (error) {
      setError("Failed to sign in with Google.");
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in email:", user.email);
      navigate("/browse");
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (firebaseError.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (firebaseError.code === "auth/email-already-in-use") {
        setError("This email is already linked to a Google account. Please sign in with Google.");
      } else if (firebaseError.code === "auth/invalid-credential") {
        setError("Invalid credentials provided. Please sign in using Google or check your password.");
      } else {
        setError("Failed to sign in. Please check your email and password.");
      }
      console.error("Sign-In Error:", firebaseError);
    }
  };

  return (
    <div className="flex h-full gap-4">
      {/* Left Container */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center rounded-xl p-6 relative">
        {/* Welcome Back Title */}
        <h2 className="text-zinc-600 text-5xl mb-2">Welcome Back!</h2>

        {/* Subtitle for your movie app */}
        <p className="text-zinc-500 mb-6 text-center">Sign in to explore and enjoy the latest movies and shows.</p>

        {/* Form Container */}
        <div className="w-full max-w-sm">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full p-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <FcGoogle className="w-6 h-6 mr-2" />
                Sign in with Google
              </button>
              <div className="flex items-center justify-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="px-2 text-zinc-600">or</span>
                <hr className="w-full border-gray-300" />
              </div>
              {/* Email Input with Bold Label */}
              <label className="block text-zinc-600 font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded-full p-4 border border-gray-300"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              {/* Password Input with Bold Label */}
              <label className="block text-zinc-600 font-bold mb-2">Password</label>
              <input
                type="password"
                className="w-full rounded-full p-4 border border-gray-300"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full p-4 mt-4 text-white bg-zinc-700 rounded-full"
            >
              Sign In
            </button>
          </form>

          {/* 'Don't have an account?' Link */}
          <p className="text-center underline mt-6 text-zinc-600">
            <a href="/signup">Don't have an account?{" "}</a>
          </p>
        </div>
      </div>

      {/* Right Blue Container with Image (hidden on all screens) */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center rounded-xl">
        <img src={img} alt="Descriptive Alt Text" className="object-cover w-full h-full rounded-xl" />
      </div>
    </div>
  );
}

















