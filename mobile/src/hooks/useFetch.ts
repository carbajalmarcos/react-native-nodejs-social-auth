
import { useState, useEffect } from 'react';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: any;
  body?: any;
}

interface FetchResult<Data> {
  data: Data | null;
  error: any;
  isLoading: boolean;
}

const useFetch = <Data>(
  url: string,
  options: FetchOptions = {}
): FetchResult<Data> => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => { const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: Data = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
