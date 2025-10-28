import KeyValueLabel from '../../../shared/components/ui/KeyValueLabel';
function FinancialSummaryCard() {
    return (
        <div className='border border-gray-300 p-8 rounded-2xl mt-4'>
            <header>Ringkasan Keuangan</header>
            <KeyValueLabel
                title={"Investasi Awal"}
                value={"Rp50.000"}
                colorText={"#120A0A"}
                isHeader={false}
            />
            <KeyValueLabel
                title={"Pendapatan Total (24 Bulan)"}
                value={"Rp192.000"}
                colorText={"#00A63E"}
                isHeader={false}
            />
            <KeyValueLabel
                title={"Biaya Operasional Total"}
                value={"Rp72.000"}
                colorText={"#F54900"}
                isHeader={false}
            />
            <hr className='text-gray-400 mt-4' />
            <KeyValueLabel
                title={"Net Profit"}
                value={"Rp70.000"}
                colorText={"#155DFC"}
                isHeader={true}
            />
        </div>
    )
}

export default FinancialSummaryCard;