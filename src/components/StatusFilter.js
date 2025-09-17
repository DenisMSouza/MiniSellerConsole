import React from "react";

const StatusFilter = ({
  statusFilter,
  onStatusFilterChange,
  options = null,
}) => {
  const defaultOptions = [
    { value: "", label: "All Statuses" },
    { value: "New", label: "New" },
    { value: "Contacted", label: "Contacted" },
    { value: "Qualified", label: "Qualified" },
  ];

  const statusOptions = options || defaultOptions;
  const isActive = statusFilter !== ""; // Active when a specific status is selected

  return (
    <div className="sm:w-48">
      <div className="relative">
        <select
          className={`block w-full pl-3 pr-10 py-2 border appearance-none rounded-md leading-5 focus:outline-none focus:ring-1 sm:text-sm transition-colors ${
            isActive
              ? "bg-blue-50 border-blue-500 text-blue-700 focus:ring-blue-500 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          }`}
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={`h-5 w-5 ${
              isActive ? "text-blue-600" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
