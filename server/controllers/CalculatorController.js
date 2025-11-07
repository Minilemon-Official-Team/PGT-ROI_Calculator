import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllRoiResults = async (req, res) => {
  try {
    const results = await prisma.rOIResult.findMany({
      include: {
        financialDetails: true,
        businessStrategy: {
          include: {
            equipments: {
              include: { equipment: true },
            },
          },
        },
      },
    });

    res.status(200).json({
      message: "Daftar hasil ROI berhasil diambil!",
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching ROI results: ", error);
    res.status(500).json({ message: "Gagal mengambil data ROI" });
  }
};

export const calculateRoi = async (req, res) => {
  try {
    const { financial_details, business_strategy, equipments } = req.body;

    console.log("=== NEW ROI CALCULATION ===");
    console.log("Received payload:", JSON.stringify(req.body, null, 2));

    // Validasi input
    if (!financial_details) {
      return res
        .status(400)
        .json({ message: "Data financial_details diperlukan" });
    }

    // Ambil data keuangan
    const {
      initial_investment,
      expected_monthly_revenue,
      monthly_operating_cost,
      timeframe,
    } = financial_details;

    // Validasi data required
    if (
      !initial_investment ||
      !expected_monthly_revenue ||
      !monthly_operating_cost
    ) {
      return res.status(400).json({
        message:
          "Semua data keuangan diperlukan: initial_investment, expected_monthly_revenue, monthly_operating_cost",
      });
    }

    // Konversi ke number dengan precision
    const initInvest = parseFloat(initial_investment);
    const monthlyRev = parseFloat(expected_monthly_revenue);
    const monthlyCost = parseFloat(monthly_operating_cost);
    const timeFrame = parseInt(timeframe) || 36;

    console.log("Input values:", {
      initial_investment: initInvest,
      expected_monthly_revenue: monthlyRev,
      monthly_operating_cost: monthlyCost,
      timeframe: timeFrame,
    });

    // Generate data bulanan
    const monthlyData = generateDynamicMonthlyData({
      initial_investment: initInvest,
      expected_monthly_revenue: monthlyRev,
      monthly_operating_cost: monthlyCost,
      timeframe: 36,
      business_model: business_strategy?.business_model,
    });

    // **PERBAIKAN: Data untuk timeframe user**
    const userTimeframeData = monthlyData.slice(0, timeFrame);

    // **PERBAIKAN: Hitung dengan precision**
    const revenue_for_user_timeframe = userTimeframeData.reduce(
      (sum, month) => sum + month.revenue,
      0
    );
    const cost_for_user_timeframe = userTimeframeData.reduce(
      (sum, month) => sum + month.cost,
      0
    );
    const net_profit = revenue_for_user_timeframe - cost_for_user_timeframe;
    const roi_percentage = (net_profit / initInvest) * 100;

    console.log("Calculation results:", {
      revenue_total: revenue_for_user_timeframe,
      cost_total: cost_for_user_timeframe,
      net_profit: net_profit,
      roi_percentage: roi_percentage,
      months_used: timeFrame,
    });

    // Hitung payback period
    const payback_period_years = calculateDynamicPaybackPeriod(
      userTimeframeData,
      initInvest
    );

    console.log("Final metrics:", {
      net_profit: Math.round(net_profit),
      roi_percentage: parseFloat(roi_percentage.toFixed(2)),
      payback_period_years: payback_period_years,
    });

    // Simpan ke database (sisa kode tetap sama)
    const newFinancial = await prisma.financialDetails.create({
      data: {
        initial_investment: initInvest,
        expected_monthly_revenue: monthlyRev,
        monthly_operating_cost: monthlyCost,
        timeframe: timeFrame,
      },
    });

    // Handle business strategy
    let fundingOptionValue = null;
    let businessModelValue = null;

    if (business_strategy) {
      fundingOptionValue =
        typeof business_strategy.funding_option === "object"
          ? business_strategy.funding_option.label
          : business_strategy.funding_option;

      businessModelValue =
        typeof business_strategy.business_model === "object"
          ? business_strategy.business_model.label
          : business_strategy.business_model;
    }

    const newStrategy = await prisma.businessStrategy.create({
      data: {
        strategy_name: "Custom Strategy",
        funding_option: fundingOptionValue,
        business_model: businessModelValue,
      },
    });

    // Hubungkan Equipments
    if (equipments && Array.isArray(equipments) && equipments.length > 0) {
      const validEquipmentIds = equipments.filter(
        (id) => Number.isInteger(id) && id > 0
      );
      for (const equipmentId of validEquipmentIds) {
        await prisma.businessStrategyEquipment.create({
          data: {
            businessStrategyId: newStrategy.id,
            equipmentId: equipmentId,
          },
        });
      }
    }

    // Simpan hasil ROI
    const newResult = await prisma.rOIResult.create({
      data: {
        roi_percentage: parseFloat(roi_percentage.toFixed(2)),
        net_profit: Math.round(net_profit), // **PERBAIKAN: Gunakan Math.round**
        payback_period_years: payback_period_years,
        total_revenue: Math.round(revenue_for_user_timeframe),
        total_operating_cost: Math.round(cost_for_user_timeframe),
        financialDetailsId: newFinancial.id,
        businessStrategyId: newStrategy.id,
      },
    });

    // Ambil data lengkap dan response
    const resultWithRelations = await prisma.rOIResult.findUnique({
      where: { id: newResult.id },
      include: {
        financialDetails: true,
        businessStrategy: {
          include: {
            equipments: {
              include: { equipment: true },
            },
          },
        },
      },
    });

    // Generate ROI trajectory
    const consistentRoiTrajectory = userTimeframeData.map((month, index) => {
      const roi =
        initInvest > 0
          ? ((month.cumulativeProfit + initInvest) / initInvest) * 100
          : 0;
      return {
        month: index + 1,
        revenue: month.revenue,
        profit: month.profit,
        cumulativeProfit: month.cumulativeProfit,
        roi: Math.max(roi, 0),
      };
    });

    console.log("=== CALCULATION COMPLETE ===");

    res.status(201).json({
      message: "Perhitungan ROI berhasil!",
      data: {
        ...resultWithRelations,
        chartData: {
          revenueCost: generateRevenueCostChartData(monthlyData),
          roiGrowth: generateRoiGrowthChartData(
            monthlyData,
            roi_percentage,
            initInvest
          ),
          performanceMetrics: generatePerformanceMetrics(resultWithRelations),
          monthlyData: monthlyData,
          roiTrajectory: consistentRoiTrajectory,
        },
      },
    });
  } catch (error) {
    console.error("Error calculating ROI: ", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menghitung ROI",
      error: error.message,
    });
  }
};

// **PERUBAHAN: Update helper function untuk handle 36 bulan dengan lebih smooth**
// **PERBAIKAN: Hilangkan randomness untuk hasil yang konsisten**
const generateDynamicMonthlyData = ({
  initial_investment,
  expected_monthly_revenue,
  monthly_operating_cost,
  timeframe,
  business_model,
}) => {
  const monthlyData = [];

  // **PERBAIKAN: Gunakan fixed starting point**
  const startCapacity = 0.6; // 60% capacity di bulan pertama
  let currentRevenue = expected_monthly_revenue * startCapacity;
  const currentCost = monthly_operating_cost; // Cost tetap

  // Growth factors berdasarkan business model
  const growthFactors = getGrowthFactors(business_model);

  for (let month = 1; month <= timeframe; month++) {
    // **PERBAIKAN: Growth calculation yang deterministic**
    if (month > 1) {
      let growthRate = growthFactors.monthlyGrowth;

      // Growth reduction pattern yang fixed
      if (month > 24) {
        growthRate = growthFactors.monthlyGrowth * 0.3;
      } else if (month > 12) {
        growthRate = growthFactors.monthlyGrowth * 0.7;
      }

      // **PERBAIKAN: Growth calculation tanpa randomness**
      currentRevenue = currentRevenue * (1 + growthRate);

      // Cap at max capacity
      if (
        currentRevenue >
        expected_monthly_revenue * growthFactors.maxCapacity
      ) {
        currentRevenue = expected_monthly_revenue * growthFactors.maxCapacity;
      }
    }

    // **PERBAIKAN: Seasonal multiplier yang deterministic**
    const seasonalMultiplier = getDeterministicSeasonalMultiplier(month);
    const adjustedRevenue = currentRevenue * seasonalMultiplier;

    // **PERBAIKAN: Profit calculation dengan rounding yang konsisten**
    const revenue = Math.round(adjustedRevenue);
    const cost = Math.round(currentCost);
    const profit = revenue - cost;

    // **PERBAIKAN KRITIS: Cumulative profit calculation yang benar**
    let cumulativeProfit;
    if (month === 1) {
      cumulativeProfit = profit - initial_investment;
    } else {
      cumulativeProfit = monthlyData[month - 2].cumulativeProfit + profit;
    }

    monthlyData.push({
      month,
      revenue: revenue,
      cost: cost,
      profit: profit,
      cumulativeProfit: cumulativeProfit,
      revenueGrowth:
        month > 1
          ? Math.round(
              ((revenue - monthlyData[month - 2].revenue) /
                monthlyData[month - 2].revenue) *
                100
            )
          : 0,
      capacityUtilization: Math.round(
        (revenue / expected_monthly_revenue) * 100
      ),
    });
  }

  return monthlyData;
};

// **PERUBAHAN: Update growth factors untuk 36 bulan yang lebih realistic**
const getGrowthFactors = (business_model) => {
  const factors = {
    "B2B Manufacturing": { monthlyGrowth: 0.06, maxCapacity: 1.15 }, // Growth lebih konservatif
    "Penjualan Langsung (B2C)": { monthlyGrowth: 0.08, maxCapacity: 1.3 },
    "Layanan Berlangganan": { monthlyGrowth: 0.04, maxCapacity: 1.05 }, // Growth kecil tapi stabil
    "Waralaba (Franchise)": { monthlyGrowth: 0.05, maxCapacity: 1.2 },
    "Produksi (B2B)": { monthlyGrowth: 0.055, maxCapacity: 1.12 },
  };

  return factors[business_model] || { monthlyGrowth: 0.05, maxCapacity: 1.15 };
};

// **PERUBAHAN: Update seasonal multiplier untuk pattern yang lebih smooth**
const getDeterministicSeasonalMultiplier = (month) => {
  // Pattern yang sama setiap tahun, tanpa variasi
  const monthInYear = ((month - 1) % 12) + 1;

  switch (monthInYear) {
    case 1:
      return 0.95; // January
    case 2:
      return 0.98; // February
    case 3:
      return 1.02; // March
    case 4:
      return 1.05; // April
    case 5:
      return 1.08; // May
    case 6:
      return 1.1; // June (peak)
    case 7:
      return 1.08; // July
    case 8:
      return 1.05; // August
    case 9:
      return 1.02; // September
    case 10:
      return 0.98; // October
    case 11:
      return 0.95; // November
    case 12:
      return 0.92; // December
    default:
      return 1.0;
  }
};

// **PERUBAHAN: Update chart data functions untuk handle 36 bulan**
const generateRevenueCostChartData = (monthlyData) => {
  // Untuk 36 bulan, sample lebih banyak titik agar smooth
  const sampleRate = Math.ceil(monthlyData.length / 18); // 18-20 titik untuk 36 bulan
  const sampledData = monthlyData.filter(
    (_, index) => index % sampleRate === 0 || index === monthlyData.length - 1
  );

  return {
    labels: sampledData.map((item) => `Month ${item.month}`),
    datasets: [
      {
        label: "Revenue",
        data: sampledData.map((item) => item.revenue),
        borderColor: "#8884d8",
        backgroundColor: "#8884d8",
        type: "line",
        tension: 0.4,
      },
      {
        label: "Cost",
        data: sampledData.map((item) => item.cost),
        borderColor: "#82ca9d",
        backgroundColor: "#82ca9d",
        type: "line",
        tension: 0.4,
      },
      {
        label: "Profit",
        data: sampledData.map((item) => item.profit),
        borderColor: "#ffc658",
        backgroundColor: "#ffc658",
        type: "bar",
      },
    ],
  };
};

const generateRoiGrowthChartData = (
  monthlyData,
  finalROI,
  initialInvestment
) => {
  const roiData = monthlyData.map((item) => ({
    month: item.month,
    roi:
      ((item.cumulativeProfit + initialInvestment) / initialInvestment) * 100,
  }));

  // Sample rate yang sesuai untuk 36 bulan
  const sampleRate = Math.ceil(roiData.length / 12); // 12 titik untuk 36 bulan
  const sampledROIData = roiData.filter(
    (_, index) => index % sampleRate === 0 || index === roiData.length - 1
  );

  return {
    labels: sampledROIData.map((item) => `Month ${item.month}`),
    datasets: [
      {
        label: "ROI Progress",
        data: sampledROIData.map((item) => Math.min(item.roi, finalROI)),
        borderColor: "#ff7300",
        backgroundColor: "rgba(255, 115, 0, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Target ROI",
        data: sampledROIData.map(() => finalROI),
        borderColor: "#000000",
        borderDash: [5, 5],
        borderWidth: 1,
        fill: false,
      },
    ],
  };
};

const generatePerformanceMetrics = (roiResult) => {
  const { financialDetails, roi_percentage, net_profit, payback_period_years } =
    roiResult;

  return {
    summary: {
      roi: roi_percentage,
      netProfit: net_profit,
      paybackPeriod: payback_period_years,
      totalMonths: financialDetails.timeframe, // Timeframe asli dari user
    },
    averages: {
      monthlyRevenue: financialDetails.expected_monthly_revenue,
      monthlyCost: financialDetails.monthly_operating_cost,
      monthlyProfit:
        financialDetails.expected_monthly_revenue -
        financialDetails.monthly_operating_cost,
    },
    efficiency: {
      profitMargin:
        (net_profit /
          (financialDetails.expected_monthly_revenue *
            financialDetails.timeframe)) *
          100 || 0,
      investmentEfficiency:
        (net_profit / financialDetails.initial_investment) * 100,
    },
  };
};

const calculateDynamicPaybackPeriod = (monthlyData, initialInvestment) => {
  console.log("Payback calculation - Initial investment:", initialInvestment);

  for (let i = 0; i < monthlyData.length; i++) {
    const cumulativeProfit = monthlyData[i].cumulativeProfit;
    console.log(`Month ${i + 1}: Cumulative Profit = ${cumulativeProfit}`);

    // **PERBAIKAN: Break-even ketika cumulativeProfit >= 0**
    if (cumulativeProfit >= 0) {
      const paybackMonths = i + 1;
      const paybackYears = paybackMonths / 12;
      console.log(
        `Break-even at month ${paybackMonths} (${paybackYears.toFixed(
          2
        )} years)`
      );
      return parseFloat(paybackYears.toFixed(2));
    }
  }

  // Jika tidak mencapai break-even
  const maxPayback = monthlyData.length / 12;
  console.log(
    `No break-even reached. Max payback: ${maxPayback.toFixed(2)} years`
  );
  return parseFloat(maxPayback.toFixed(2));
};
