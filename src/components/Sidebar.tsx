import { Link } from 'react-router-dom';
import { FaTimes, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { CiCompass1 } from 'react-icons/ci';
import { PiTelevisionLight } from 'react-icons/pi';
import { MdOutlineLocalMovies } from 'react-icons/md';

interface SidebarProps {
  toggleSidebar: () => void;
}

interface MenuItem {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string; // Add a path property for routing
}

interface MenuSection {
  id: number;
  section: string;
  items: MenuItem[];
}

export default function Sidebar({ toggleSidebar }: SidebarProps) {
  const menuItems: MenuSection[] = [
    {
      id: 1,
      section: 'Menu',
      items: [
        { id: 1, name: 'Browse', icon: <CiCompass1 size={20} />, path: '/browse', },
        { id: 2, name: 'TV Shows', icon: <PiTelevisionLight size={20} />, path: '/tv' },
        { id: 3, name: 'Movies', icon: <MdOutlineLocalMovies size={20} />, path: '/movie' },
      ],
    },
    {
      id: 2,
      section: 'General',
      items: [
        { id: 4, name: 'Settings', icon: <FaCog size={20} />, path: '/settings' },
        { id: 5, name: 'Log Out', icon: <FaSignOutAlt size={20} />, path: '/logout' },
      ],
    },
  ];

  return (
    <div className="w-64 border-r-2 border-opacity-20 border-gray-500 bg-gray-700 md:bg-custom-bg pt-4 over h-full relative">
      <div className="md:hidden flex justify-end">
        <button onClick={toggleSidebar}>
          <FaTimes className="h-8 w-8 pr-4 text-white" />
        </button>
      </div>
      
      {menuItems.map((section) => (
        <div className="my-5 mr-10" key={section.id}>
          <h2 className="text-[13px] font-custom-light text-white pl-11 font-bold opacity-50">{section.section}</h2>
          <ul className="my-6 text-lg text-white">
            {section.items.map((item) => (
              <li
                key={item.id}
                id={`menu-item-${item.id}`}
                className={`mb-2 p-2 cursor-pointer rounded flex items-center relative group`}
              >
                {/* Box on the left (visible on hover) */}
                <div className="absolute left-0 top-0 h-full w-2 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r"></div>

                {/* Icon */}
                <span className='ml-8 mr-5 relative p-1 rounded duration-700 group-hover:bg-red-500'>
                  {item.icon}
                </span>
                
                {/* Item Name (Link to respective route) */}
                <Link
                  to={item.path}
                  className='ml-2 transition-opacity duration-300 group-hover:text-white opacity-50 group-hover:opacity-100'
                  onClick={toggleSidebar} // Close sidebar on link click
                >
                  {item.name}
                </Link>
              
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};




















