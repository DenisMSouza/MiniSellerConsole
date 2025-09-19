import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import DataCards from "./DataCards";
import ControlledPagination from "./ControlledPagination";

const ResponsiveDataView = ({
  data,
  columns,
  onRowClick,
  title,
  subtitle,
  filterComponent,
  resultsText,
  emptyMessage = "No data available",
  emptyIcon,
  emptyAction,
  itemsPerPage = 10,
  showPagination = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Check on mount
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Calculate pagination for mobile
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data ? data.slice(startIndex, endIndex) : [];

  // Handle page change for mobile
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Common props for both components
  const commonProps = {
    columns,
    onRowClick,
    emptyMessage,
    emptyIcon,
    emptyAction,
  };

  if (isMobile) {
    return (
      <>
        {/* Filter Component */}
        {filterComponent && <div className="mb-6">{filterComponent}</div>}

        {/* Mobile Cards View with Pagination */}
        <DataCards {...commonProps} data={paginatedData} />

        {/* Pagination for mobile */}
        {showPagination && (
          <ControlledPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        )}
      </>
    );
  }

  // Desktop table view
  return (
    <>
      {/* Filter Component */}
      {filterComponent && <div className="mb-6">{filterComponent}</div>}

      {/* Results Text */}
      {resultsText && (
        <div className="mb-4 text-sm text-gray-500">{resultsText}</div>
      )}

      {/* Desktop Table View */}
      <DataTable
        {...commonProps}
        data={paginatedData}
        title=""
        subtitle=""
        filterComponent={null}
        resultsText=""
        itemsPerPage={itemsPerPage}
        showPagination={false}
      />

      {/* Pagination for desktop */}
      {showPagination && (
        <ControlledPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      )}
    </>
  );
};

export default ResponsiveDataView;
