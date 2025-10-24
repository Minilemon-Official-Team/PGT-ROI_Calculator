import DetailItem from './DetailItem';

import { Calendar, DollarSign, Building } from 'lucide-react';
function InvestmentDetailsCard() {
    return (
        <>
            <section className='mt-4 border border-gray-300 rounded-2xl p-8'>
                <header>Investment Details</header>
                <div className='grid md:grid-cols-4 mt-4'>
                    <DetailItem
                        title={"Business Model"}
                        value={"B2B Manufacturing"}
                        icon={<Building />}
                    />
                    <DetailItem
                        title={"Funding"}
                        value={"Self-Funded"}
                        icon={<DollarSign />}
                    />
                    <DetailItem
                        title={"Timeframe"}
                        value={"24 months"}
                        icon={<Calendar />}
                    />
                </div>
                <div className='mt-8'>
                    <span>Selected Equipment:</span>
                    <div className='grid grid-cols-2 md:grid-cols-4'>
                        <p
                            className='px-2 md:px-4 bg-gray-200 border border-white w-fit mt-4 rounded-2xl'
                        >Industrial Printers</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InvestmentDetailsCard;