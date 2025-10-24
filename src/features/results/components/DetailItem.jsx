function DetailItem({ title, value, icon }) {
    return (
        <div className='flex flex-col mt-4'>
            <span className='flex flex-row gap-2'>{icon} {title}</span>
            <p
                className='px-4 bg-white border border-gray-300 w-fit mt-4 rounded-2xl'
            >{value}</p>
        </div>
    )
}

export default DetailItem;