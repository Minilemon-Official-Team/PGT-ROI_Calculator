/* eslint-disable no-unused-vars */
import { useContext, useMemo } from "react";
import { NavStateContext } from "../contexts";

// Pindahkan semua helper functions ke ATAS sebelum useDashboardData
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

const generateMonthlyProjections = (financialDetails, roi, paybackYears) => {
  const monthlyProfit =
    (financialDetails?.expected_monthly_revenue || 0) -
    (financialDetails?.monthly_operating_cost || 0);
  const projections = [];

  for (let month = 1; month <= 12; month++) {
    projections.push({
      month: month,
      revenue: financialDetails?.expected_monthly_revenue || 0,
      cost: financialDetails?.monthly_operating_cost || 0,
      profit: monthlyProfit,
      cumulative:
        monthlyProfit * month - (financialDetails?.initial_investment || 0),
      roiProgress: Math.min((month / (paybackYears * 12)) * roi, roi),
    });
  }

  return projections;
};

const generateYearlyProjections = (
  financialDetails,
  netProfit,
  paybackYears
) => {
  const yearlyProfit = netProfit / (financialDetails?.timeframe / 12) || 0;
  const projections = [];

  for (let year = 1; year <= 5; year++) {
    projections.push({
      year: year,
      revenue: (financialDetails?.expected_monthly_revenue || 0) * 12 * year,
      profit: yearlyProfit * year,
      cumulativeProfit:
        yearlyProfit * year - (financialDetails?.initial_investment || 0),
      roi:
        year <= paybackYears
          ? (year / paybackYears) *
            (netProfit / (financialDetails?.initial_investment || 1)) *
            100
          : (netProfit / (financialDetails?.initial_investment || 1)) * 100,
    });
  }

  return projections;
};

// Main hook function
export const useDashboardData = () => {
  const navState = useContext(NavStateContext);
  const { roiResult } = navState;

  // Generate chart data dari ROI result
  const chartData = useMemo(() => {
    if (!roiResult) return [];

    const { financialDetails, roi_percentage, payback_period_years } =
      roiResult;
    const timeframe = financialDetails?.timeframe || 24;

    return Array.from({ length: timeframe }, (_, index) => {
      const month = index + 1;
      const progress = Math.min(month / (payback_period_years * 12), 1);
      const currentRoi = roi_percentage * progress;

      return {
        month: month,
        revenue: financialDetails?.expected_monthly_revenue || 0,
        cost: financialDetails?.monthly_operating_cost || 0,
        profit:
          (financialDetails?.expected_monthly_revenue || 0) -
          (financialDetails?.monthly_operating_cost || 0),
        roi: Math.min(currentRoi, roi_percentage),
        cumulativeProfit:
          ((financialDetails?.expected_monthly_revenue || 0) -
            (financialDetails?.monthly_operating_cost || 0)) *
            month -
          (financialDetails?.initial_investment || 0),
      };
    });
  }, [roiResult]);

  // Data untuk investment breakdown
  const investmentData = useMemo(() => {
    if (!roiResult) return null;

    const { financialDetails } = roiResult;
    const initialInvestment = financialDetails?.initial_investment || 0;

    return {
      initialInvestment,
      monthlyRevenue: financialDetails?.expected_monthly_revenue || 0,
      operatingCosts: financialDetails?.monthly_operating_cost || 0,
      monthlyPercentage:
        ((financialDetails?.expected_monthly_revenue || 0) /
          initialInvestment) *
        100,
      operatingPercentage:
        ((financialDetails?.monthly_operating_cost || 0) / initialInvestment) *
        100,
      timeframe: financialDetails?.timeframe || 24,
    };
  }, [roiResult]);

  // Equipment list
  const equipmentList = useMemo(() => {
    if (!roiResult?.businessStrategy?.equipments) return [];

    return roiResult.businessStrategy.equipments
      .map((eq) => eq.equipment?.equipment_type)
      .filter(Boolean);
  }, [roiResult]);

  // Data untuk funding & models tab
  const fundingModelsData = useMemo(() => {
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

  // Data untuk projections tab
  const projectionsData = useMemo(() => {
    if (!roiResult) return null;

    const {
      financialDetails,
      roi_percentage,
      net_profit,
      payback_period_years,
    } = roiResult;
    const monthlyProfit =
      (financialDetails?.expected_monthly_revenue || 0) -
      (financialDetails?.monthly_operating_cost || 0);

    return {
      monthlyProjections: generateMonthlyProjections(
        financialDetails,
        roi_percentage,
        payback_period_years
      ),
      yearlyProjections: generateYearlyProjections(
        financialDetails,
        net_profit,
        payback_period_years
      ),
      breakEvenPoint: payback_period_years * 12, // dalam bulan
      totalROI: roi_percentage,
      netProfit: net_profit,
    };
  }, [roiResult]);

  return {
    // Main metrics untuk header
    metrics: {
      roi: roiResult?.roi_percentage || 0,
      netProfit: roiResult?.net_profit || 0,
      paybackPeriod: roiResult?.payback_period_years || 0,
    },

    // Chart data
    chartData,

    // Investment breakdown data
    investmentData,

    // Equipment
    equipmentList,

    // Business info
    businessInfo: {
      model: roiResult?.businessStrategy?.business_model,
      funding: roiResult?.businessStrategy?.funding_option,
    },

    // Funding & Models tab data
    fundingModelsData,

    // Projections tab data
    projectionsData,

    // Loading state
    isLoading: !roiResult,

    // Format helpers
    formatRupiah: (amount) => {
      if (!amount && amount !== 0) return "Rp0";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
    },

    formatPercentage: (value) => {
      return `${value?.toFixed(1) || "0"}%`;
    },
  };
};
