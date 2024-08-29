import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for routing
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SignIn from './views/SignIn'; // Import SignIn component
import SignUp from './views/SignUp'; // Import SignUp component
import LandingPage from './views/Landing'; // Import LandingPage component
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './redux/slice/movieAppSlice';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

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

  // Determine if the current path is for sign in or sign up
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  // Determine if the current path is the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex h-[100vh] overflow-hidden bg-custom-bg font-custom-medium">
      {/* Render Sidebar only if not on Auth pages or Landing page */}
      {!isAuthPage && !isLandingPage && (
        <>
          <div className="hidden md:block md:w-64">
            <Sidebar toggleSidebar={() => {}} />
          </div>
          <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
        </>
      )}

      {/* Main content area, Auth pages, or Landing page */}
      <div className="flex-1 my-5 mx-5 overflow-hidden">
        {isAuthPage ? (
          // Render SignIn or SignUp directly based on the path
          location.pathname === '/signin' ? (
            <SignIn />
          ) : (
            <SignUp />
          )
        ) : isLandingPage ? (
          // Render LandingPage for the root path
          <LandingPage />
        ) : (
          // Render MainContent for all other routes
          <MainContent toggleSidebar={toggleSidebar} />
        )}
      </div>
    </div>
  );
}














