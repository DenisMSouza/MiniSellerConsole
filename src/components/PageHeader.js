import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
