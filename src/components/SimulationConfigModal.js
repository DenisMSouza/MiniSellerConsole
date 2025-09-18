import React, { useState } from "react";
import { useSimulationConfig } from "../contexts/SimulationConfigContext";
import { Button } from "./ui/button";
import { DEFAULT_SIMULATION_CONFIG } from "../utils/storageUtils";

const SimulationConfigModal = ({ isOpen, onClose }) => {
  const { config, updateConfig, resetAllData } = useSimulationConfig();
  const [localConfig, setLocalConfig] = useState(config);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
    setShowResetConfirm(false);
    onClose();
  };

  const handleResetAllData = () => {
    if (showResetConfirm) {
      // Confirm reset
      resetAllData();
      setLocalConfig(DEFAULT_SIMULATION_CONFIG);
      setShowResetConfirm(false);
      onClose();
      // Reload the page to refresh all data
      window.location.reload();
    } else {
      // Show confirmation
      setShowResetConfirm(true);
    }
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
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
                  Configuration & Data Management
                </h3>
                {/* Simulation Configuration Section */}
                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-600"
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
                    <h4 className="ml-2 text-md font-medium text-gray-900">
                      Simulation Configuration
                    </h4>
                  </div>
                  <div className="space-y-4">
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
                        Error Chance:{" "}
                        {Math.round(localConfig.errorChance * 100)}%
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

                    {/* Reset Config Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Reset Config to Defaults
                      </Button>
                      <p className="mt-2 text-xs text-gray-500">
                        Reset simulation settings to their default values
                      </p>
                    </div>
                  </div>

                  {/* App Data Management Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                      <h4 className="ml-2 text-md font-medium text-gray-900">
                        App Data Management
                      </h4>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Manage your application data. Use these options to reset
                        or clear data while preserving your simulation settings.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          onClick={handleResetAllData}
                          className={`inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            showResetConfirm
                              ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500"
                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500"
                          }`}
                        >
                          {showResetConfirm
                            ? "Confirm Reset All Data"
                            : "Reset App Data"}
                        </Button>
                        {showResetConfirm && (
                          <Button
                            variant="outline"
                            onClick={handleCancelReset}
                            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel Reset
                          </Button>
                        )}
                      </div>
                      {showResetConfirm && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h5 className="text-sm font-medium text-red-800">
                                Reset App Data
                              </h5>
                              <div className="mt-2 text-sm text-red-700">
                                <p>
                                  This will permanently delete all your app data
                                  including:
                                </p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li>All lead edits and updates</li>
                                  <li>All created opportunities</li>
                                  <li>All filter and sort preferences</li>
                                </ul>
                                <p className="mt-2 text-sm text-red-600">
                                  <strong>Note:</strong> Simulation settings
                                  will be preserved.
                                </p>
                                <p className="mt-2 font-medium">
                                  This action cannot be undone. The app will
                                  reload with original data.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
