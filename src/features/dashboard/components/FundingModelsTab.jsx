import FundingDistributionChart from "./FundingDistributionChart";
import BusinessPerformanceCard from "./BusinessPerformanceCard";

import { businessModelPerformance } from "../constants/data";

function FundingModelsTab() {
  return (
    <div className="flex flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col border border-gray-300 rounded-2xl p-8 h-[560px] overflow-visible">
          <h2 className="font-semibold">Funding Sources Distribution</h2>
          <div className="h-[400px] w-full">
            <FundingDistributionChart />
          </div>
        </div>
        <div className="border border-gray-300 rounded-2xl p-8 h-[560px]">
          <h2>Business Model Performance</h2>
          {businessModelPerformance.map((item, index) => (
            <BusinessPerformanceCard
              key={index}
              model={item.model}
              risk={item.risk}
              roi={item.ROI}
              isChosen={item.isChosen}
            />
          ))}
        </div>
      </section>
      <section className="border border-gray-300 rounded-2xl p-8 mt-8">
        <h2>Your Funding Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Selected Funding: Self-Funded</h3>
            <span className="text-gray-600">Initial Investment: Rp50,000</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Business Model: B2C Direct Sales</h3>
            <span className="text-gray-600">Expected ROI: 140.0%</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FundingModelsTab;
