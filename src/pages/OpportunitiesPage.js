import React from "react";
import OpportunitiesList from "../components/OpportunitiesList";
import PageHeader from "../components/PageHeader";

const OpportunitiesPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Opportunities Console"
        subtitle="Manage your sales pipeline and opportunities"
      />
      <OpportunitiesList />
    </div>
  );
};

export default OpportunitiesPage;
