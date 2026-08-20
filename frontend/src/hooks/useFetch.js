/**
 * Custom hook for data fetching with loading and error state handling.
 * Wraps an API function and provides { data, loading, error, refetch }.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiFuncRef = useRef(apiFunc);

  /* Keep ref current so useCallback never goes stale */
  apiFuncRef.current = apiFunc;

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFuncRef.current();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
};
