import { useState } from "react";
import PerformanceTab from "./PerformanceTab";

function TabNavigations() {
    const [isActive, setIsActive] = useState('performance');

    const renderTab = () => {
        switch (isActive) {
            case "performance":
                return <PerformanceTab />;
            case "funding-models":
                return <h1>funding models</h1>;
            case "projections":
                return <h1>projections</h1>;
            default:
                return <h1>performance</h1>
        }
    }

    return (
        <>
            <nav className="mt-8">
                <ul className="h-8 px-1 py-1 grid grid-cols-3 gap-4 bg-gray-300 rounded-2xl">
                    <li
                        onClick={() => setIsActive("performance")}
                        className={[
                            isActive === "performance" ? "bg-white rounded-xl font-bold" : "",
                            "h-full flex items-center justify-center text-sm"
                        ].join(" ")}
                    >Performance
                    </li>
                    <li
                        onClick={() => setIsActive("funding-models")}
                        className={[
                            isActive === "funding-models" ? "bg-white rounded-xl font-bold" : "",
                            "h-full flex items-center justify-center text-sm"
                        ].join(" ")}
                    >Funding & Models
                    </li>
                    <li
                        onClick={() => setIsActive("projections")}
                        className={[
                            isActive === "projections" ? "bg-white rounded-xl font-bold" : "",
                            "h-full flex items-center justify-center text-sm"
                        ].join(" ")}
                    >Projections
                    </li>
                </ul>
            </nav>
            <div className="mt-8">
                {renderTab()}
            </div>
        </>
    )
}

export default TabNavigations;