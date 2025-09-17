import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing localStorage with automatic serialization/deserialization
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if nothing is stored
 * @param {Object} options - Configuration options
 * @param {Function} options.serializer - Custom serializer function (default: JSON.stringify)
 * @param {Function} options.deserializer - Custom deserializer function (default: JSON.parse)
 * @param {boolean} options.syncAcrossTabs - Whether to sync changes across browser tabs (default: true)
 * @returns {[value, setValue, removeValue]} - [currentValue, setterFunction, removeFunction]
 */
export const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncAcrossTabs = true,
  } = options;

  // Get value from localStorage or use initial value
  const getStoredValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return deserializer(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  // State to store our value
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Update localStorage when state changes
  const setValue = useCallback(
    (value) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save to state
        setStoredValue(valueToStore);

        // Save to localStorage
        if (valueToStore === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, serializer(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes across tabs
  useEffect(() => {
    if (!syncAcrossTabs) return;

    const handleStorageChange = (e) => {
      if (e.key === key && e.storageArea === window.localStorage) {
        try {
          const newValue = e.newValue ? deserializer(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error syncing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue, deserializer, syncAcrossTabs]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing localStorage with automatic JSON serialization
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if nothing is stored
 * @returns {[value, setValue, removeValue]} - [currentValue, setterFunction, removeFunction]
 */
export const useLocalStorageJSON = (key, initialValue) => {
  return useLocalStorage(key, initialValue, {
    serializer: JSON.stringify,
    deserializer: JSON.parse,
  });
};

/**
 * Hook for managing localStorage with string values (no serialization)
 * @param {string} key - The localStorage key
 * @param {string} initialValue - The initial value if nothing is stored
 * @returns {[value, setValue, removeValue]} - [currentValue, setterFunction, removeFunction]
 */
export const useLocalStorageString = (key, initialValue = "") => {
  return useLocalStorage(key, initialValue, {
    serializer: (value) => value,
    deserializer: (value) => value,
  });
};

/**
 * Hook for managing localStorage with number values
 * @param {string} key - The localStorage key
 * @param {number} initialValue - The initial value if nothing is stored
 * @returns {[value, setValue, removeValue]} - [currentValue, setterFunction, removeFunction]
 */
export const useLocalStorageNumber = (key, initialValue = 0) => {
  return useLocalStorage(key, initialValue, {
    serializer: (value) => value.toString(),
    deserializer: (value) => parseFloat(value) || initialValue,
  });
};

/**
 * Hook for managing localStorage with boolean values
 * @param {string} key - The localStorage key
 * @param {boolean} initialValue - The initial value if nothing is stored
 * @returns {[value, setValue, removeValue]} - [currentValue, setterFunction, removeFunction]
 */
export const useLocalStorageBoolean = (key, initialValue = false) => {
  return useLocalStorage(key, initialValue, {
    serializer: (value) => value.toString(),
    deserializer: (value) => value === "true",
  });
};

export default useLocalStorage;
