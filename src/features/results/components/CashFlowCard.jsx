import KeyValueLabel from '../../../shared/components/ui/KeyValueLabel';
import ProgressBar from '../../../shared/components/ui/ProgressBar';
function CashFlowCard() {
    // monthly profit / monthly revenue * 100
    const percentageProgress = Math.round((5000000 / 8000000) * 100)
    return (
        <div className='border border-gray-300 p-8 rounded-2xl mt-4'>
            <header>Monthly Cash Flow</header>
            <KeyValueLabel
                title={"Monthly Revenue"}
                value={"Rp8.000"}
                colorText={"#00A63E"}
                isHeader={false}
            />
            <KeyValueLabel
                title={"Monthly Operating Costs"}
                value={"Rp3.000"}
                colorText={"#F54900"}
                isHeader={false}
            />
            <hr className='text-gray-400 mt-4' />
            <KeyValueLabel
                title={"Monthly Profit"}
                value={"Rp5.000"}
                colorText={"#155DFC"}
                isHeader={true}
            />
            <ProgressBar title={"Profit Margin"} percentageProgress={percentageProgress} />
        </div>
    )
}

export default CashFlowCard;