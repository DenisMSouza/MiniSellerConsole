import React from "react";
import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";
import SortButton from "./SortButton";

const Filter = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <StatusFilter
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
        />
        <SortButton
          sortBy="score"
          onSortChange={onSortChange}
          currentSort={sortBy}
          label="Score"
        />
      </div>
    </div>
  );
};

export default Filter;
