/* eslint-disable no-unused-vars */
import PeriodDropDown from "./PeriodDropDown";
import { Download } from "lucide-react";

import { useContext, useMemo } from "react";
import { NavStateContext } from "../../../shared/contexts";
import { useDashboardData } from "../../../shared/contexts/useDashboardData";

function DashboardHeader() {
  const { period, setPeriod } = useContext(NavStateContext);

  const periodOptions = useMemo(() => [6, 12, 24, 36], []);

  const {
    projectionsData,
    metrics,
    businessInfo,
    fundingModelsData,
    formatRupiah,
    formatPercentage,
  } = useDashboardData();

  const handleExportCSV = () => {
    if (!projectionsData?.monthlyProjections) {
      alert("No data available to export");
      return;
    }

    const csvData = [];

    // 1. Header dan Metadata
    csvData.push(["ROI ANALYSIS REPORT"]);
    csvData.push(["Generated on", new Date().toLocaleString("id-ID")]);
    csvData.push([]);

    // 2. Business Information
    csvData.push(["BUSINESS INFORMATION"]);
    csvData.push(["Business Model", businessInfo.model]);
    csvData.push(["Funding Option", businessInfo.funding]);
    csvData.push(["Equipment", businessInfo.equipment.join(", ")]);
    csvData.push([]);

    // 3. Key Metrics
    csvData.push(["KEY METRICS"]);
    csvData.push(["ROI", `${metrics.roi.toFixed(2)}%`]);
    csvData.push(["Net Profit", formatRupiah(metrics.netProfit)]);
    csvData.push(["Payback Period", `${metrics.paybackPeriod} years`]);
    csvData.push([
      "Initial Investment",
      formatRupiah(projectionsData.initialInvestment),
    ]);
    csvData.push(["Analysis Period", `${period} months`]);
    csvData.push([]);

    // 4. Risk Assessment (jika ada)
    if (fundingModelsData) {
      csvData.push(["RISK ASSESSMENT"]);
      csvData.push(["Risk Level", fundingModelsData.riskLevel.level]);
      csvData.push(["Recommendation", fundingModelsData.recommendation]);
      csvData.push([]);
    }

    // 5. Monthly Projections Header
    csvData.push(["MONTHLY PROJECTIONS"]);
    csvData.push([
      "Month",
      "Revenue (IDR)",
      "Operating Cost (IDR)",
      "Profit (IDR)",
      "Cumulative Profit (IDR)",
      "ROI (%)",
      "Revenue Growth (%)",
      "Capacity Utilization (%)",
    ]);

    // 6. Monthly Data
    projectionsData.monthlyProjections.forEach((month, index) => {
      const roiValue = projectionsData.roiTrajectory?.[index]?.roi || 0;
      csvData.push([
        `Month ${index + 1}`,
        month.revenue,
        month.cost,
        month.profit,
        month.cumulativeProfit,
        roiValue.toFixed(2),
        (month.revenueGrowth || 0).toFixed(2),
        (month.capacityUtilization || 0).toFixed(2),
      ]);
    });

    csvData.push([]);

    // 7. Summary
    csvData.push(["PROJECTION SUMMARY"]);
    csvData.push([
      "Total Revenue",
      formatRupiah(
        projectionsData.monthlyProjections.reduce(
          (sum, month) => sum + month.revenue,
          0
        )
      ),
    ]);
    csvData.push([
      "Total Operating Cost",
      formatRupiah(
        projectionsData.monthlyProjections.reduce(
          (sum, month) => sum + month.cost,
          0
        )
      ),
    ]);
    csvData.push([
      "Final Cumulative Profit",
      formatRupiah(
        projectionsData.monthlyProjections[
          projectionsData.monthlyProjections.length - 1
        ]?.cumulativeProfit || 0
      ),
    ]);
    csvData.push([
      "Final ROI",
      formatPercentage(
        projectionsData.roiTrajectory?.[
          projectionsData.roiTrajectory.length - 1
        ]?.roi || 0
      ),
    ]);

    // Convert ke CSV string
    const csvContent = csvData
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    // Download file
    downloadCSVFile(
      csvContent,
      `roi-analysis-report-${new Date().toISOString().split("T")[0]}`
    );
  };

  // Helper function untuk download
  const downloadCSVFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="flex flex-col md:flex-row mt-8 justify-between border border-gray-300 p-8 rounded-2xl">
      <header>
        <h2 className="font-bold">ROI Analytics Dashboard</h2>
        <p>Comprehensive analysis of your investment performance</p>
      </header>
      <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
        <PeriodDropDown
          data={periodOptions}
          name={"period-options"}
          value={`${period} months`}
          onChange={(e) => setPeriod(e)}
        />
        <button
          className="flex flex-row gap-2 items-center px-4 py-2 w-fit border rounded-xl"
          onClick={handleExportCSV}
        >
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>
    </section>
  );
}

export default DashboardHeader;
