import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import { auth } from './firebase/firebase'; // Firebase authentication instance
import { onAuthStateChanged } from 'firebase/auth'; // Firebase auth state listener
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './redux/slice/movieAppSlice';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Auth state
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
        if (location.pathname !== '/signup') {
          navigate('/signin'); // Redirect to sign-in if not logged in and not on sign-up page
        }
      }
      setIsLoading(false); // Stop loading when auth state is determined
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTrendingData();
      fetchConfiguration();
    }
  }, [isAuthenticated]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      {!isAuthPage && isAuthenticated && (
        <>
          <div className="hidden md:block md:w-64">
            <Sidebar toggleSidebar={() => {}} />
          </div>
          <div
            className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
        </>
      )}

      {/* Main content area */}
      <div className="flex-1 my-5 mx-5 overflow-hidden">
        {isAuthPage ? (
          location.pathname === '/signin' ? (
            <SignIn />
          ) : (
            <SignUp />
          )
        ) : isAuthenticated ? (
          <MainContent toggleSidebar={toggleSidebar} />
        ) : (
          <p>You must be logged in to access this page.</p>
        )}
      </div>
    </div>
  );
}



















