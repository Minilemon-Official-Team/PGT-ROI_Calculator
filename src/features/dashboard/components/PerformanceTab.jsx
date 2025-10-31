import RevenueCostChart from "./RevenueCostChart";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import ItemPill from "../../../shared/components/ui/ItemPill";
function PerformanceTab() {
    const initialInvestment = 50000;
    const initialInvestmentPercentage = 100;
    const monthlyPercentage = (8000 / initialInvestment) * 100;
    const operatingCosts = (3000 / initialInvestment) * 100;
    return (
        <div className="flex flex-col">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-300 rounded-2xl p-8 flex items-center h-[400px]">
                    <RevenueCostChart />
                </div>
                <div className="border border-gray-300 rounded-2xl p-8">
                    test
                </div>
            </section>
            <section className="border border-gray-300 rounded-2xl p-8 mt-8">
                <h2>Investment Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                    <ProgressBar
                        title={"Initial Investment"}
                        percentageProgress={initialInvestmentPercentage}
                        value={initialInvestment}
                    />
                    <ProgressBar
                        title={"Monthly Revenue"}
                        percentageProgress={monthlyPercentage}
                        value={8000}
                    />
                    <ProgressBar
                        title={"Operating Costs"}
                        percentageProgress={operatingCosts}
                        value={3000}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:gap-4 mt-4">
                    <ItemPill
                        value={"Industrial Printers"}
                    />
                </div>
            </section>
        </div>
    )
}

export default PerformanceTab;