import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import Movies from '../views/Movies';
import TvShows from '../views/TvShows';
import Settings from '../views/Settings';
import LogOut from '../views/LogOut';
import Browse from '../views/Browse';
import Details from '../views/Details';
import SearchPage from '../views/SearchPage';

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
          <Route path="movie" element={<Movies />} />
          <Route path="tv" element={<TvShows />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="movie/:id" element={<Details />} />
          <Route path="tv/:id" element={<Details />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<Browse />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;


















