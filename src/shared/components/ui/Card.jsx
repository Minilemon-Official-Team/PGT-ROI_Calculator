import React from "react";

export const Card = ({ children, className }) => (
  <div
    className={`p-5 bg-white rounded-2xl shadow-sm border border-gray-300 ${
      className || ""
    }`}
  >
    {children}
  </div>
);
