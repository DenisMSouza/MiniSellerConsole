import { useDataManager } from "./useDataManager";
import { STORAGE_KEYS } from "../utils/storageUtils";
import opportunitiesData from "../data/opportunities.json";

/**
 * Hook to manage opportunities data with CRUD operations
 */
export const useOpportunitiesData = (
  delay = 1500,
  dependencies = [],
  options = {}
) => {
  const {
    data: opportunities,
    loading,
    error,
    updateItem: updateOpportunity,
    addItem: addOpportunity,
    removeItem: removeOpportunity,
    resetData,
    refreshData,
  } = useDataManager({
    storageKey: STORAGE_KEYS.OPPORTUNITIES_DATA,
    defaultData: opportunitiesData,
    delay,
    simulateError: options.simulateError,
    errorChance: options.errorChance,
    dependencies,
  });

  return {
    opportunities,
    loading,
    error,
    updateOpportunity,
    addOpportunity,
    removeOpportunity,
    resetData,
    refreshData,
  };
};

export default useOpportunitiesData;
