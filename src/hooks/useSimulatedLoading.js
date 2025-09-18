import { useState, useCallback } from "react";

/**
 * Hook for simulating loading states with configurable delays and error simulation
 * @param {Object} options - Configuration options
 * @param {number} options.delay - Loading delay in milliseconds (default: 1500)
 * @param {boolean} options.simulateError - Whether to simulate errors (default: false)
 * @param {number} options.errorChance - Probability of error (0-1, default: 0.3)
 * @returns {Object} - Loading state and execution function
 */
export const useSimulatedLoading = (options = {}) => {
  const { delay = 1500, simulateError = false, errorChance = 0.3 } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Execute a function with simulated loading delay and optional error simulation
   * @param {Function} fn - Function to execute
   * @param {Array} args - Arguments to pass to the function
   * @returns {Promise} - Promise that resolves with function result
   */
  const executeWithSimulation = useCallback(
    async (fn, args = []) => {
      setLoading(true);
      setError(null);

      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Simulate error if configured
        if (simulateError && Math.random() < errorChance) {
          throw new Error("Simulated loading error");
        }

        // Execute the function
        const result = await fn(...args);
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [delay, simulateError, errorChance]
  );

  /**
   * Clear the current error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Set loading state manually
   * @param {boolean} isLoading - Loading state
   */
  const setLoadingState = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  return {
    loading,
    error,
    executeWithSimulation,
    clearError,
    setLoadingState,
  };
};

export default useSimulatedLoading;
