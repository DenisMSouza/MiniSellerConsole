import React from "react";
import { useLocalStorageJSON } from "./useLocalStorage";
import {
  STORAGE_KEYS,
  DEFAULT_LEADS_FILTERS,
  DEFAULT_OPPORTUNITIES_FILTERS,
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

/**
 * Hook for managing opportunities filters and sort configuration with localStorage persistence
 * @returns {Object} - Filter state and management functions
 */
export const useOpportunitiesFiltersStorage = () => {
  const [storedFilters, setStoredFilters, removeStoredFilters] =
    useLocalStorageJSON(
      STORAGE_KEYS.OPPORTUNITIES_FILTERS,
      DEFAULT_OPPORTUNITIES_FILTERS
    );

  // Validate and migrate filters
  const filters = React.useMemo(() => {
    return migrationUtils.validateConfig(
      storedFilters,
      DEFAULT_OPPORTUNITIES_FILTERS
    );
  }, [storedFilters]);

  const updateFilters = (updates) => {
    const newFilters = { ...filters, ...updates };
    setStoredFilters(newFilters);
  };

  const resetFilters = () => {
    setStoredFilters(DEFAULT_OPPORTUNITIES_FILTERS);
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
      JSON.stringify(filters) === JSON.stringify(DEFAULT_OPPORTUNITIES_FILTERS),
  };
};

/**
 * Generic hook for managing any filter configuration with localStorage persistence
 * @param {string} storageKey - localStorage key
 * @param {Object} defaultFilters - Default filter values
 * @returns {Object} - Filter state and management functions
 */
export const useFiltersStorage = (storageKey, defaultFilters) => {
  const [storedFilters, setStoredFilters, removeStoredFilters] =
    useLocalStorageJSON(storageKey, defaultFilters);

  // Validate and migrate filters
  const filters = React.useMemo(() => {
    return migrationUtils.validateConfig(storedFilters, defaultFilters);
  }, [storedFilters, defaultFilters]);

  const updateFilters = (updates) => {
    const newFilters = { ...filters, ...updates };
    setStoredFilters(newFilters);
  };

  const resetFilters = () => {
    setStoredFilters(defaultFilters);
  };

  const clearFilters = () => {
    removeStoredFilters();
  };

  return {
    filters,
    updateFilters,
    resetFilters,
    clearFilters,
    isDefault: JSON.stringify(filters) === JSON.stringify(defaultFilters),
  };
};

export default useLeadsFiltersStorage;
