import ResultsHeaderCard from "../features/results/components/ResultsHeaderCard";
import FinancialSummaryCard from "../features/results/components/FinancialSummaryCard";
import CashFlowCard from "../features/results/components/CashFlowCard";
import InvestmentDetailsCard from "../features/results/components/InvestmentDetailsCard";
import KeyInsightCard from "../features/results/components/KeyInsightCard";
import { TrendingUp } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { NavStateContext } from "../shared/contexts";

function ResultsPage() {
  const navState = useContext(NavStateContext);
  const { roiResult } = navState;

  if (!navState.formCalculated || !roiResult) {
    return <Navigate to={"/kalkulator"} replace />;
  }

  // Format angka Rupiah
  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  return (
    <section className="flex flex-col w-sm md:w-4xl m-auto py-8 px-2">
      {/* Header dengan ROI Summary */}
      <ResultsHeaderCard
        roi_percentage={roiResult.roi_percentage}
        net_profit={formatRupiah(roiResult.net_profit)}
        payback_period_years={roiResult.payback_period_years.toFixed(1)}
      />

      {/* Financial Summary */}
      <section className="grid md:grid-cols-2 md:gap-8">
        <FinancialSummaryCard
          initial_investment={formatRupiah(
            roiResult.total_operating_cost + roiResult.net_profit
          )}
          total_revenue={formatRupiah(roiResult.total_revenue)}
          total_operating_cost={formatRupiah(roiResult.total_operating_cost)}
          net_profit={formatRupiah(roiResult.net_profit)}
        />
        <CashFlowCard
          monthly_revenue={formatRupiah(roiResult.total_revenue / 12)}
          monthly_operating_cost={formatRupiah(
            roiResult.total_operating_cost / 12
          )}
          monthly_profit={formatRupiah(roiResult.net_profit / 12)}
        />
      </section>

      {/* Investment details */}
      <InvestmentDetailsCard
        business_model={roiResult.business_model}
        funding_option={roiResult.funding_option}
        timeframe={`${roiResult.timeframe} months`}
      />

      {/* Insights */}
      <section className="mt-4 border border-gray-300 rounded-2xl p-8">
        <header>Key Insights</header>
        <div className="grid md:grid-cols-2 gap-4">
          <KeyInsightCard
            roi={roiResult.roi_percentage}
            payback={roiResult.payback_period_years}
            net_profit={roiResult.net_profit}
          />
        </div>
      </section>

      {/* Buttons */}
      <section className="grid md:grid-cols-2 gap-4 mt-8">
        <button className="flex flex-row justify-center gap-2 py-2 text-white rounded-2xl transition-colors bg-black hover:bg-black/50 cursor-pointer">
          <TrendingUp />
          <Link to={"/hasil"}>View Detailed Dashboard</Link>
        </button>
        <button className="w-full py-2 text-black rounded-2xl transition-colors bg-white border border-gray-300 hover:bg-black/10 cursor-pointer">
          <Link to={"/kalkulator"}>Recalculate with Different Parameters</Link>
        </button>
      </section>
    </section>
  );
}

export default ResultsPage;
