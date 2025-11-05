// shared/hooks/useDashboardData.js - YANG SUDAH DIPERBAIKI
import { useContext, useMemo } from "react";
import { NavStateContext } from "../contexts";

export const useDashboardData = () => {
  const navState = useContext(NavStateContext);
  const { roiResult } = navState;

  // **PERBAIKAN: Pindahkan semua useMemo ke ATAS sebelum conditional return**

  // Data untuk funding & models tab (dari BE)
  const fundingModelsData = useMemo(() => {
    if (!roiResult) return null;

    const calculateRiskLevel = (roi) => {
      if (roi > 100) return { level: "Low", color: "green" };
      if (roi > 50) return { level: "Medium", color: "orange" };
      if (roi > 0) return { level: "High", color: "red" };
      return { level: "Very High", color: "darkred" };
    };

    const generateRecommendation = (result) => {
      const { roi_percentage, payback_period_years } = result;

      if (roi_percentage > 100 && payback_period_years < 2) {
        return "Excellent investment with quick returns. Recommended to proceed.";
      } else if (roi_percentage > 50) {
        return "Good investment potential. Consider optimizing costs for better returns.";
      } else if (roi_percentage > 0) {
        return "Moderate investment. Review business strategy and cost structure.";
      } else {
        return "High risk investment. Not recommended without significant changes.";
      }
    };

    const businessModel =
      roiResult.businessStrategy?.business_model || "Not specified";
    const fundingOption =
      roiResult.businessStrategy?.funding_option || "Not specified";
    const roi = roiResult.roi_percentage || 0;

    return {
      businessModel,
      fundingOption,
      strategyName: "Custom Strategy",
      timeframe: roiResult.financialDetails?.timeframe || 24,
      riskLevel: calculateRiskLevel(roi),
      recommendation: generateRecommendation(roiResult),
    };
  }, [roiResult]);

  // Data untuk projections tab (dari BE monthlyData)
  const projectionsData = useMemo(() => {
    if (!roiResult?.chartData?.monthlyData) return null;

    const monthlyProjection = roiResult.chartData.monthlyData;
    const metrics = {
      roi: roiResult.roi_percentage || 0,
      netProfit: roiResult.net_profit || 0,
      paybackPeriod: roiResult.payback_period_years || 0,
    };

    const monthlyProjections = monthlyProjection.slice(0, 12); // 12 bulan pertama
    const yearlyProjections = [];

    // Generate yearly projections dari monthly data
    for (let year = 1; year <= 5; year++) {
      const yearData = monthlyProjection.slice(0, year * 12);
      const yearlyRevenue = yearData.reduce(
        (sum, month) => sum + month.revenue,
        0
      );
      const yearlyProfit = yearData.reduce(
        (sum, month) => sum + month.profit,
        0
      );

      yearlyProjections.push({
        year: year,
        revenue: yearlyRevenue,
        profit: yearlyProfit,
        cumulativeProfit:
          yearlyProfit - (roiResult.financialDetails?.initial_investment || 0),
        roi:
          (yearlyProfit /
            (roiResult.financialDetails?.initial_investment || 1)) *
          100,
      });
    }

    return {
      monthlyProjections,
      yearlyProjections,
      breakEvenPoint: metrics.paybackPeriod * 12,
      totalROI: metrics.roi,
      netProfit: metrics.netProfit,
    };
  }, [roiResult]);

  // **PERBAIKAN: Conditional return SETELAH semua hooks**
  if (!roiResult) {
    return {
      metrics: { roi: 0, netProfit: 0, paybackPeriod: 0 },
      chartData: null,
      businessInfo: { model: "", funding: "", equipment: [] },
      monthlyProjection: [],
      fundingModelsData: null,
      projectionsData: null,
      isLoading: true,
      formatRupiah: (amount) => `Rp${amount?.toLocaleString() || "0"}`,
      formatPercentage: (value) => `${value?.toFixed(1) || "0"}%`,
    };
  }

  // **PERBAIKAN: Gunakan data dinamis dari BE, bukan hitung ulang di FE**
  const metrics = {
    roi: roiResult.roi_percentage || 0,
    netProfit: roiResult.net_profit || 0,
    paybackPeriod: roiResult.payback_period_years || 0,
  };

  const businessInfo = {
    model: roiResult.businessStrategy?.business_model || "Not specified",
    funding: roiResult.businessStrategy?.funding_option || "Not specified",
    equipment:
      roiResult.businessStrategy?.equipments?.map(
        (eq) => eq.equipment?.equipment_type
      ) || [],
  };

  // **PERBAIKAN: Chart data langsung dari BE response (sudah dinamis!)**
  const chartData = roiResult.chartData;

  // **PERBAIKAN: Monthly projection dari BE (data dinamis)**
  const monthlyProjection = chartData?.monthlyData || [];

  // Helper functions
  const formatRupiah = (amount) => {
    if (!amount && amount !== 0) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(1) || "0"}%`;
  };

  return {
    // Data utama
    metrics,
    chartData,
    businessInfo,
    monthlyProjection, // ← DATA BARU: monthly projection dinamis

    // Tab-specific data
    fundingModelsData,
    projectionsData,

    // State
    isLoading: false,

    // Utilities
    formatRupiah,
    formatPercentage,
  };
};
