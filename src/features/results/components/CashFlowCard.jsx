import KeyValueLabel from "../../../shared/components/ui/KeyValueLabel";
import ProgressBar from "../../../shared/components/ui/ProgressBar";

function CashFlowCard({
  monthly_revenue,
  monthly_operating_cost,
  monthly_profit,
  profit_margin,
}) {
  const percentageProgress = Math.round(profit_margin);

  return (
    <div className="border border-gray-300 p-8 rounded-2xl mt-4">
      <header>Arus Kas Bulanan</header>
      <KeyValueLabel
        title={"Pendapatan Bulanan"}
        value={monthly_revenue}
        colorText={"#00A63E"}
        isHeader={false}
      />
      <KeyValueLabel
        title={"Biaya Operasional Bulanan"}
        value={monthly_operating_cost}
        colorText={"#F54900"}
        isHeader={false}
      />
      <hr className="text-gray-400 mt-4" />
      <KeyValueLabel
        title={"Laba Bulanan"}
        value={monthly_profit}
        colorText={"#155DFC"}
        isHeader={true}
      />
      <ProgressBar
        title={"Profit Margin"}
        percentageProgress={percentageProgress}
      />
    </div>
  );
}

export default CashFlowCard;
