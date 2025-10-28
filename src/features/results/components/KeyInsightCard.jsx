function KeyInsightCard() {

    const dataKeyInsights = [
        {
            title: "Profitability Timeline",
            subTitle: "Your investment will break even in 0.8 years, generating $60,000 annually thereafter.",
            color: {
                background_color: "#E8FFF1",
                text_color: "#1E824C"
            }
        },
        {
            title: "Risk Assessment",
            subTitle: "Low risk investment with quick capital recovery.",
            color: {
                background_color: "#FFF4E8",
                text_color: "#B04A00"
            }
        },
        {
            title: "Market Position",
            subTitle: "Your B2B Manufacturing in shows goodpotential with a 140.0% ROI.",
            color: {
                background_color: "#EEF3FF",
                text_color: "#2E46BF"
            }
        }
    ]
    const keyInsights = dataKeyInsights.slice(0, 2);
    const lastKeyInsights = dataKeyInsights.slice(-1)[0];
    return (
        <>
            <div className='grid md:grid-cols-2 gap-4'>
                {keyInsights.map((item, index) =>
                    <div key={index} className='p-4 rounded-2xl mt-4' style={{ background: `${item.color.background_color}` }}>
                        <h3 className='font-semibold' style={{ color: `${item.color.text_color}` }}>{item.title}</h3>
                        <p style={{ color: `${item.color.text_color}` }}>{item.subTitle}</p>
                    </div>
                )}
            </div>
            <div className='p-4 rounded-2xl mt-4' style={{ background: `${lastKeyInsights.color.background_color}` }}>
                <h3 className='font-semibold' style={{ color: `${lastKeyInsights.color.text_color}` }}>{lastKeyInsights.title}</h3>
                <p style={{ color: `${lastKeyInsights.color.text_color}` }}>{lastKeyInsights.subTitle}</p>
            </div>
        </>
    )
}

export default KeyInsightCard;