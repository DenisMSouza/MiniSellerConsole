export const getStageColor = (stage) => {
  switch (stage) {
    case "Discovery":
      return "bg-blue-100 text-blue-800";
    case "Qualification":
      return "bg-yellow-100 text-yellow-800";
    case "Proposal":
      return "bg-purple-100 text-purple-800";
    case "Negotiation":
      return "bg-orange-100 text-orange-800";
    case "Closed Won":
      return "bg-green-100 text-green-800";
    case "Closed Lost":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) {
    return "TBD";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getAmountColor = (amount) => {
  if (amount === null || amount === undefined) {
    return "text-gray-500";
  }
  if (amount >= 100000) return "text-green-600 font-semibold";
  if (amount >= 50000) return "text-blue-600 font-semibold";
  if (amount >= 25000) return "text-yellow-600 font-semibold";
  return "text-gray-600";
};
