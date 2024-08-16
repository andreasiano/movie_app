import axios, { CanceledError } from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import GridCard from "../components/GridCard";
import GridSkel from "../skeletons/GridSkel";
import ExploreSkel from "../skeletons/ExploreSkel";

export default function Explore() {
  const { explore } = useParams<{ explore: string }>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedBackdrop, setSelectedBackdrop] = useState<string | null>(null); // State for the selected backdrop
  const [contentType, setContentType] = useState<string>(''); // State for the content type
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef<boolean>(false); // Track fetching state

  const fetchData = async (page: number, controller: AbortController) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/discover/${explore}`, {
        params: { page },
        signal: controller.signal, // Pass the AbortController signal to the request
      });
      console.log("API response:", response.data);
      setData((prevData) => {
        const newData = [...prevData, ...response.data.results];

        // Extract valid backdrop paths from newData
        const validBackdropPaths = newData
          .filter((item) => item.backdrop_path) // Ensure backdrop_path exists
          .map((item) => item.backdrop_path);

        // Select a random backdrop for the new category
        if (validBackdropPaths.length > 0) {
          // Calculate daily seed using current date
          const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
          const seed = new Date(today).getDate(); // Use the day of the month as seed
          const randomIndex = (seed % validBackdropPaths.length);
          setSelectedBackdrop(validBackdropPaths[randomIndex]);
        }

        return newData;
      });
      setTotalPages(response.data.total_pages);
    } catch (error) {
      if (error instanceof CanceledError) return; // Ignore if the request was canceled
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
        isFetching.current = true; // Set fetching state
        setCurrentPage((prevPage) => {
          const nextPage = prevPage + 1;
          if (nextPage <= totalPages) {
            const controller = new AbortController(); // Create a new AbortController
            fetchData(nextPage, controller); // Pass the controller to the fetch function
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
    setSelectedBackdrop(null); // Reset the selected backdrop

    // Determine content type based on explore parameter
    const type = explore.includes('tv') ? 'TV Shows' : 'Movies';
    setContentType(type);

    const controller = new AbortController(); // Create a new AbortController
    fetchData(1, controller); // Fetch data for the initial page

    // Cleanup function to cancel the request when component unmounts or dependency changes
    return () => {
      controller.abort();
    };
  }, [explore]); // Dependency array includes `explore` to trigger fetch on change

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
      {/* Banner Section */}
      {loading ? (
        <ExploreSkel /> // Show the skeleton loader with title while loading
      ) : selectedBackdrop ? (
        <div
          className="relative rounded-lg w-full h-[80vh] bg-cover bg-center mb-8"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedBackdrop})`,
          }}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10 flex items-center rounded-lg lg:align-middle p-8">
            {/* Title text */}
            <div className="text-white text-5xl font-bold">
              {contentType}
            </div>
          </div>
        </div>
      ) : null}

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
                  isWatchlist={false} // Pass isWatchlist as false here
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












