import React from "react";
import DataTable from "./DataTable";
import LoadingSpinner from "./LoadingSpinner";
import { useOpportunitiesData } from "../hooks/useOpportunitiesData";
import { useSimulationConfig } from "../contexts/SimulationConfigContext";
import {
  getStageColor,
  formatCurrency,
  getAmountColor,
} from "../utils/opportunitiesUtils";

const OpportunitiesList = () => {
  // Get simulation config from context
  const { config } = useSimulationConfig();

  // Use the opportunities data management hook
  const { opportunities, loading, error, refreshData } = useOpportunitiesData(
    config.opportunitiesDelay,
    [config.simulateErrors, config.errorChance],
    {
      simulateError: config.simulateErrors,
      errorChance: config.errorChance,
    }
  );

  const handleOpportunityClick = (opportunity) => {
    // TODO: Implement opportunity details drawer
    console.log("Opportunity clicked:", opportunity);
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Opportunities Console
          </h1>
          <p className="text-gray-600">
            Manage your sales pipeline and opportunities
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-12 text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Loading opportunities...
            </h3>
            <p className="text-gray-500">
              Please wait while we fetch your opportunities data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Opportunities Console
          </h1>
          <p className="text-gray-600">
            Manage your sales pipeline and opportunities
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg
                className="h-8 w-8 text-red-600"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Failed to load opportunities
            </h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button
              onClick={refreshData}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      header: "Opportunity",
      key: "name",
      render: (opportunity) => (
        <div className="text-sm font-medium text-gray-900">
          {opportunity.name}
        </div>
      ),
    },
    {
      header: "Account",
      key: "accountName",
      render: (opportunity) => (
        <div className="text-sm text-gray-900">{opportunity.accountName}</div>
      ),
    },
    {
      header: "Stage",
      key: "stage",
      render: (opportunity) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
            opportunity.stage
          )}`}
        >
          {opportunity.stage}
        </span>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (opportunity) => (
        <span className={`text-sm ${getAmountColor(opportunity.amount)}`}>
          {formatCurrency(opportunity.amount)}
        </span>
      ),
    },
  ];

  const resultsText = `Showing ${opportunities.length} opportunities`;

  // Custom icon for opportunities empty state
  const opportunitiesEmptyIcon = (
    <svg
      className="h-8 w-8 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );

  // Action button for opportunities empty state
  const opportunitiesEmptyAction = (
    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <svg
        className="h-4 w-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Create Opportunity
    </button>
  );

  return (
    <DataTable
      data={opportunities}
      columns={columns}
      onRowClick={handleOpportunityClick}
      title="Opportunities Console"
      subtitle="Manage your sales pipeline and opportunities"
      resultsText={resultsText}
      emptyMessage="No opportunities found"
      emptyIcon={opportunitiesEmptyIcon}
      emptyAction={opportunitiesEmptyAction}
    />
  );
};

export default OpportunitiesList;
