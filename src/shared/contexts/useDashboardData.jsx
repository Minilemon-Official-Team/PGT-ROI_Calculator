// shared/hooks/useDashboardData.js - PERBAIKAN ROI TRAJECTORY
import { useContext, useMemo } from "react";
import { NavStateContext } from "../contexts";

export const useDashboardData = () => {
  const navState = useContext(NavStateContext);
  const { roiResult } = navState;

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

  // **PERBAIKAN: Data untuk projections tab dengan ROI trajectory BULANAN**
  const projectionsData = useMemo(() => {
    if (!roiResult?.chartData?.monthlyData) return null;

    const monthlyProjection = roiResult.chartData.monthlyData;
    const initialInvestment =
      roiResult.financialDetails?.initial_investment || 0;
    const metrics = {
      roi: roiResult.roi_percentage || 0,
      netProfit: roiResult.net_profit || 0,
      paybackPeriod: roiResult.payback_period_years || 0,
    };

    // **PERBAIKAN: Ambil 12-24 bulan pertama untuk monthly projections**
    const monthlyProjections = monthlyProjection.slice(0, 24); // 24 bulan pertama

    // **PERBAIKAN: Generate ROI trajectory BULANAN, bukan tahunan**
    const roiTrajectory = monthlyProjection.map((month, index) => {
      const cumulativeInvestment = initialInvestment;
      const roi =
        cumulativeInvestment > 0
          ? ((month.cumulativeProfit + initialInvestment) /
            cumulativeInvestment) *
          100
          : 0;

      return {
        month: index + 1,
        revenue: month.revenue,
        profit: month.profit,
        cumulativeProfit: month.cumulativeProfit,
        roi: Math.max(roi, 0), // ROI tidak boleh negatif
      };
    });

    // **PERBAIKAN: Sample data untuk chart (max 24 titik)**
    const sampledRoiTrajectory = roiTrajectory.filter(
      (_, index) =>
        index % Math.ceil(roiTrajectory.length / 24) === 0 ||
        index === roiTrajectory.length - 1
    );

    return {

      initialInvestment,

      monthlyProjections: monthlyProjections.slice(0, 12), // 12 bulan untuk tabel
      roiTrajectory: sampledRoiTrajectory, // ROI trajectory bulanan untuk chart
      breakEvenPoint: metrics.paybackPeriod * 12, // dalam bulan
      totalROI: metrics.roi,
      netProfit: metrics.netProfit,
      // **TAMBAHAN: Data untuk chart yang compatible dengan existing component**
      chartData: {
        monthlyRoiGrowth: {
          labels: sampledRoiTrajectory.map((item) => `Month ${item.month}`),
          datasets: [
            {
              label: "ROI Progress",
              data: sampledRoiTrajectory.map((item) => item.roi),
              borderColor: "#ff7300",
              backgroundColor: "rgba(255, 115, 0, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
      },
    };
  }, [roiResult]);

  // Conditional return
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

  const chartData = roiResult.chartData;
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
    monthlyProjection,

    // Tab-specific data
    fundingModelsData,
    projectionsData, // ← SEKARANG SUDAH ADA ROI TRAJECTORY BULANAN

    // State
    isLoading: false,

    // Utilities
    formatRupiah,
    formatPercentage,
  };
};
