// src/App.tsx

import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './redux/slice/movieAppSlice';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Landing from './views/Landing';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration');
      dispatch(setImageUrl(response.data.images.secure_base_url + 'original'));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if we are on the landing page, sign in, or sign up pages
  const isLandingPage = 
    location.pathname === '/' || 
    location.pathname === '/signup' || 
    location.pathname === '/signin';

  return (
    <div className="flex h-[100vh] overflow-hidden bg-custom-bg font-custom-medium">
      {/* Render sidebar only if not on landing, signin, or signup pages */}
      {!isLandingPage && (
        <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
      )}
      {/* Always show the sidebar on larger screens */}
      {!isLandingPage && (
        <div className="hidden md:block md:w-64">
          <Sidebar toggleSidebar={() => {}} />
        </div>
      )}
      <div className="flex-1 my-5 mx-5 overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<MainContent toggleSidebar={toggleSidebar} />} />
        </Routes>
      </div>
    </div>
  );
}

















