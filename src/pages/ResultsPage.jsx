import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import ResultsHeaderCard from "../features/results/components/ResultsHeaderCard";
import FinancialSummaryCard from "../features/results/components/FinancialSummaryCard";
import CashFlowCard from "../features/results/components/CashFlowCard";
import InvestmentDetailsCard from "../features/results/components/InvestmentDetailsCard";
import KeyInsightCard from "../features/results/components/KeyInsightCard"; // Import komponen baru
import { NavStateContext } from "../shared/contexts";

function ResultsPage() {
  const API_BASE = "/api";
  const navState = useContext(NavStateContext);
  const { roiResult, formCalculated } = navState;

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    console.log("roiResult from context:", roiResult);
    console.log("formCalculated:", formCalculated);

    if (roiResult) {
      setResultData(roiResult);
      console.log("Menggunakan data dari context");
    } else if (formCalculated) {
      console.log("Mengambil data terbaru dari API");
      getLatestRoiResult();
    }
  }, [roiResult, formCalculated]);

  const getLatestRoiResult = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/roi-results");
      const results = res.data.data;

      if (results.length > 0) {
        const latestResult = results[results.length - 1];
        console.log("Data terbaru dari API:", latestResult);
        setResultData(latestResult);
      }
    } catch (error) {
      console.error("Error fetching ROI results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format angka Rupiah
  const formatRupiah = (num) => {
    if (num === null || num === undefined) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Hitung profit margin
  const calculateProfitMargin = () => {
    if (!resultData?.total_revenue || resultData.total_revenue === 0) return 0;
    return (resultData.net_profit / resultData.total_revenue) * 100;
  };

  // Redirect jika belum ada perhitungan
  if (!formCalculated && !loading) {
    return <Navigate to={"/kalkulator"} replace />;
  }

  if (loading) {
    return <p className="text-center mt-8">Loading ROI data...</p>;
  }

  if (!resultData) {
    return (
      <div className="text-center mt-8">
        <p>Data hasil perhitungan tidak ditemukan.</p>
        <Link to="/kalkulator" className="text-blue-500 underline">
          Kembali ke Kalkulator
        </Link>
      </div>
    );
  }

  const result = resultData;

  return (
    <section className="flex flex-col w-sm md:w-4xl m-auto py-8 px-2">
      {/* Header dengan ROI Summary */}
      <ResultsHeaderCard
        roi_percentage={result.roi_percentage || 0}
        net_profit={formatRupiah(result.net_profit)}
        payback_period_years={result.payback_period_years?.toFixed(1) || "0.0"}
      />

      {/* Financial Summary */}
      <section className="grid md:grid-cols-2 md:gap-8 mt-4">
        <FinancialSummaryCard
          initial_investment={formatRupiah(
            result.financialDetails?.initial_investment
          )}
          total_revenue={formatRupiah(result.total_revenue)}
          total_operating_cost={formatRupiah(result.total_operating_cost)}
          net_profit={formatRupiah(result.net_profit)}
        />
        <CashFlowCard
          monthly_revenue={formatRupiah(
            result.total_revenue / (result.financialDetails?.timeframe || 24)
          )}
          monthly_operating_cost={formatRupiah(
            result.total_operating_cost /
            (result.financialDetails?.timeframe || 24)
          )}
          monthly_profit={formatRupiah(
            result.net_profit / (result.financialDetails?.timeframe || 24)
          )}
          profit_margin={calculateProfitMargin()}
        />
      </section>

      {/* Investment details */}
      <InvestmentDetailsCard
        business_model={result.businessStrategy?.business_model || "N/A"}
        funding_option={result.businessStrategy?.funding_option || "N/A"}
        timeframe={`${result.financialDetails?.timeframe || 24} months`}
        selected_equipment={
          result.businessStrategy?.equipments?.map(
            (eq) => eq.equipment?.equipment_type
          ) || []
        }
      />

      {/* Key Insights Section */}
      <section className="mt-4 border border-gray-300 rounded-2xl p-8">
        <header className="font-semibold text-lg mb-4">Key Insights</header>
        <KeyInsightCard roiData={result} />
      </section>

      {/* Buttons */}
      <section className="grid md:grid-cols-2 gap-4 mt-8">
        <button className="flex flex-row justify-center gap-2 py-2 text-white rounded-2xl transition-colors bg-black hover:bg-black/50 cursor-pointer">
          <TrendingUp />
          <Link to={"/dashboard"}>View Detailed Dashboard</Link>
        </button>
        <button className="w-full py-2 text-black rounded-2xl transition-colors bg-white border border-gray-300 hover:bg-black/10 cursor-pointer">
          <Link to={"/kalkulator"}>Recalculate with Different Parameters</Link>
        </button>
      </section>
    </section>
  );
}

export default ResultsPage;
