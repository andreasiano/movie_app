import { getAuth, signOut } from "firebase/auth"; // Import signOut from Firebase
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/signin"); // Redirect to the sign-in page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally, handle the error (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    handleLogout(); // Automatically log the user out when this component mounts
  }, []);

  return (
    <div>
      Logging out...
    </div>
  );
}
