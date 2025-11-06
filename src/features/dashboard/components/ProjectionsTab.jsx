// features/dashboard/components/ProjectionsTab.jsx
import { useState } from "react";
import ROITrajectoryChart from "./ROITrajectoryChart";

function ProjectionsTab({ data, projectionsData }) {
  const [selectedPeriod, setSelectedPeriod] = useState(12);

  // **PERBAIKAN: Gunakan growthPotential3Years untuk display tetap**
  const growthPotential3Years = data.growthPotential3Years;

  // Data untuk chart yang mengikuti filter
  const filteredRoiTrajectory =
    projectionsData?.roiTrajectory?.filter(
      (item) => item.month <= selectedPeriod
    ) || [];

  return (
    <div className="space-y-6">
      {/* Header dengan filter bulan */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projections</h2>

        {/* Filter Bulan */}
        <div className="flex items-center gap-2">
          <label htmlFor="periodFilter" className="text-sm text-gray-600">
            Show Period:
          </label>
          <select
            id="periodFilter"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={6}>6 Months</option>
            <option value={12}>12 Months</option>
            <option value={18}>18 Months</option>
            <option value={24}>24 Months</option>
            <option value={30}>30 Months</option>
            <option value={36}>36 Months</option>
          </select>
        </div>
      </div>

      {/* **TAMBAHAN: Growth Potential 3 Years Card (selalu tampil) */}
      {growthPotential3Years && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-sm p-6 border border-purple-200">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">
            Growth Potential - 3 Years
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-600">3-Year ROI</div>
              <div className="text-2xl font-bold text-purple-700">
                {data.formatPercentage(growthPotential3Years.totalROI)}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-600">3-Year Net Profit</div>
              <div className="text-2xl font-bold text-green-600">
                {data.formatRupiah(growthPotential3Years.netProfit)}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-600">Initial Investment</div>
              <div className="text-2xl font-bold text-blue-600">
                {data.formatRupiah(growthPotential3Years.initialInvestment)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROI Growth Trajectory Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">ROI Growth Trajectory</h3>
        <div className="h-80">
          {filteredRoiTrajectory.length > 0 ? (
            <ROITrajectoryChart data={filteredRoiTrajectory} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No ROI trajectory data available
            </div>
          )}
        </div>
      </div>

      {/* Tabel Projections */}
      {projectionsData?.monthlyProjections && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">
            Monthly Projections ({selectedPeriod} Months)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Month</th>
                  <th className="px-4 py-2 text-right">Revenue</th>
                  <th className="px-4 py-2 text-right">Profit</th>
                  <th className="px-4 py-2 text-right">Cumulative Profit</th>
                  <th className="px-4 py-2 text-right">ROI</th>
                </tr>
              </thead>
              <tbody>
                {projectionsData.monthlyProjections
                  .filter((_, index) => index < selectedPeriod)
                  .map((month, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">
                        Month {index + 1}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {data.formatRupiah(month.revenue)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {data.formatRupiah(month.profit)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {data.formatRupiah(month.cumulativeProfit)}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold">
                        {data.formatPercentage(
                          filteredRoiTrajectory[index]?.roi || 0
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectionsTab;
