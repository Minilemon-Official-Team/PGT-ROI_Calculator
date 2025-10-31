import { CircleCheckBig, TrendingUp, DollarSign, Calendar } from "lucide-react";
import StatMetricsLabel from "./StatMetricsLabel";

function ResultHeaderCard() {
    return (
        <>
            <section className="border border-gray-300 p-8 rounded-2xl">
                <header>
                    <h2 className="font-bold flex flex-row gap-2 justify-center md:justify-start">
                        <TrendingUp />
                        <span>Hasil Perhitungan ROI</span>
                    </h2>
                    <p className="text-black/60 mt-2 text-center md:text-start">Berdasarkan masukan Anda untuk - B2B Manufacturing</p>
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
                        subTitle={"Lebih dari 24 bulan"}
                        value={`$70,000`}
                        pill={false}
                        icon={<DollarSign color="blue" />}
                        colorText={'#155DFC'}
                    />
                    <StatMetricsLabel
                        title={"Payback Period"}
                        subTitle={"Waktu yang dibutuhkan untuk mencapai titik impas"}
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