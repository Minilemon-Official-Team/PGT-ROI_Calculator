import DropDown from "./DropDown";
import InputNumber from "./InputNumberGroup";
import CheckBox from "./CheckBox";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Building, DollarSign, TrendingUp } from "lucide-react";

import {
  DATA_EQUIPMENT,
  DATA_FINANCIAL,
  DATA_FUNDING,
  DATA_BM,
} from "../constants/";
import { NavStateContext } from "../../../shared/contexts";
import { useNavigate } from "react-router-dom";

function FormCalculator({ totalProgress }) {
  const navState = useContext(NavStateContext);
  const navigate = useNavigate("");

  const [form, setForm] = useState({
    equipment: [],
    initial_investment: 50000,
    monthly_revenue: 8000,
    operating_costs: 3000,
    funding: null,
    business_model: null,
    time_frame: 24,
  });

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateProgress = (form) => {
    let count = 0;

    if (Array.isArray(form.equipment) && form.equipment.length > 0) count += 1;
    if (
      typeof form.initial_investment === "number" &&
      form.initial_investment > 0
    )
      count += 1;
    if (typeof form.monthly_revenue === "number" && form.monthly_revenue > 0)
      count += 1;
    if (typeof form.operating_costs === "number" && form.operating_costs > 0)
      count += 1;
    if (typeof form.funding == "object" && form.funding !== null) count += 1;
    if (typeof form.business_model == "object" && form.business_model !== null)
      count += 1;

    setProgress(count);
  };

  const handleCheckboxToggle = (e) => {
    const { checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      equipment: checked
        ? [...prev.equipment, value]
        : prev.equipment.filter((v) => v !== value),
    }));
  };

  useEffect(() => {
    updateProgress(form);
  }, [form]);

  useEffect(() => {
    totalProgress(progress);
  }, [progress, totalProgress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (progress !== 6) {
      alert("Lengkapi semua kolom sebelum menghitung ROI!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        financial_details: {
          initial_investment: form.initial_investment,
          expected_monthly_revenue: form.monthly_revenue,
          monthly_operating_cost: form.operating_costs,
          timeframe: form.time_frame,
        },
        business_strategy: {
          funding_option: form.funding?.label || form.funding,
          business_model: form.business_model?.label || form.business_model,
        },
        // mapping ID equipment (sementara urutan 1,2,3,...)
        equipments: form.equipment.map((_, idx) => idx + 1),
      };

      const response = await axios.post(
        "http://localhost:3000/api/calculate-roi",
        payload
      );

      if (response.status === 201) {
        console.log("ROI Calculation Result:", response.data);

        // Simpan ke context biar halaman hasil bisa akses
        navState.setRoiResult(response.data.data);
        navState.setFormCalculated(true);

        navigate("/hasil");
      }
    } catch (error) {
      console.error("Error calculating ROI:", error);
      alert("Terjadi kesalahan saat menghitung ROI. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-auto">
      <form
        className="w-sm md:w-4xl mt-4 flex flex-col"
        onSubmit={handleSubmit}
      >
        {/* Equipment Section */}
        <section className="mb-4 px-8 py-4 rounded-2xl border border-gray-300 shadow">
          <div className="flex flex-row gap-2">
            <Building />
            <h2 className="font-semibold">Peralatan</h2>
          </div>
          <p className="mt-4">Pilih Jenis Peralatan</p>
          <div className="flex flex-col">
            {DATA_EQUIPMENT.map((item, index) => (
              <CheckBox
                key={index}
                value={item}
                onChange={handleCheckboxToggle}
              />
            ))}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {form.equipment?.map((item, index) => (
                <span
                  key={index}
                  className="flex justify-center items-center text-center bg-gray-200 rounded me-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Details Section */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="px-8 py-8 rounded-2xl border border-gray-300 shadow">
            <div className="flex flex-row gap-2">
              <DollarSign />
              <h2 className="font-semibold">Rincian Keuangan</h2>
            </div>
            <div className="mt-4">
              {DATA_FINANCIAL.map((item, index) => (
                <InputNumber
                  title={item.title}
                  name={item.id}
                  value={form[item.id]}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [item.id]: Number(e.target.value),
                    }))
                  }
                  key={index}
                />
              ))}
              <label htmlFor="" className="block font-semibold mt-4">
                Jangka Waktu (Bulan): {form.time_frame}
              </label>
              <div className="relative w-full h-4 bg-gray-200 rounded-full">
                <div
                  className="absolute h-4 bg-black rounded-full"
                  style={{
                    width: `${((form.time_frame - 6) / (60 - 6)) * 100}%`,
                  }}
                ></div>
                <input
                  type="range"
                  min={6}
                  max={60}
                  step={6}
                  value={form.time_frame}
                  className="accent-white absolute left-0 w-full h-4 appearance-none bg-transparent cursor-pointer"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      time_frame: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Business Strategy Section */}
          <div className="px-8 py-4 rounded-2xl border border-gray-300 shadow">
            <div className="flex flex-row gap-2">
              <TrendingUp />
              <h2 className="font-semibold">Strategi Bisnis</h2>
            </div>
            <DropDown
              data={DATA_FUNDING}
              title={"Pilihan Pendanaan"}
              value={form.funding}
              onChange={(e) => setForm((prev) => ({ ...prev, funding: e }))}
              name={"funding-options"}
              placeholder={"Select funding source"}
            />
            <DropDown
              data={DATA_BM}
              title={"Model Bisnis"}
              value={form.business_model}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, business_model: e }))
              }
              name={"business-model"}
              placeholder={"Pilih model bisnis"}
            />
          </div>
        </section>

        {/* Submit Section */}
        <section className="px-8 py-8 mt-4 border border-gray-300 shadow rounded">
          <button
            disabled={progress !== 6 || loading}
            className={[
              "w-full py-3 text-white rounded transition-colors",
              progress === 6
                ? "bg-black hover:bg-black/50 cursor-pointer"
                : "bg-gray-500 text-white/70",
            ].join(" ")}
          >
            {loading ? "Menghitung..." : "Hitung ROI"}
          </button>
          {progress !== 6 && (
            <p className="text-center text-black/60 mt-4">
              Lengkapi beberapa kolom lagi untuk menghitung ROI.
            </p>
          )}
        </section>
      </form>
    </div>
  );
}

export default FormCalculator;
