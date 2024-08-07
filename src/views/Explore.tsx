import axios from "axios";
import { useEffect, useState } from "react";
import GridCard from "../components/GridCard";
import GridSkel from "../skeletons/GridSkel";
import { useParams } from "react-router-dom";

export default function Explore() {
  const params = useParams();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(`/discover/${params.explore}`);
      setData(response.data.results);
    } catch (error) {
      setError('Failed to load data.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.explore]);

  return (
    <div className="h-full w-full">
      <div className="container">
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
                  index={item.id}
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






