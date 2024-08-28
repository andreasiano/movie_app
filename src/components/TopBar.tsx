// src/components/TopBar.tsx
import { FaBars, FaSearch } from 'react-icons/fa';
import user from '../assets/user.jpg';
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '../redux/store/store'; // Adjust the path based on your structure
import SearchModal from './SearchModal'; // Import the modal component
import { useState } from "react";
import { useNavigate } from "react-router";

interface TopBarProps {
  toggleSidebar: () => void;
}

export default function TopBar({ toggleSidebar }: TopBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Get the user's name from Redux store
  const userName = useSelector((state: RootState) => state.user.user?.name) || "Guest"; // Default to "Guest"

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  // Navigate to the profile page when clicking on the user image
  const handleProfileClick = () => {
    navigate('/profile'); // Adjust the path based on your routing
  };

  return (
    <>
      <div className="flex mb-8 items-center justify-between">
        {/* Left section: Hamburger icon */}
        <button className="md:hidden mr-10 lg:pr-10" onClick={toggleSidebar}>
          <FaBars size={20} className="text-white" />
        </button>

        {/* Middle section: Search field */}
        <div className="flex-1 relative">
          <form className="flex items-center" action="" onSubmit={(e) => e.preventDefault()}>
            <button
              className="block sm:hidden"
              onClick={handleButtonClick}
              type="button"
            >
              <FaSearch size={20} className="text-white" />
            </button>
            <input
              className="hidden sm:block sm:w-[300px] xs:w-[100px] pl-10 pr-10 py-2 border-2 border-red-200 opacity-30 rounded-[15px] bg-gray-800 outline-none text-white placeholder-gray-200 font-custom-light"
              type="text"
              placeholder="Search..."
              // Add your search handling logic here
            />
          </form>
        </div>

        {/* Right section: Icons and Profile */}
        <div className="flex items-center space-x-4">
          <div className="flex w-100 items-center space-x-2" onClick={handleProfileClick}>
            <img
              className="h-10 w-10 border-2 bg-contain border-red-500 rounded-full cursor-pointer" // Added cursor pointer
              src={user}
              alt="Profile"
            />
            <span className="text-white">Hey, {userName}</span> {/* Display user's name */}
          </div>
        </div>
      </div>

      {/* Modal for screens below 645px */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={(query) => console.log(query)} // Handle search query
      />
    </>
  );
}



