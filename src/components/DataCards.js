import React from "react";

const DataCards = ({
  data,
  columns,
  onRowClick,
  emptyMessage = "No data available",
  emptyIcon,
  emptyAction,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-12 text-center">
          {emptyIcon && (
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              {emptyIcon}
            </div>
          )}
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {emptyMessage}
          </h3>
          {emptyAction && <div className="mt-6">{emptyAction}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((row, rowIndex) => (
        <div
          key={row.id || rowIndex}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onRowClick && onRowClick(row)}
        >
          <div className="space-y-3">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  {column.header}
                </div>
                <div className="text-sm text-gray-900">
                  {column.render ? column.render(row) : row[column.key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCards;
