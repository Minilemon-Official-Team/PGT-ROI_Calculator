import { CircleCheckBig, TrendingUp, DollarSign, Calendar } from "lucide-react";
import StatMetricsLabel from "./StatMetricsLabel";

function ResultHeaderCard() {
    return (
        <>
            <section className="border border-gray-300 p-8 rounded-2xl">
                <header>
                    <h2 className="font-bold flex flex-row gap-2">
                        <TrendingUp />
                        <span>ROI Calculation Results</span>
                    </h2>
                    <p className="text-black/60 mt-2">Based on your inputs for - B2B Manufacturing</p>
                </header>
                <div className="grid md:grid-cols-3 gap-8 md:gap-0 mt-8">
                    <StatMetricsLabel
                        title={"Return on Investment"}
                        subTitle={"Good"}
                        value={`140.0%`}
                        pill={true}
                        icon={<CircleCheckBig color="green" />}
                        colorText={'#155DFC'}
                    />
                    <StatMetricsLabel
                        title={"Net Profit"}
                        subTitle={"Over 24 months"}
                        value={`$70,000`}
                        pill={false}
                        icon={<DollarSign color="blue" />}
                        colorText={'#155DFC'}
                    />
                    <StatMetricsLabel
                        title={"Payback Period"}
                        subTitle={"Years to break even"}
                        value={`0.8`}
                        pill={false}
                        icon={<Calendar color="#F54900" />}
                        colorText={'#F54900'}
                    />
                </div>
            </section>
        </>
    )
}

export default ResultHeaderCard;