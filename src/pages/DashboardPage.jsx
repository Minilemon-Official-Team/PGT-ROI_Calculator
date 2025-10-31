import DashboardMetrics from "../features/dashboard/components/DashboardMetrics";
import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import TabNavigations from "../features/dashboard/components/TabNavigations";
import { Target, DollarSign, Calendar } from "lucide-react";

function DashboardPage() {
    return (
        <>
            <section className="flex flex-col w-sm md:w-6xl m-auto py-8">
                <section className="grid md:grid-cols-3 gap-4">
                    <DashboardMetrics
                        icon={<Target color="green" />}
                        title={"ROI"}
                        value={"140.0%"}
                        color="#1E824C"
                    />
                    <DashboardMetrics
                        icon={<DollarSign color="#2E46BF" />}
                        title={"Net Profit"}
                        value={"Rp70.000"}
                        color="#2E46BF"
                    />
                    <DashboardMetrics
                        icon={<Calendar color="#B04A00" />}
                        title={"Payback Period"}
                        value={"0.8 years"}
                        color="#B04A00"
                    />
                </section>
                <DashboardHeader />
                <TabNavigations />
            </section>
        </>
    )
}

export default DashboardPage;