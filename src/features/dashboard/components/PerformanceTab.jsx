import RevenueCostChart from "./RevenueCostChart";
import ROITrajectoryChart from "./ROITrajectoryChart";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import ItemPill from "../../../shared/components/ui/ItemPill";

function PerformanceTab({ data }) {

  const { monthlyProjection, projectionsData, formatRupiah } = data;

  const initialInvestment = projectionsData?.initialInvestment || 0;

  const firstMonth = projectionsData?.monthlyProjections?.[0] || {};
  const monthlyRevenue = firstMonth.revenue || 0;
  const operatingCost = firstMonth.cost || 0;

  const initialInvestmentPercentage = 100;
  const monthlyPercentage = initialInvestment
    ? (monthlyRevenue / initialInvestment) * 100
    : 0;
  const operatingCosts = initialInvestment
    ? (operatingCost / initialInvestment) * 100
    : 0;

  return (
    <div className="flex flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-300 rounded-2xl p-8 flex items-center h-[400px]">
          <RevenueCostChart data={monthlyProjection} />
        </div>
        <div className="border border-gray-300 rounded-2xl p-8 flex items-center h-[400px]">
          <ROITrajectoryChart data={projectionsData.roiTrajectory} />
        </div>
      </section>
      <section className="border border-gray-300 rounded-2xl p-8 mt-8">
        <h2>Investment Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <ProgressBar
            title={"Initial Investment"}
            percentageProgress={initialInvestmentPercentage}
            value={formatRupiah(initialInvestment)}
          />
          <ProgressBar
            title={"Monthly Revenue"}
            percentageProgress={monthlyPercentage}
            value={formatRupiah(monthlyRevenue)}
          />
          <ProgressBar
            title={"Operating Costs"}
            percentageProgress={operatingCosts}
            value={formatRupiah(operatingCost)}
          />
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 mt-4">
          <ItemPill value={"Industrial Printers"} />
        </div>
      </section>
    </div>
  );
}

export default PerformanceTab;
