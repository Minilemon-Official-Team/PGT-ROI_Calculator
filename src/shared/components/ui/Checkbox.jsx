import React from "react";

export const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <div
      className={`w-4 h-4 border rounded flex items-center justify-center transition-colors duration-200
        ${checked ? "bg-black border-black" : "bg-gray-200 border-gray-300"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute w-4 h-4 opacity-0 cursor-pointer m-0"
      />
      {checked && (
        <span className="text-white text-xs pointer-events-none">✔</span>
      )}
    </div>
    <span>{label}</span>
  </label>
);
