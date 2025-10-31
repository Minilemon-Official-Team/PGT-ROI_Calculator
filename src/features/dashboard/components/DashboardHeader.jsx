import PeriodDropDown from "./PeriodDropDown";
import { useState } from "react";
import { Download } from "lucide-react";
function DashboardHeader() {
    const periodOptions = [6, 12, 24, 36]

    const [period, setPeriod] = useState(6);
    return (
        <section className="flex flex-col md:flex-row mt-8 justify-between border border-gray-300 p-8 rounded-2xl">
            <header>
                <h2 className="font-bold">ROI Analytics Dashboard</h2>
                <p>Comprehensive analysis of your investment performance</p>
            </header>
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                <PeriodDropDown
                    data={periodOptions}
                    name={"period-options"}
                    value={`${period} months`}
                    onChange={(e) => setPeriod(e)}
                />
                <button className="flex flex-row gap-2 items-center px-4 py-2 w-fit border rounded-xl">
                    <Download size={20} />
                    <span>Export</span>
                </button>
            </div>
        </section>
    )
}

export default DashboardHeader;