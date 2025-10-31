import ItemPill from '../../../shared/components/ui/ItemPill';
import DetailItem from './DetailItem';

import { Calendar, DollarSign, Building } from 'lucide-react';
function InvestmentDetailsCard() {
    return (
        <>
            <section className='mt-4 border border-gray-300 rounded-2xl p-8'>
                <header>Rincian Investasi</header>
                <div className='grid md:grid-cols-4 mt-4'>
                    <DetailItem
                        title={"Model Bisnis"}
                        value={"B2B Manufacturing"}
                        icon={<Building />}
                    />
                    <DetailItem
                        title={"Pendanaan"}
                        value={"Self-Funded"}
                        icon={<DollarSign />}
                    />
                    <DetailItem
                        title={"Jangka waktu"}
                        value={"24 months"}
                        icon={<Calendar />}
                    />
                </div>
                <div className='mt-8'>
                    <span>Peralatan Terpilih:</span>
                    <div className='grid grid-cols-2 md:grid-cols-4'>
                        <ItemPill
                            value={"Industrial Printers"}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default InvestmentDetailsCard;