function KeyInsightCard({ roiData }) {
  // Destructure data yang dibutuhkan
  const {
    roi_percentage = 0,
    net_profit = 0,
    payback_period_years = 0,
    businessStrategy,
    financialDetails,
  } = roiData || {};

  const businessModel = businessStrategy?.business_model || "Bisnis";
  const timeframe = financialDetails?.timeframe || 24;

  // Function untuk generate insights berdasarkan data
  const generateKeyInsights = () => {
    const insights = [];

    // Insight 1: Profitability Timeline
    if (net_profit > 0 && payback_period_years > 0) {
      const annualProfit = net_profit / (timeframe / 12);
      insights.push({
        title: "Profitability Timeline",
        subTitle: `Your investment will break even ${payback_period_years.toFixed(
          1
        )} tahun, menghasilkan ${formatRupiah(
          annualProfit
        )} per tahun setelahnya.`,
        color: {
          background_color: "#E8FFF1",
          text_color: "#1E824C",
        },
      });
    } else {
      insights.push({
        title: "Profitability Timeline",
        subTitle:
          "Investasi Anda membutuhkan evaluasi lebih lanjut karena belum mencapai titik impas dalam periode yang direncanakan.",
        color: {
          background_color: "#FFF4E8",
          text_color: "#B04A00",
        },
      });
    }

    // Insight 2: Risk Assessment
    if (roi_percentage > 100) {
      insights.push({
        title: "Risk Assessment",
        subTitle:
          "Investasi berisiko rendah dengan pengembalian modal yang cepat dan ROI yang tinggi.",
        color: {
          background_color: "#E8FFF1",
          text_color: "#1E824C",
        },
      });
    } else if (roi_percentage > 50) {
      insights.push({
        title: "Risk Assessment",
        subTitle:
          "Investasi dengan risiko moderat dan potensi pengembalian yang baik.",
        color: {
          background_color: "#FFF4E8",
          text_color: "#B04A00",
        },
      });
    } else if (roi_percentage > 0) {
      insights.push({
        title: "Risk Assessment",
        subTitle:
          "Investasi berisiko tinggi dengan pengembalian yang terbatas, perlu evaluasi menyeluruh.",
        color: {
          background_color: "#FFE8E8",
          text_color: "#BF2E2E",
        },
      });
    } else {
      insights.push({
        title: "Risk Assessment",
        subTitle:
          "Investasi berisiko sangat tinggi dengan potensi kerugian, tidak disarankan.",
        color: {
          background_color: "#FFE8E8",
          text_color: "#BF2E2E",
        },
      });
    }

    // Insight 3: Market Position
    if (roi_percentage > 100) {
      insights.push({
        title: "Market Position",
        subTitle: `Model ${businessModel} menunjukkan potensi sangat baik dengan ROI ${roi_percentage.toFixed(
          1
        )}%.`,
        color: {
          background_color: "#EEF3FF",
          text_color: "#2E46BF",
        },
      });
    } else if (roi_percentage > 50) {
      insights.push({
        title: "Market Position",
        subTitle: `Model ${businessModel} memiliki prospek pasar yang baik dengan ROI ${roi_percentage.toFixed(
          1
        )}%.`,
        color: {
          background_color: "#EEF3FF",
          text_color: "#2E46BF",
        },
      });
    } else {
      insights.push({
        title: "Market Position",
        subTitle: `Model ${businessModel} membutuhkan strategi pemasaran yang lebih agresif untuk meningkatkan ROI.`,
        color: {
          background_color: "#FFF4E8",
          text_color: "#B04A00",
        },
      });
    }

    return insights;
  };

  // Helper function untuk format Rupiah
  const formatRupiah = (num) => {
    if (!num && num !== 0) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const dataKeyInsights = generateKeyInsights();
  const keyInsights = dataKeyInsights.slice(0, 2);
  const lastKeyInsights = dataKeyInsights.slice(-1)[0];

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {keyInsights.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl mt-4"
            style={{ background: `${item.color.background_color}` }}
          >
            <h3
              className="font-semibold"
              style={{ color: `${item.color.text_color}` }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm"
              style={{ color: `${item.color.text_color}` }}
            >
              {item.subTitle}
            </p>
          </div>
        ))}
      </div>
      <div
        className="p-4 rounded-2xl mt-4"
        style={{ background: `${lastKeyInsights.color.background_color}` }}
      >
        <h3
          className="font-semibold"
          style={{ color: `${lastKeyInsights.color.text_color}` }}
        >
          {lastKeyInsights.title}
        </h3>
        <p
          className="text-sm"
          style={{ color: `${lastKeyInsights.color.text_color}` }}
        >
          {lastKeyInsights.subTitle}
        </p>
      </div>
    </>
  );
}

export default KeyInsightCard;
