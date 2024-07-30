import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './redux/slice/movieAppSlice';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();

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

  return (
      <div className="flex h-[100vh] overflow-hidden bg-custom-bg font-custom-medium">
        <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
        <div className="hidden md:block md:w-64">
          <Sidebar toggleSidebar={() => {}} />
        </div>
        <div className="flex-1 my-5 mx-5 overflow-hidden">
          <MainContent toggleSidebar={toggleSidebar} />
        </div>
      </div>
  );
}












