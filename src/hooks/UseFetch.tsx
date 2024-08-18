import { useEffect, useState } from "react";

const useFetch = (fetchFunction: () => Promise<any>) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before a new request
      const response = await fetchFunction();
      setData(response.data.results);
    } catch (error: any) {
      console.error("Failed to fetch data:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchFunction]); // Add fetchFunction as a dependency

  return { data, loading, error };
};

export default useFetch;


