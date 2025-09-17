import React from "react";
import DataTable from "./DataTable";

const EmptyStateTest = () => {
  const columns = [
    {
      header: "Name",
      key: "name",
    },
    {
      header: "Status",
      key: "status",
    },
  ];

  // Custom icon for leads empty state
  const leadsEmptyIcon = (
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
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  // Action button for leads empty state
  const leadsEmptyAction = (
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
      Add Lead
    </button>
  );

  return (
    <DataTable
      data={[]} // Empty array to show empty state
      columns={columns}
      title="Leads Console"
      subtitle="Manage and triage your leads"
      emptyMessage="No leads found"
      emptyIcon={leadsEmptyIcon}
      emptyAction={leadsEmptyAction}
    />
  );
};

export default EmptyStateTest;
