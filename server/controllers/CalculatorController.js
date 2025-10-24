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

    // Ambil data keuangan
    const {
      initial_investment,
      expected_monthly_revenue,
      monthly_operating_cost,
      timeframe,
    } = financial_details;

    // Hitung komponen ROI
    const total_revenue = expected_monthly_revenue * timeframe;
    const total_operating_cost = monthly_operating_cost * timeframe;
    const net_profit = total_revenue - total_operating_cost;
    const roi_percentage = (net_profit / initial_investment) * 100;
    const payback_period_years =
      (initial_investment / net_profit) * (timeframe / 12);

    // Simpan data Financial Details
    const newFinancial = await prisma.financialDetails.create({
      data: {
        initial_investment,
        expected_monthly_revenue,
        monthly_operating_cost,
        timeframe,
      },
    });

    // Simpan Business Strategy
    const newStrategy = await prisma.businessStrategy.create({
      data: {
        strategy_name: "Custom Strategy",
        funding_option: business_strategy?.funding_option || null,
        business_model: business_strategy?.business_model || null,
      },
    });

    // Hubungkan Equipments ke strategy (kalau ada)
    if (equipments && equipments.length > 0) {
      for (const equipmentId of equipments) {
        await prisma.businessStrategyEquipment.create({
          data: {
            businessStrategyId: newStrategy.id,
            equipmentId,
          },
        });
      }
    }

    // Simpan hasil perhitungan ROI
    const newResult = await prisma.rOIResult.create({
      data: {
        roi_percentage,
        net_profit,
        payback_period_years,
        total_revenue,
        total_operating_cost,
        financialDetailsId: newFinancial.id,
        businessStrategyId: newStrategy.id,
      },
    });

    // Return hasilnya
    res.status(201).json({
      message: "Perhitungan ROI berhasil!",
      data: {
        id: newResult.id,
        roi_percentage,
        net_profit,
        total_revenue,
        total_operating_cost,
        payback_period_years,
        currency: "IDR",
      },
    });
  } catch (error) {
    console.error("Error calculating ROI: ", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menghitung ROI" });
  }
};
