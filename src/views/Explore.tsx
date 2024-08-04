import axios from "axios";
import { useEffect, useState } from "react";
import GridCard from "../components/GridCard";
import GridSkel from "../skeletons/GridSkel";
import { useParams } from "react-router-dom";

export default function Explore() {
  const params = useParams();
  const [pageN, setPageN] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [totalPageN, setTotalPageN] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageN
        }
      });
      setData((prev) => (pageN === 1 ? response.data.results : [...prev, ...response.data.results]));
      setTotalPageN(response.data.total_pages);
    } catch (error) {
      console.log('error', error);
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
    setData([]); // Reset data when changing category
    setPageN(1); // Reset to first page when changing category
  }, [params.explore]);

  useEffect(() => {
    fetchData();
  }, [pageN, params.explore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="container">
        <div className="grid pb-10 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  media_type={params.explore ?? 'default'}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
}






