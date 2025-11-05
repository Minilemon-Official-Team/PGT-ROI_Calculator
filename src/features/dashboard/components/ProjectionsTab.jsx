import ProjectionsChart from "./ProjectionsChart";
import ProgressBar from "../../../shared/components/ui/ProgressBar";

function ProjectionsTab({ data }) {

  const { projectionsData, formatRupiah } = data;

  const monthlyProjection = projectionsData?.monthlyProjections || [];
  const breakEvenMonth = projectionsData?.breakEvenPoint || 0;
  const percentageProgress =
    breakEvenMonth > 0
      ? Math.min((12 / breakEvenMonth) * 100, 100)
      : 0;

  const year1Profit = monthlyProjection[11]?.cumulativeProfit || 0;
  const year3Profit = monthlyProjection[35]?.cumulativeProfit || year1Profit;

  return (
    <div className="flex flex-col">
      <section className="flex flex-col border border-gray-300 rounded-2xl p-6 sm:p-8 w-full max-w-[1200px] mx-auto">
        <h2 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-6">
          Funding Sources Distribution
        </h2>
        <div className="flex justify-center items-center py-6 sm:py-12 px-4 sm:px-8 w-full h-[320px] sm:h-[500px]">
          <div className="w-full h-full">
            <ProjectionsChart data={monthlyProjection} />
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 border border-gray-300 rounded-2xl p-8 ">
          <h2>Break-even Analysis</h2>
          <ProgressBar
            title={"Break Even-Month"}
            percentageProgress={percentageProgress}
            value={breakEvenMonth.toFixed(1)}
          />
          <span>Time to recover initial investment</span>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 rounded-2xl p-8 ">
          <h2>Growth Potential</h2>
          <div className="flex flex-row justify-between">
            <span>Year 1 Profit</span>
            <span className="font-semibold" style={{ color: "#1E824C" }}>
              {formatRupiah(year1Profit)}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>3-Year Projection</span>
            <span className="font-semibold" style={{ color: "#2E46BF" }}>
              {formatRupiah(year3Profit)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectionsTab;
