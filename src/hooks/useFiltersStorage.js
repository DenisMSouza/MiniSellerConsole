import React from "react";
import { useLocalStorageJSON } from "./useLocalStorage";
import {
  STORAGE_KEYS,
  DEFAULT_LEADS_FILTERS,
  migrationUtils,
} from "../utils/storageUtils";

/**
 * Hook for managing leads filters and sort configuration with localStorage persistence
 * @returns {Object} - Filter state and management functions
 */
export const useLeadsFiltersStorage = () => {
  const [storedFilters, setStoredFilters, removeStoredFilters] =
    useLocalStorageJSON(STORAGE_KEYS.LEADS_FILTERS, DEFAULT_LEADS_FILTERS);

  // Validate and migrate filters
  const filters = React.useMemo(() => {
    return migrationUtils.validateConfig(storedFilters, DEFAULT_LEADS_FILTERS);
  }, [storedFilters]);

  const updateFilters = (updates) => {
    const newFilters = { ...filters, ...updates };
    setStoredFilters(newFilters);
  };

  const resetFilters = () => {
    setStoredFilters(DEFAULT_LEADS_FILTERS);
  };

  const clearFilters = () => {
    removeStoredFilters();
  };

  return {
    filters,
    updateFilters,
    resetFilters,
    clearFilters,
    isDefault:
      JSON.stringify(filters) === JSON.stringify(DEFAULT_LEADS_FILTERS),
  };
};

export default useLeadsFiltersStorage;
