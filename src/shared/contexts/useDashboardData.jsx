// shared/hooks/useDashboardData.js - PERBAIKAN FILTER BULAN
import { useContext, useMemo, useState, useEffect } from "react";
import { NavStateContext } from "../contexts";

export const useDashboardData = () => {
  const navState = useContext(NavStateContext);
  const { roiResult, period: initialPeriod } = navState;

  const [dashboardPeriod, setDashboardPeriod] = useState(36);

  useEffect(() => {
    if (initialPeriod && initialPeriod <= 36) {
      setDashboardPeriod(initialPeriod);
    }
  }, [initialPeriod]);

  // Data untuk funding & models tab (dari BE)
  const fundingModelsData = useMemo(() => {
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
    if (!roiResult) return null;

    const { businessStrategy, financialDetails } = roiResult;

    return {
      businessModel: businessStrategy?.business_model || "Not specified",
      fundingOption: businessStrategy?.funding_option || "Not specified",
      strategyName: businessStrategy?.strategy_name || "Custom Strategy",
      timeframe: financialDetails?.timeframe || 24,
      riskLevel: calculateRiskLevel(roiResult.roi_percentage),
      recommendation: generateRecommendation(roiResult),
    };
  }, [roiResult]);

  // **PERBAIKAN: Gunakan dashboardPeriod untuk filtering, bukan initialPeriod**
  const projectionsData = useMemo(() => {
    if (!roiResult?.chartData?.monthlyData) return null;

    const allMonthlyData = roiResult.chartData.monthlyData;
    const maxAvailableMonths = Math.min(allMonthlyData.length, 36);

    // **GUNAKAN dashboardPeriod untuk data yang difilter**
    const monthlyProjection = allMonthlyData.slice(0, dashboardPeriod);

    const initialInvestment =
      roiResult.financialDetails?.initial_investment || 0;
    const metrics = {
      roi: roiResult.roi_percentage || 0,
      netProfit: roiResult.net_profit || 0,
      paybackPeriod: roiResult.payback_period_years || 0,
    };

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
        roi: Math.max(roi, 0),
      };
    });

    console.log("roiTrajectory", roiTrajectory);
    return {
      initialInvestment,
      monthlyProjections: monthlyProjection,
      roiTrajectory: roiTrajectory,
      breakEvenPoint: metrics.paybackPeriod * 12,
      totalROI: metrics.roi,
      netProfit: metrics.netProfit,
      maxAvailableMonths,
    };
  }, [roiResult, dashboardPeriod]);

  // **DATA BARU: Growth Potential 3 Years (selalu 36 bulan)**
  const growthPotential3Years = useMemo(() => {
    if (!roiResult?.chartData?.monthlyData) return null;

    const allMonthlyData = roiResult.chartData.monthlyData;

    // **SELALU ambil 36 bulan, atau maksimal yang tersedia**
    const monthsToShow = Math.min(36, allMonthlyData.length);
    const monthlyProjection = allMonthlyData.slice(0, monthsToShow);

    const initialInvestment =
      roiResult.financialDetails?.initial_investment || 0;

    // Generate ROI trajectory untuk 36 bulan
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
        roi: Math.max(roi, 0),
      };
    });

    // Hitung metrics untuk 3 years
    const threeYearROI =
      roiTrajectory.length > 0
        ? roiTrajectory[roiTrajectory.length - 1].roi
        : 0;
    const threeYearNetProfit =
      roiTrajectory.length > 0
        ? roiTrajectory[roiTrajectory.length - 1].cumulativeProfit
        : 0;

    return {
      roiTrajectory: roiTrajectory,
      totalROI: threeYearROI,
      netProfit: threeYearNetProfit,
      monthlyProjections: monthlyProjection,
      initialInvestment: initialInvestment,
    };
  }, [roiResult]); // **TIDAK tergantung dashboardPeriod**

  // Fungsi update dashboard period
  const updateDashboardPeriod = (newPeriod) => {
    if (newPeriod >= 1 && newPeriod <= 36) {
      setDashboardPeriod(newPeriod);
    }
  };

  // Conditional return
  if (!roiResult) {
    return {
      metrics: { roi: 0, netProfit: 0, paybackPeriod: 0 },
      chartData: null,
      businessInfo: { model: "", funding: "", equipment: [] },
      monthlyProjection: [],
      fundingModelsData: null,
      projectionsData: null,
      growthPotential3Years: null,
      isLoading: true,
      formatRupiah: (amount) => `Rp${amount?.toLocaleString() || "0"}`,
      formatPercentage: (value) => `${value?.toFixed(1) || "0"}%`,
      dashboardPeriod: 12,
      updateDashboardPeriod: () => { },
      maxAvailableMonths: 36,
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
    projectionsData, // Data yang mengikuti filter user
    growthPotential3Years, // **DATA BARU: Selalu 36 bulan**

    // State & functions
    dashboardPeriod,
    updateDashboardPeriod,
    maxAvailableMonths: projectionsData?.maxAvailableMonths || 36,

    // State
    isLoading: false,

    // Utilities
    formatRupiah,
    formatPercentage,
  };
};
