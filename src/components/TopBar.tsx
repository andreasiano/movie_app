import { FaBars, FaSearch } from 'react-icons/fa';
import user from '../assets/placeholder.webp'; // Placeholder image for profile
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SearchModal from './SearchModal'; // Import the modal component
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Your Firebase auth setup

interface TopBarProps {
  toggleSidebar: () => void;
}

export default function TopBar({ toggleSidebar }: TopBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  // Use effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName); // Set the username from the user object 
      } else {
        setUsername(null); // Clear the username if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  // Handle navigation based on search input
  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchInput(query); // Update the search input which triggers navigation
  };

  // Function to handle changes in the search input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Function to open the search modal
  const handleButtonClick = () => {
    setIsModalOpen(true);
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
            {/* Search icon for screens below 645px */}
            <button
              className="block sm:hidden"
              onClick={handleButtonClick}
              type="button"
            >
              <FaSearch size={20} className="text-white" />
            </button>
            {/* Search input field for screens 645px and above */}
            <input
              className="hidden sm:block sm:w-[300px] xs:w-[100px] pl-10 pr-10 py-2 border-2 border-red-200 opacity-30 rounded-[15px] bg-gray-800 outline-none text-white placeholder-gray-200 font-custom-light"
              type="text"
              placeholder="Search..."
              onChange={handleChange}
              value={searchInput}
            />
          </form>
        </div>

        {/* Right section: Icons and Profile */}
        <div className="flex items-center space-x-4">
          <div className="flex w-100 items-center space-x-2">
            <img
              className="h-10 w-10 border-2 bg-contain border-red-500 rounded-full"
              src={user}
              alt="Profile"
            />
            <span className="text-white">Hey, {username ? username : 'Guest'}</span>
          </div>
        </div>
      </div>

      {/* Modal for screens below 645px */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
      />
    </>
  );
}






