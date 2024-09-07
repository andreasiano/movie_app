import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate for routing
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SignIn from './views/SignIn'; // Import SignIn component
import SignUp from './views/SignUp'; // Import SignUp component
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './redux/slice/movieAppSlice';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Use navigate to redirect

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

    // Check if the user is already on the sign-in page
    if (location.pathname === '/') {
      navigate('/signin'); // Redirect to SignIn page if at root
    }

    // Set loading to false after navigation check
    setIsLoading(false);
  }, [dispatch, location.pathname, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if the current path is for sign in or sign up
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  // If loading, return null or a loading spinner
  if (isLoading) {
    return null; // Or return a loading spinner
  }

  return (
    <div
      className={`flex h-[100vh] overflow-hidden font-custom-medium ${
        isAuthPage ? 'bg-white' : 'bg-custom-bg'
      }`}
    >
      {/* Render Sidebar only if not on Auth pages */}
      {!isAuthPage && (
        <>
          <div className="hidden md:block md:w-64">
            <Sidebar toggleSidebar={() => {}} />
          </div>
          <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
        </>
      )}

      {/* Main content area, Auth pages */}
      <div className="flex-1 my-5 mx-5 overflow-hidden">
        {isAuthPage ? (
          // Render SignIn or SignUp directly based on the path
          location.pathname === '/signin' ? (
            <SignIn />
          ) : (
            <SignUp />
          )
        ) : (
          // Render MainContent for all other routes, including root path
          <MainContent toggleSidebar={toggleSidebar} />
        )}
      </div>
    </div>
  );
}


















