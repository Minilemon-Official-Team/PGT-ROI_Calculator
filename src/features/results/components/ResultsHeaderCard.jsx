import { CircleCheckBig, TrendingUp, DollarSign, Calendar } from "lucide-react";
import StatMetricsLabel from "./StatMetricsLabel";

function ResultsHeaderCard({
  roi_percentage,
  net_profit,
  payback_period_years,
}) {
  // Function untuk menentukan status ROI
  const getRoiStatus = (percentage) => {
    if (percentage >= 100) return { status: "Excellent", color: "green" };
    if (percentage >= 50) return { status: "Good", color: "blue" };
    if (percentage >= 0) return { status: "Fair", color: "orange" };
    return { status: "Poor", color: "red" };
  };

  const roiStatus = getRoiStatus(roi_percentage);

  return (
    <section className="border border-gray-300 p-8 rounded-2xl">
      <header>
        <h2 className="font-bold flex flex-row gap-2 justify-center md:justify-start">
          <TrendingUp />
          <span>Hasil Perhitungan ROI</span>
        </h2>
        <p className="text-black/60 mt-2 text-center md:text-start">
          Berdasarkan masukan Anda
        </p>
      </header>
      <div className="grid md:grid-cols-3 gap-8 md:gap-0 mt-8">
        <StatMetricsLabel
          title={"Return on Investment"}
          subTitle={roiStatus.status}
          value={`${roi_percentage?.toFixed(1) || 0}%`}
          pill={true}
          icon={<CircleCheckBig color={roiStatus.color} />}
          colorText={"#155DFC"}
        />
        <StatMetricsLabel
          title={"Net Profit"}
          subTitle={"Total keuntungan bersih"}
          value={net_profit}
          pill={false}
          icon={<DollarSign color="blue" />}
          colorText={"#155DFC"}
        />
        <StatMetricsLabel
          title={"Payback Period"}
          subTitle={"Waktu yang dibutuhkan untuk mencapai titik impas"}
          value={`${payback_period_years}`}
          pill={false}
          icon={<Calendar color="#F54900" />}
          colorText={"#F54900"}
        />
      </div>
    </section>
  );
}

export default ResultsHeaderCard;
