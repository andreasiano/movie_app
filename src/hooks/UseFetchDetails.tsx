import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetails = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);  // Apply the generic type T
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  // Add error state

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      setError('Failed to fetch data');  // Set error message
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error };  // Return error state
};

export default useFetchDetails;

