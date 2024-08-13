import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import GridCard from "../components/GridCard";
import GridSkel from "../skeletons/GridSkel";

export default function Explore() {
  const { explore } = useParams<{ explore: string }>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef<boolean>(false); // Track fetching state

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/discover/${explore}`, {
        params: { page },
      });
      console.log("API response:", response.data);
      setData((prevData) => [...prevData, ...response.data.results]);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError('Failed to load data.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      isFetching.current = false; // Reset fetching state
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollHeight - scrollTop <= clientHeight + 50 && !loading && !isFetching.current) {
        // Near bottom of the page and not already fetching data
        isFetching.current = true; // Set fetching state
        setCurrentPage((prevPage) => {
          const nextPage = prevPage + 1;
          if (nextPage <= totalPages) {
            fetchData(nextPage);
            return nextPage;
          }
          return prevPage; // Don't change page if already at the end
        });
      }
    }
  };

  useEffect(() => {
    if (!explore) return; // Ensure that explore is defined

    // Reset state on category change
    setData([]);
    setCurrentPage(1);
    setTotalPages(1);
    fetchData(1); // Fetch data for the initial page
  }, [explore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [data, loading, totalPages]);

  return (
    <div ref={containerRef} className="h-full scrollbar-hide w-full overflow-auto">
      <div className="container">
        {/* Grid Container */}
        <div className="grid pb-10 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading && currentPage === 1
            ? Array(12).fill(null).map((_, index) => (
                <GridSkel key={index} />
              ))
            : error
            ? <div className="text-red-500">{error}</div>
            : data.length === 0
            ? <div className="text-gray-500">No data available.</div>
            : data.map((item) => (
                <GridCard
                  key={item.id}
                  data={item}
                  index={item.id}
                  trending={false}
                  media_type={explore ?? 'default'}
                />
              ))
          }
        </div>

        {/* Loading Spinner */}
        {loading && <div className="text-center py-4">Loading...</div>}
      </div>
    </div>
  );
}























