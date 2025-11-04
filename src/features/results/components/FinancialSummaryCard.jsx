import KeyValueLabel from "../../../shared/components/ui/KeyValueLabel";

function FinancialSummaryCard({
  initial_investment,
  total_revenue,
  total_operating_cost,
  net_profit,
}) {
  return (
    <div className="border border-gray-300 p-8 rounded-2xl mt-4">
      <header>Ringkasan Keuangan</header>
      <KeyValueLabel
        title={"Investasi Awal"}
        value={initial_investment}
        colorText={"#120A0A"}
        isHeader={false}
      />
      <KeyValueLabel
        title={"Pendapatan Total"}
        value={total_revenue}
        colorText={"#00A63E"}
        isHeader={false}
      />
      <KeyValueLabel
        title={"Biaya Operasional Total"}
        value={total_operating_cost}
        colorText={"#F54900"}
        isHeader={false}
      />
      <hr className="text-gray-400 mt-4" />
      <KeyValueLabel
        title={"Net Profit"}
        value={net_profit}
        colorText={"#155DFC"}
        isHeader={true}
      />
    </div>
  );
}

export default FinancialSummaryCard;
