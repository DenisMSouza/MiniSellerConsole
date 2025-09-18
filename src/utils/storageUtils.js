/**
 * Storage utility functions for managing different types of data in localStorage
 */

// Storage keys constants
export const STORAGE_KEYS = {
  SIMULATION_CONFIG: "mini-seller-console-simulation-config",
  LEADS_FILTERS: "mini-seller-console-leads-filters",
  LEADS_DATA: "mini-seller-console-leads-data",
  OPPORTUNITIES_DATA: "mini-seller-console-opportunities-data",
};

// Default configurations
export const DEFAULT_SIMULATION_CONFIG = {
  simulateErrors: false,
  errorChance: 0.1,
  leadsDelay: 1500,
  opportunitiesDelay: 1500,
};

export const DEFAULT_LEADS_FILTERS = {
  statusFilter: "",
  sortBy: "",
};

/**
 * Generic storage functions
 */
export const storageUtils = {
  /**
   * Get item from localStorage with fallback to default value
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} - Stored value or default
   */
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} - Success status
   */
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} - Success status
   */
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Clear all app-related localStorage items
   * @returns {boolean} - Success status
   */
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        window.localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
      return false;
    }
  },

  clearAppData: () => {
    try {
      // Clear only data-related keys, preserve config
      const dataKeys = [
        STORAGE_KEYS.LEADS_DATA,
        STORAGE_KEYS.OPPORTUNITIES_DATA,
        STORAGE_KEYS.LEADS_FILTERS,
      ];
      dataKeys.forEach((key) => {
        window.localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.warn("Error clearing app data:", error);
      return false;
    }
  },

  /**
   * Get all stored keys for this app
   * @returns {string[]} - Array of stored keys
   */
  getStoredKeys: () => {
    try {
      return Object.values(STORAGE_KEYS).filter(
        (key) => window.localStorage.getItem(key) !== null
      );
    } catch (error) {
      console.warn("Error getting stored keys:", error);
      return [];
    }
  },

  /**
   * Get storage usage information
   * @returns {Object} - Storage usage stats
   */
  getStorageInfo: () => {
    try {
      const keys = Object.values(STORAGE_KEYS);
      let totalSize = 0;
      const keySizes = {};

      keys.forEach((key) => {
        const value = window.localStorage.getItem(key);
        if (value) {
          const size = new Blob([value]).size;
          keySizes[key] = size;
          totalSize += size;
        }
      });

      return {
        totalSize,
        keySizes,
        keyCount: Object.keys(keySizes).length,
        maxSize: 5 * 1024 * 1024, // 5MB typical limit
        usagePercentage: (totalSize / (5 * 1024 * 1024)) * 100,
      };
    } catch (error) {
      console.warn("Error getting storage info:", error);
      return null;
    }
  },
};

/**
 * Migration utilities for handling config changes
 */
export const migrationUtils = {
  /**
   * Migrate old config format to new format
   * @param {Object} oldConfig - Old configuration object
   * @param {string} version - Current version
   * @returns {Object} - Migrated configuration
   */
  migrateSimulationConfig: (oldConfig, version = "1.0.0") => {
    const migrated = { ...DEFAULT_SIMULATION_CONFIG, ...oldConfig };

    // Handle version-specific migrations
    if (version === "1.0.0") {
      // Future migration logic can go here
    }

    return migrated;
  },

  /**
   * Validate config structure
   * @param {Object} config - Configuration to validate
   * @param {Object} defaultConfig - Default configuration for reference
   * @returns {Object} - Validated and cleaned configuration
   */
  validateConfig: (config, defaultConfig) => {
    if (!config || typeof config !== "object") {
      return defaultConfig;
    }

    const validated = {};
    Object.keys(defaultConfig).forEach((key) => {
      if (config.hasOwnProperty(key)) {
        validated[key] = config[key];
      } else {
        validated[key] = defaultConfig[key];
      }
    });

    return validated;
  },
};

export default storageUtils;
