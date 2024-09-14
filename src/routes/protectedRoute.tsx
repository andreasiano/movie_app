import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Your Firebase auth setup

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user exists
    });

    return () => unsubscribe();
  }, []);

  // Wait for auth status to be determined
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optionally show a loading spinner
  }

  // If not authenticated, redirect to sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the children (protected content)
  return <>{children}</>;
}
