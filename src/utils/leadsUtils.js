// Utility functions for lead-related operations

export const getStatusColor = (status) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800";
    case "Contacted":
      return "bg-yellow-100 text-yellow-800";
    case "Qualified":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getScoreColor = (score) => {
  if (score >= 90) return "text-green-600 font-semibold";
  if (score >= 80) return "text-blue-600 font-semibold";
  if (score >= 70) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
