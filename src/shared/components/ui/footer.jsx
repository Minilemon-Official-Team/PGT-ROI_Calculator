import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100 text-center text-sm text-gray-600 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <p>
          © Platform Kalkulator ROI 2024. Dirancang untuk analisis
          keuangan dan perencanaan investasi.
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
            Perbandingan Model Bisnis
          </span>
          <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
            Dashboard Interaktif
          </span>
          <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
            Kemampuan Ekspor
          </span>
        </div>
      </div>
    </footer>
  );
}
