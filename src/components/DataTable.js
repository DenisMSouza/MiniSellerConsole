import React from "react";

const DataTable = ({
  data,
  columns,
  onRowClick,
  filterComponent,
  resultsText,
  emptyMessage = "No data available",
  emptyIcon,
}) => {
  // Use data directly since pagination is now handled by parent
  const displayData = data || [];

  if (!data || data.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        {filterComponent}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-12 text-center">
            {/* Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              {emptyIcon || (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
            </div>

            {/* Message */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {emptyMessage}
            </h3>
            <p className="text-gray-500 mb-6">
              {emptyMessage === "No leads found"
                ? "Try adjusting your search or filters."
                : "Create your first opportunity to start tracking your sales pipeline."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {filterComponent}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {resultsText && (
        <div className="mt-4 text-sm text-gray-500">{resultsText}</div>
      )}
    </div>
  );
};

export default DataTable;
