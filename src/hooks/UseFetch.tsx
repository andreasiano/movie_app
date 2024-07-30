import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setLoading(false);
      setData(response.data.results);
    } catch (error) {
      console.error("Failed to fetch now playing data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading };
};

export default useFetch;
