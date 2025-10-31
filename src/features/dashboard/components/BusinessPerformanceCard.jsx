function BusinessPerformanceCard({ model, risk, roi, isChosen }) {
    return (
        <div className="flex flex-col border border-gray-300 rounded-xl p-4 mt-4">
            <header className="flex flex-row justify-between">
                <span className="font-bold">{model}</span>
                <span className="flex items-center px-2 bg-black text-center text-white text-sm rounded-sm">{roi} ROI</span>
            </header>
            <div className="flex flex-row justify-between mt-4">
                <span className="text-gray-600">Risk Level: {risk}</span>
                <span>{isChosen ? "Your Choice" : ""}</span>
            </div>
        </div>
    )
}

export default BusinessPerformanceCard;