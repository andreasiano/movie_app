import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GridCard from "../components/GridCard";

export default function TvShows() {
  const params = useParams();
  const [pageN, setPageN] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [totalPageN, setTotalPageN] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(params, 'params');

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get('/discover/tv', {
        params: { page: pageN }
      });

      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageN(response.data.total_pages);
      console.log(response.data.results, 'data');
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
      <h3 className="text-xl mb-5">Popular TV Shows</h3>
      <div className="container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item, index) => (
            <GridCard
              key={item.id}
              data={item}
              index={index + 1}
              trending={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}



