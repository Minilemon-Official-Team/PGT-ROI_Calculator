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

    console.log("Received payload:", req.body); // Debug

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
      !monthly_operating_cost ||
      !timeframe
    ) {
      return res.status(400).json({
        message:
          "Semua data keuangan diperlukan: initial_investment, expected_monthly_revenue, monthly_operating_cost, timeframe",
      });
    }

    // **PERBAIKAN: Konversi ke number dan pastikan tipe data sesuai schema**
    const initInvest = parseInt(initial_investment);
    const monthlyRev = parseInt(expected_monthly_revenue);
    const monthlyCost = parseInt(monthly_operating_cost);
    const timeFrame = parseInt(timeframe);

    // Hitung komponen ROI
    const total_revenue = monthlyRev * timeFrame;
    const total_operating_cost = monthlyCost * timeFrame;
    const net_profit = total_revenue - total_operating_cost;
    const roi_percentage = (net_profit / initInvest) * 100;

    // Perbaiki perhitungan payback period
    const monthly_net_profit = monthlyRev - monthlyCost;
    const payback_period_years =
      monthly_net_profit > 0 ? initInvest / (monthly_net_profit * 12) : 0;

    console.log("Calculation results:", {
      total_revenue,
      total_operating_cost,
      net_profit,
      roi_percentage,
      payback_period_years,
    });

    // **PERBAIKAN: Handle business strategy data dengan benar**
    let fundingOptionValue = null;
    let businessModelValue = null;

    if (business_strategy) {
      // Jika berupa object, ambil label-nya, jika string langsung pakai
      fundingOptionValue =
        typeof business_strategy.funding_option === "object"
          ? business_strategy.funding_option.label
          : business_strategy.funding_option;

      businessModelValue =
        typeof business_strategy.business_model === "object"
          ? business_strategy.business_model.label
          : business_strategy.business_model;
    }

    console.log("Processed business strategy:", {
      funding_option: fundingOptionValue,
      business_model: businessModelValue,
    });

    // Simpan data Financial Details (sesuai schema)
    const newFinancial = await prisma.financialDetails.create({
      data: {
        initial_investment: initInvest,
        expected_monthly_revenue: monthlyRev,
        monthly_operating_cost: monthlyCost,
        timeframe: timeFrame,
      },
    });

    // Simpan Business Strategy (sesuai schema)
    const newStrategy = await prisma.businessStrategy.create({
      data: {
        strategy_name: "Custom Strategy",
        funding_option: fundingOptionValue,
        business_model: businessModelValue,
      },
    });

    // **PERBAIKAN: Validasi dan hubungkan Equipments**
    if (equipments && Array.isArray(equipments) && equipments.length > 0) {
      // Pastikan equipment IDs valid
      const validEquipmentIds = equipments.filter(
        (id) => Number.isInteger(id) && id > 0
      );

      if (validEquipmentIds.length > 0) {
        for (const equipmentId of validEquipmentIds) {
          await prisma.businessStrategyEquipment.create({
            data: {
              businessStrategyId: newStrategy.id,
              equipmentId: equipmentId,
            },
          });
        }
        console.log(
          `Connected ${validEquipmentIds.length} equipments to strategy`
        );
      }
    }

    // Simpan hasil perhitungan ROI (sesuai schema - perhatikan tipe data)
    const newResult = await prisma.rOIResult.create({
      data: {
        roi_percentage: parseFloat(roi_percentage.toFixed(2)),
        net_profit: parseInt(net_profit),
        payback_period_years: parseFloat(payback_period_years.toFixed(2)),
        total_revenue: parseInt(total_revenue),
        total_operating_cost: parseInt(total_operating_cost),
        financialDetailsId: newFinancial.id,
        businessStrategyId: newStrategy.id,
      },
    });

    // **PERBAIKAN: Ambil data lengkap dengan relations untuk response**
    const resultWithRelations = await prisma.rOIResult.findUnique({
      where: { id: newResult.id },
      include: {
        financialDetails: true,
        businessStrategy: {
          include: {
            equipments: {
              include: {
                equipment: true,
              },
            },
          },
        },
      },
    });

    console.log("Final result with relations:", resultWithRelations);

    // Return hasilnya
    res.status(201).json({
      message: "Perhitungan ROI berhasil!",
      data: resultWithRelations,
    });
  } catch (error) {
    console.error("Error calculating ROI: ", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menghitung ROI",
      error: error.message,
    });
  }
};
