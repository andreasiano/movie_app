import { FaBars, FaSearch } from 'react-icons/fa';
import user from '../assets/user.jpg';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface TopBarProps {
  toggleSidebar: () => void;
}

export default function TopBar({ toggleSidebar }: TopBarProps) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleChange = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  return (
    <div className="flex mb-8 items-center justify-between ">
      {/* Left section: Hamburger icon */}
      <button className="md:hidden mr-10 lg:pr-10" onClick={toggleSidebar}>
        <FaBars size={20} className="text-white" />
      </button>

      {/* Middle section: Search field */}
      <div className="flex-1 relative">
        <form className="flex items-center" action="" onSubmit={handleChange}>
          <button>
            <FaSearch size={20} className="absolute xs:left-6 lg:left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </button>
          <input
            className="lg:w-[300px] xs:w-[100px] pl-10 pr-10 py-2 border-2 border-red-200 opacity-30 rounded-[15px] bg-gray-800 outline-none text-white placeholder-gray-200 font-custom-medium hidden lg:block"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </form>
      </div>

      {/* Right section: Icons and Profile */}
      <div className="flex items-center  space-x-4">
        <div className="flex w-100 items-center space-x-2">
          <img
            className="h-10 w-10 border-2 bg-contain border-red-500 rounded-full"
            src={user}
            alt="Profile"
          />
          <span className="text-white">Hey, Andrew</span>
        </div>
      </div>
    </div>
  );
};














