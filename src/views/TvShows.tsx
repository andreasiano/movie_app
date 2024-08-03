import axios from "axios";
import { useEffect, useState } from "react";
import GridCard from "../components/GridCard";
import GridSkel from "../skeletons/GridSkel";

export default function TvShows() {
  const [pageN, setPageN] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [totalPageN, setTotalPageN] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get('/discover/tv', {
        params: { page: pageN }
      });

      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageN(response.data.total_pages);
    } catch (error) {
      console.error("Failed to fetch TV show data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && pageN < totalPageN) {
      setPageN(prev => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageN]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Clean up
  }, []);

  return (
    <div className="h-full w-full">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array(12).fill(null).map((_, index) => (
                <GridSkel key={index} />
              ))
            : data.map((item, index) => (
                <GridCard
                  key={item.id}
                  data={item}
                  index={index + 1}
                  trending={false}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
}




