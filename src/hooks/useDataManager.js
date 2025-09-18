import { useState, useEffect, useCallback } from "react";
import { useLocalStorageJSON } from "./useLocalStorage";
import { useSimulatedLoading } from "./useSimulatedLoading";

/**
 * Generic hook for managing data with localStorage persistence and CRUD operations
 * @param {Object} config - Configuration object
 * @param {string} config.storageKey - localStorage key for data persistence
 * @param {Array} config.defaultData - Default data array (usually from JSON import)
 * @param {number} config.delay - Loading delay in milliseconds (default: 1500)
 * @param {boolean} config.simulateError - Whether to simulate errors (default: false)
 * @param {number} config.errorChance - Probability of error (0-1, default: 0.3)
 * @param {Array} config.dependencies - Dependencies array for useEffect (default: [])
 * @returns {Object} - Data state and management functions
 */
export const useDataManager = (config) => {
  const {
    storageKey,
    defaultData = [],
    delay = 1500,
    simulateError = false,
    errorChance = 0.3,
    dependencies = [],
  } = config;

  // Use localStorage to persist data
  const [storedData, setStoredData, removeStoredData] = useLocalStorageJSON(
    storageKey,
    []
  );

  // Use stored data if available, otherwise use empty array
  const [data, setData] = useState(storedData.length > 0 ? storedData : []);

  // Use simulated loading hook
  const { loading, error, executeWithSimulation, clearError } =
    useSimulatedLoading({
      delay,
      simulateError,
      errorChance,
    });

  // Load initial data with simulated latency
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await executeWithSimulation(() => {
          if (storedData.length === 0) {
            // Load from default data and store in localStorage
            setStoredData(defaultData);
            setData(defaultData);
          } else {
            // Load from localStorage (with simulated delay)
            setData(storedData);
          }
        });
      } catch (err) {
        // Error is handled by useSimulatedLoading
      }
    };

    loadInitialData();
  }, [
    delay,
    simulateError,
    errorChance,
    storedData.length,
    setStoredData,
    defaultData,
    executeWithSimulation,
    ...dependencies,
  ]);

  // Update a specific item
  const updateItem = useCallback(
    (updatedItem) => {
      setData((prevData) => {
        const newData = prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
        setStoredData(newData); // Persist to localStorage
        return newData;
      });
    },
    [setStoredData]
  );

  // Add a new item
  const addItem = useCallback(
    (newItem) => {
      setData((prevData) => {
        const newData = [...prevData, newItem];
        setStoredData(newData); // Persist to localStorage
        return newData;
      });
    },
    [setStoredData]
  );

  // Remove an item
  const removeItem = useCallback(
    (itemId) => {
      setData((prevData) => {
        const newData = prevData.filter((item) => item.id !== itemId);
        setStoredData(newData); // Persist to localStorage
        return newData;
      });
    },
    [setStoredData]
  );

  // Reset to default data
  const resetData = useCallback(async () => {
    try {
      await executeWithSimulation(() => {
        removeStoredData(); // Clear localStorage
        setData([]); // Clear current state
        // Trigger a fresh load from default data
        setTimeout(() => {
          setStoredData(defaultData);
          setData(defaultData);
        }, delay);
      });
    } catch (err) {
      // Error is handled by useSimulatedLoading
    }
  }, [
    removeStoredData,
    setStoredData,
    defaultData,
    delay,
    executeWithSimulation,
  ]);

  // Refresh data with simulated latency
  const refreshData = useCallback(async () => {
    try {
      await executeWithSimulation(() => {
        if (storedData.length > 0) {
          setData(storedData);
        } else {
          // If localStorage is empty, re-trigger initial load
          setStoredData(defaultData);
          setData(defaultData);
        }
      });
    } catch (err) {
      // Error is handled by useSimulatedLoading
    }
  }, [storedData, defaultData, setStoredData, executeWithSimulation]);

  return {
    data,
    loading,
    error,
    updateItem,
    addItem,
    removeItem,
    resetData,
    refreshData,
    clearError,
  };
};

export default useDataManager;
