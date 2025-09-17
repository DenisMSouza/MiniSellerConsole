import { useState, useEffect } from "react";

/**
 * Custom hook to simulate data loading with latency
 * @param {Function} dataFetcher - Function that returns the data to load
 * @param {number} delay - Delay in milliseconds (default: 1000ms)
 * @param {Array} dependencies - Dependencies array for useEffect (default: [])
 * @param {Object} options - Additional options
 * @param {boolean} options.simulateError - Whether to simulate an error (default: false)
 * @param {number} options.errorChance - Chance of error (0-1, default: 0.3)
 * @returns {Object} - { data, loading, error, refetch }
 */
const useDataLoader = (
  dataFetcher,
  delay = 1000,
  dependencies = [],
  options = {}
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Simulate error if enabled
      if (options.simulateError) {
        const errorChance = options.errorChance || 0.3;
        if (Math.random() < errorChance) {
          throw new Error(
            "Simulated network error: Failed to fetch data from server"
          );
        }
      }

      // Fetch the actual data
      const result = dataFetcher();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, dependencies);

  const refetch = () => {
    loadData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useDataLoader;
