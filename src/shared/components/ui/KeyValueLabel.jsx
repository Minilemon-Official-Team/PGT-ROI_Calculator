function KeyValueLabel({ title, value, colorText, isHeader }) {
    return (
        <div className='flex flex-row justify-between mt-4'>
            <span className={isHeader ? 'font-semibold' : ''}>{title}</span>
            <span
                className={`font-bold`}
                style={{ color: `${colorText}` }}
            >{value}</span>
        </div>
    )
}

export default KeyValueLabel;