import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (searchInput) {
      onSearch(searchInput); // Trigger search navigation immediately on input change
    }
  }, [searchInput, onSearch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // Assuming 640px is the breakpoint for mobile
        onClose(); // Close the modal on larger screens
      }
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    onClose();
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 transform transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } sm:hidden`} // Hide on screens larger than mobile breakpoint
      style={{ zIndex: 50 }}
    >
      <div className="bg-zinc-700 p-4 w-full mx-auto">
        <div className="flex justify-between items-center">
          <form onSubmit={handleSubmit} className="w-full relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-10 font-custom-light py-2 border-red-200 rounded-md bg-zinc-700 text-white border-none placeholder-gray-200 outline-none w-[400px]"
            />
            <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaSearch size={20} className="text-white" />
            </button>
          </form>
          <button onClick={onClose} className="text-white">
            <FaTimes size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}




