import React from "react";
import LeadsList from "../components/LeadsList";
import PageHeader from "../components/PageHeader";

const LeadsPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Leads Console"
        subtitle="Manage and triage your leads"
      />
      <LeadsList />
    </div>
  );
};

export default LeadsPage;
