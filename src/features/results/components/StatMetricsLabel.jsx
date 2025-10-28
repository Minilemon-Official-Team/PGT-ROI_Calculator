function StatMetricsLabel({ title, subTitle, value, pill, icon, colorText }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="text-black/60 flex flex-row gap-2">
                {icon} <span>{title}</span>
            </h3>
            <span className="text-4xl font-semibold" style={{ color: `${colorText}` }}>{value}</span>
            <span className={`${pill ? 'bg-gray-200 font-semibold' : ''} px-4 py-1 rounded-full text-sm text-center`}>{subTitle}</span>
        </div>
    )
}

export default StatMetricsLabel;