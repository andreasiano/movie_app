import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GridCard from '../components/GridCard';
import GridSkel from '../skeletons/GridSkel'; // Ensure you have this component
import { BannerItem } from '../components/BannerBrowse';

export default function SearchPage() {
  const location = useLocation();
  const [data, setData] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const query = new URLSearchParams(location.search).get('q') || '';

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get<{ results: BannerItem[] }>(`search/multi`, {
        params: {
          query: query,
          page: page,
        },
      });

      // Filter out results related to people
      const filteredResults = response.data.results.filter(item => item.media_type !== 'person');

      if (page === 1) {
        // Reset data when page is 1
        setData(filteredResults);
      } else {
        // Append data for subsequent pages
        setData(prev => [...prev, ...filteredResults]);
      }
    } catch (error) {
      setError('Failed to load data.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1); // Reset page number
      fetchData(); // Fetch data when query changes
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      fetchData(); // Fetch data when page number changes
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="container mx-auto">
        <div className="grid pb-10 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array(12).fill(null).map((_, index) => (
                <GridSkel key={index} />
              ))
            : error
            ? <div className="text-red-500">{error}</div>
            : data.map((item) => (
                <GridCard
                  key={item.id}
                  data={item}
                  media_type={item.media_type ?? 'default'}
                  trending={false}
                  index={item.id}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
}











