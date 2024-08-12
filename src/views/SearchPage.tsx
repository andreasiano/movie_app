import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GridCard from '../components/GridCard';
import { BannerItem } from '../components/BannerBrowse';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<BannerItem[]>([]);
  const [page, setPage] = useState<number>(1);

  const query = new URLSearchParams(location.search).get('q') || '';

  const fetchData = async () => {
    try {
      const response = await axios.get<{ results: BannerItem[] }>(`search/multi`, {
        params: {
          query,
          page,
        },
      });
      setData((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(2);
      setData([]);
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="">
      <div className="container mx-auto">
       
        <div className="grid pb-10 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((searchData) => (
            <GridCard
              data={searchData}
              key={`${searchData.id}-search`}
              media_type={searchData.media_type ?? 'default'}
              trending={false}
              index={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;







