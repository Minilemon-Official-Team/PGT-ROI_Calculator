import ItemPill from "../../../shared/components/ui/ItemPill";
import DetailItem from "./DetailItem";
import { Calendar, DollarSign, Building } from "lucide-react";

function InvestmentDetailsCard({
  business_model,
  funding_option,
  timeframe,
  selected_equipment = [],
}) {
  // **DEBUG: Cek data yang diterima**
  console.log(
    "InvestmentDetailsCard - selected_equipment:",
    selected_equipment
  );
  console.log("InvestmentDetailsCard - business_model:", business_model);
  console.log("InvestmentDetailsCard - funding_option:", funding_option);
  console.log("InvestmentDetailsCard - timeframe:", timeframe);

  return (
    <section className="mt-4 border border-gray-300 rounded-2xl p-8">
      <header>Rincian Investasi</header>
      <div className="grid md:grid-cols-3 mt-4 gap-4">
        <DetailItem
          title={"Model Bisnis"}
          value={business_model}
          icon={<Building />}
        />
        <DetailItem
          title={"Pendanaan"}
          value={funding_option}
          icon={<DollarSign />}
        />
        <DetailItem
          title={"Jangka waktu"}
          value={timeframe}
          icon={<Calendar />}
        />
      </div>
      <div className="mt-8">
        <span>Peralatan Terpilih:</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {selected_equipment && selected_equipment.length > 0 ? (
            selected_equipment.map((equipment, index) => (
              <ItemPill key={index} value={equipment} />
            ))
          ) : (
            <ItemPill value={"Tidak ada peralatan dipilih"} />
          )}
        </div>
      </div>
    </section>
  );
}

export default InvestmentDetailsCard;
