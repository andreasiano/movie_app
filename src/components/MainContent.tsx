import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import Settings from '../views/Settings';
import LogOut from '../views/LogOut';
import Browse from '../views/Browse';
import Details from '../views/Details';
import SearchPage from '../views/SearchPage';
import Explore from '../views/Explore';

interface MainContentProps {
  toggleSidebar: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col h-screen w-full text-white">
      <TopBar toggleSidebar={toggleSidebar} />
      {/* Main content area */}
      <div className="flex-1 scrollbar-hide overflow-auto">
        <Routes>
          <Route path="browse" element={<Browse />} />
          <Route path="settings" element={<Settings />} />
          <Route path=":explore" element={<Explore />} />
          <Route path="logout" element={<LogOut />} />
          <Route path=":explore/:id" element={<Details />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<Browse />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;


















