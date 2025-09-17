import React from "react";

const SortButton = ({ sortBy, onSortChange, currentSort, label }) => {
  const isActive = currentSort === `${sortBy}-desc`;
  const isDescending = currentSort === `${sortBy}-desc`;

  const handleClick = () => {
    if (isActive && isDescending) {
      // If already sorted by this field in descending order, clear sort
      onSortChange("");
    } else {
      // Sort by this field in descending order
      onSortChange(`${sortBy}-desc`);
    }
  };

  const displayLabel =
    label || sortBy.charAt(0).toUpperCase() + sortBy.slice(1);

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100"
          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span className="mr-1">{displayLabel}</span>
      <svg
        className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    </button>
  );
};

export default SortButton;
