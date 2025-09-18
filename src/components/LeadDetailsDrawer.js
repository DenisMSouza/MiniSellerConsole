import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "./ui/drawer";
import { Button } from "./ui/button";
import {
  getStatusColor,
  getScoreColor,
  validateEmail,
} from "../utils/leadsUtils";

const LeadDetailsDrawer = ({ lead, isOpen, onClose, onSave, onConvert }) => {
  const [editedLead, setEditedLead] = useState(lead);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showConvertConfirm, setShowConvertConfirm] = useState(false);

  useEffect(() => {
    if (lead) {
      setEditedLead(lead);
      setIsEditing(false);
      setErrors({});
      setHasChanges(false);
    }
  }, [lead]);

  const handleFieldChange = (field, value) => {
    const newEditedLead = { ...editedLead, [field]: value };
    setEditedLead(newEditedLead);
    setHasChanges(true);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }

    // Validate email in real-time
    if (field === "email" && value && !validateEmail(value)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
    } else if (field === "email" && validateEmail(value)) {
      setErrors({ ...errors, email: null });
    }
  };

  const handleSave = () => {
    const newErrors = {};

    // Validate email
    if (!editedLead.email || !validateEmail(editedLead.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate status
    if (!editedLead.status) {
      newErrors.status = "Please select a status";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(editedLead);
    setIsEditing(false);
    setHasChanges(false);
    setErrors({});
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
    setHasChanges(false);
    setErrors({});
  };

  const handleConvertLead = () => {
    if (onConvert) {
      onConvert(lead);
      setShowConvertConfirm(false);
      onClose(); // Close the drawer after conversion
    }
  };

  const handleConvertConfirm = () => {
    setShowConvertConfirm(true);
  };

  const handleCancelConvert = () => {
    setShowConvertConfirm(false);
  };

  if (!lead) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-semibold">
                Lead Details
              </DrawerTitle>
              <DrawerDescription>
                View and edit lead information
              </DrawerDescription>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={!hasChanges}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={
                      !hasChanges || Object.values(errors).some(Boolean)
                    }
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="text-sm text-gray-900 font-medium">
                    {lead.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <div className="text-sm text-gray-900">{lead.company}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="email"
                        value={editedLead.email}
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md text-sm ${
                          errors.email
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">{lead.email}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <div className="text-sm text-gray-900">{lead.source}</div>
                </div>
              </div>
            </div>

            {/* Status and Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Lead Status & Score
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  {isEditing ? (
                    <div>
                      <select
                        value={editedLead.status}
                        onChange={(e) =>
                          handleFieldChange("status", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md text-sm ${
                          errors.status
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                      >
                        <option value="">Select status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.status}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score
                  </label>
                  <div
                    className={`text-lg font-semibold ${getScoreColor(
                      lead.score
                    )}`}
                  >
                    {lead.score}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleConvertConfirm}
                >
                  Convert Lead
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Convert Lead Confirmation */}
        {showConvertConfirm && (
          <div className="border-t bg-yellow-50 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
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
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-medium text-yellow-800">
                  Convert Lead to Opportunity
                </h4>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Are you sure you want to convert "{lead.name}" from{" "}
                    {lead.company} into an opportunity?
                  </p>
                  <p className="mt-1">
                    This will create a new opportunity and the lead will remain
                    in your leads list.
                  </p>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleConvertLead}
                  >
                    Yes, Convert Lead
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelConvert}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <DrawerFooter className="border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Lead ID: {lead.id}</div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LeadDetailsDrawer;
