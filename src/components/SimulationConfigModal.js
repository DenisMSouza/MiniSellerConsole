import React, { useState } from "react";
import { useSimulationConfig } from "../contexts/SimulationConfigContext";
import { Button } from "./ui/button";
import { DEFAULT_SIMULATION_CONFIG } from "../utils/storageUtils";

const SimulationConfigModal = ({ isOpen, onClose }) => {
  const { config, updateConfig, resetConfig } = useSimulationConfig();
  const [localConfig, setLocalConfig] = useState(config);

  React.useEffect(() => {
    if (isOpen) {
      setLocalConfig(config);
    }
  }, [isOpen, config]);

  const handleSave = () => {
    updateConfig(localConfig);
    onClose();
  };

  const handleReset = () => {
    setLocalConfig(DEFAULT_SIMULATION_CONFIG);
  };

  const handleCancel = () => {
    setLocalConfig(config);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleCancel}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Simulation Configuration
                </h3>
                <div className="mt-4 space-y-4">
                  {/* Error Simulation Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Simulate Loading Errors
                      </label>
                      <p className="text-xs text-gray-500">
                        Enable random error simulation during data loading
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localConfig.simulateErrors}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          simulateErrors: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Error Chance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Error Chance: {Math.round(localConfig.errorChance * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={localConfig.errorChance}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          errorChance: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Leads Delay */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leads Loading Delay: {localConfig.leadsDelay}ms
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="250"
                      value={localConfig.leadsDelay}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          leadsDelay: parseInt(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.5s</span>
                      <span>2.5s</span>
                      <span>5s</span>
                    </div>
                  </div>

                  {/* Opportunities Delay */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opportunities Loading Delay:{" "}
                      {localConfig.opportunitiesDelay}ms
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="250"
                      value={localConfig.opportunitiesDelay}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          opportunitiesDelay: parseInt(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.5s</span>
                      <span>2.5s</span>
                      <span>5s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              onClick={handleSave}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationConfigModal;
