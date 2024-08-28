// src/views/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { setUser } from '../redux/slice/userSlice';
import { auth } from '../authentication/firebase'; // Ensure this path is correct
import { updateProfile } from 'firebase/auth'; // Import the updateProfile function

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  
  const [name, setName] = useState(user?.name || '');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      // Update the name in Redux store
      dispatch(setUser({ email: user.email || '', uid: user.uid, name }));

      // Update the user profile in Firebase
      await updateProfile(auth.currentUser, { displayName: name })
        .then(() => {
          console.log("Profile updated in Firebase");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });

      // Log to confirm the update
      console.log("Name updated to:", name);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-full bg-custom-bg">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
        <form onSubmit={handleUpdate}>
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;



