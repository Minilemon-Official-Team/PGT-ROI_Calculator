import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100 text-center text-sm text-gray-600 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <p>
          © 2024 ROI Calculator Platform. Built for financial analysis and
          investment planning.
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
            NYC Borough Analysis
          </span>
          <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
            Business Model Comparison
          </span>
          <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
            Interactive Dashboards
          </span>
          <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
            Export Capabilities
          </span>
        </div>
      </div>
    </footer>
  );
}
