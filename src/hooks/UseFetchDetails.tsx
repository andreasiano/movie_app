import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetails = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);  // Apply the generic type T
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetchDetails;
