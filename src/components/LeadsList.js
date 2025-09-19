import React, { useState } from "react";
import DataTable from "./DataTable";
import Filter from "./Filter";
import LeadDetailsDrawer from "./LeadDetailsDrawer";
import LoadingSpinner from "./LoadingSpinner";
import { useLeadsData } from "../hooks/useLeadsData";
import { useOpportunitiesData } from "../hooks/useOpportunitiesData";
import { useSimulationConfig } from "../contexts/SimulationConfigContext";
import { useLeadsFiltersStorage } from "../hooks/useFiltersStorage";
import { getStatusColor, getScoreColor } from "../utils/leadsUtils";
import { toast } from "sonner";

const LeadsList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Local state - not persisted
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Shared header component
  const PageHeader = () => (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads Console</h1>
      <p className="text-gray-600">Manage and triage your leads</p>
    </div>
  );

  // Get simulation config from context
  const { config } = useSimulationConfig();

  // Get filters and sort state from localStorage (only status filter and sort)
  const { filters, updateFilters } = useLeadsFiltersStorage();
  const { statusFilter, sortBy } = filters;

  // Use the leads data management hook
  const { leads, loading, error, updateLead, resetData, refreshData } =
    useLeadsData(
      config.leadsDelay,
      [config.simulateErrors, config.errorChance],
      {
        simulateError: config.simulateErrors,
        errorChance: config.errorChance,
      }
    );

  // Use the opportunities data management hook for lead conversion
  const { opportunities, addOpportunity } = useOpportunitiesData();

  // Handle loading and error states
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <PageHeader />
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-12 text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Loading leads...
            </h3>
            <p className="text-gray-500">
              Please wait while we fetch your leads data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <PageHeader />
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
              Failed to load leads
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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortBy === "score-desc") {
      return b.score - a.score;
    }
    return 0;
  });

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedLead(null);
  };

  const handleLeadSave = (updatedLead) => {
    // Update leads data in localStorage
    updateLead(updatedLead);

    // Show success toast notification
    toast.success("Lead Updated Successfully!", {
      description: `${updatedLead.name}'s information has been saved.`,
      duration: 3000,
    });

    // Close the drawer after saving
    setIsDrawerOpen(false);
    setSelectedLead(null);

    console.log("Lead updated and saved to localStorage:", updatedLead);
  };

  const handleLeadConvert = (lead) => {
    // Generate the next sequential ID based on existing opportunities
    const maxId = Math.max(...opportunities.map((opp) => opp.id), 12); // Start from 12 (highest JSON ID)
    const nextId = maxId + 1;

    // Create a new opportunity that looks identical to JSON opportunities
    const newOpportunity = {
      id: nextId, // Sequential numeric ID like JSON
      name: `${lead.name} - ${lead.company}`, // Opportunity name
      stage: "Prospecting", // Default stage for new opportunities
      amount: null, // No amount initially (same as some JSON entries)
      accountName: lead.company, // Use company as account name
      // Store conversion metadata in localStorage but don't show in UI
      _metadata: {
        leadId: lead.id,
        leadName: lead.name, // Preserve original lead name
        convertedAt: new Date().toISOString(),
        source: "lead_conversion",
      },
    };

    // Add the new opportunity
    addOpportunity(newOpportunity);

    // Show success toast notification
    toast.success("Lead Converted Successfully!", {
      description: `${lead.name} from ${lead.company} has been converted to an opportunity.`,
      duration: 4000,
    });

    console.log("Lead converted to opportunity:", newOpportunity);
  };

  const columns = [
    {
      header: "Lead",
      key: "name",
      render: (lead) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
          <div className="text-sm text-gray-500">{lead.email}</div>
        </div>
      ),
    },
    {
      header: "Company",
      key: "company",
      render: (lead) => (
        <div className="text-sm text-gray-900">{lead.company}</div>
      ),
    },
    {
      header: "Source",
      key: "source",
      render: (lead) => (
        <div className="text-sm text-gray-900">{lead.source}</div>
      ),
    },
    {
      header: "Score",
      key: "score",
      render: (lead) => (
        <span className={`text-sm ${getScoreColor(lead.score)}`}>
          {lead.score}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (lead) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            lead.status
          )}`}
        >
          {lead.status}
        </span>
      ),
    },
  ];

  const filterComponent = (
    <Filter
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      statusFilter={statusFilter}
      onStatusFilterChange={(value) => updateFilters({ statusFilter: value })}
      sortBy={sortBy}
      onSortChange={(value) => updateFilters({ sortBy: value })}
    />
  );

  const resultsText = (
    <div className="flex items-center justify-between">
      <span>
        Showing {sortedLeads.length} of {leads.length} leads
        {(searchTerm || statusFilter || sortBy) && (
          <span className="ml-2 text-indigo-600">
            ({searchTerm && `filtered by "${searchTerm}"`}
            {searchTerm && statusFilter && " and "}
            {statusFilter && `status: ${statusFilter}`}
            {(searchTerm || statusFilter) && sortBy && " and "}
            {sortBy && `sorted by score (desc)`})
          </span>
        )}
      </span>
    </div>
  );

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
    <>
      <DataTable
        data={sortedLeads}
        columns={columns}
        onRowClick={handleLeadClick}
        title="Leads Console"
        subtitle="Manage and triage your leads"
        filterComponent={filterComponent}
        resultsText={resultsText}
        emptyMessage="No leads found"
        emptyIcon={leadsEmptyIcon}
        emptyAction={leadsEmptyAction}
      />

      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onSave={handleLeadSave}
        onConvert={handleLeadConvert}
      />
    </>
  );
};

export default LeadsList;
