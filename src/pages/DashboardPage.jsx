import DashboardMetrics from "../features/dashboard/components/DashboardMetrics";
import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import TabNavigations from "../features/dashboard/components/TabNavigations";
import { Target, DollarSign, Calendar } from "lucide-react";

import { useContext } from 'react';
import { NavStateContext } from '../shared/contexts';
import { Navigate } from "react-router-dom";

import { useDashboardData } from "../shared/contexts/useDashboardData";

function DashboardPage() {

    const navState = useContext(NavStateContext);

    const { metrics, formatRupiah } = useDashboardData();

    if (!navState.formCalculated) {
        return <Navigate to={"/kalkulator"} replace />
    }

    return (
        <>
            <section className="flex flex-col w-sm md:w-6xl m-auto py-8">
                <section className="grid md:grid-cols-3 gap-4">
                    <DashboardMetrics
                        icon={<Target color="green" />}
                        title={"ROI"}
                        value={`${metrics.roi}%`}
                        color="#1E824C"
                    />
                    <DashboardMetrics
                        icon={<DollarSign color="#2E46BF" />}
                        title={"Net Profit"}
                        value={`${formatRupiah(metrics.netProfit)}`}
                        color="#2E46BF"
                    />
                    <DashboardMetrics
                        icon={<Calendar color="#B04A00" />}
                        title={"Payback Period"}
                        value={`${metrics.paybackPeriod} years`}
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