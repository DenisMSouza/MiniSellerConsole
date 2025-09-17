import React, { createContext, useContext } from "react";
import { useLocalStorageJSON } from "../hooks/useLocalStorage";
import {
  STORAGE_KEYS,
  DEFAULT_SIMULATION_CONFIG,
  migrationUtils,
} from "../utils/storageUtils";

const SimulationConfigContext = createContext();

export const useSimulationConfig = () => {
  const context = useContext(SimulationConfigContext);
  if (!context) {
    throw new Error(
      "useSimulationConfig must be used within a SimulationConfigProvider"
    );
  }
  return context;
};

export const SimulationConfigProvider = ({ children }) => {
  // Use localStorage hook with migration support
  const [storedConfig, setStoredConfig, removeStoredConfig] =
    useLocalStorageJSON(
      STORAGE_KEYS.SIMULATION_CONFIG,
      DEFAULT_SIMULATION_CONFIG
    );

  // Migrate and validate config on load
  const config = React.useMemo(() => {
    return migrationUtils.validateConfig(
      migrationUtils.migrateSimulationConfig(storedConfig),
      DEFAULT_SIMULATION_CONFIG
    );
  }, [storedConfig]);

  const updateConfig = (updates) => {
    const newConfig = { ...config, ...updates };
    setStoredConfig(newConfig);
  };

  const resetConfig = () => {
    setStoredConfig(DEFAULT_SIMULATION_CONFIG);
  };

  const clearConfig = () => {
    removeStoredConfig();
  };

  return (
    <SimulationConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        clearConfig,
        // Additional utilities
        isDefault:
          JSON.stringify(config) === JSON.stringify(DEFAULT_SIMULATION_CONFIG),
        hasChanges: JSON.stringify(config) !== JSON.stringify(storedConfig),
      }}
    >
      {children}
    </SimulationConfigContext.Provider>
  );
};
