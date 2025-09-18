import { useDataManager } from "./useDataManager";
import { STORAGE_KEYS } from "../utils/storageUtils";
import leadsData from "../data/leads.json";

/**
 * Hook to manage leads data with CRUD operations
 */
export const useLeadsData = (delay = 1500, dependencies = [], options = {}) => {
  const {
    data: leads,
    loading,
    error,
    updateItem: updateLead,
    addItem: addLead,
    removeItem: removeLead,
    resetData,
    refreshData,
  } = useDataManager({
    storageKey: STORAGE_KEYS.LEADS_DATA,
    defaultData: leadsData,
    delay,
    simulateError: options.simulateError,
    errorChance: options.errorChance,
    dependencies,
  });

  return {
    leads,
    loading,
    error,
    updateLead,
    addLead,
    removeLead,
    resetData,
    refreshData,
  };
};

export default useLeadsData;
