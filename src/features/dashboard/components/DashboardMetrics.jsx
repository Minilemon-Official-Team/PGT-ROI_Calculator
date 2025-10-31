function DashboardMetrics({ icon, title, value, color }) {
    return (
        <div className="flex flex-row gap-4 border border-gray-300 p-8 rounded-2xl">
            {icon}
            <div className="flex flex-col">
                <p>{title}</p>
                <span className="font-semibold text-2xl" style={{ color: `${color}` }}>{value}</span>
            </div>
        </div>
    )
}

export default DashboardMetrics;