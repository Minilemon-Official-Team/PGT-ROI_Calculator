import React from "react";

export const Button = ({ children, disabled }) => (
  <button
    disabled={disabled}
    className={`px-6 py-2 rounded-lg font-medium transition ${
      disabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-black text-white hover:bg-gray-800"
    }`}
  >
    {children}
  </button>
);
