import ResultsHeaderCard from '../features/results/components/ResultsHeaderCard';
import FinancialSummaryCard from '../features/results/components/FinancialSummaryCard';
import CashFlowCard from '../features/results/components/CashFlowCard';
import InvestmentDetailsCard from '../features/results/components/InvestmentDetailsCard';
import KeyInsightCard from '../features/results/components/KeyInsightCard';
import { TrendingUp } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

import { useContext } from 'react';
import { NavStateContext } from '../shared/contexts';

function ResultsPage() {

    const navState = useContext(NavStateContext);

    if (!navState.formCalculated) {
        return <Navigate to={"/kalkulator"} replace />
    }

    return (
        <>
            <section className="flex flex-col w-sm md:w-4xl m-auto py-8 px-2">
                <ResultsHeaderCard />
                <section className='grid md:grid-cols-2 md:gap-8'>
                    <FinancialSummaryCard />
                    <CashFlowCard />
                </section>
                <InvestmentDetailsCard />
                <section className='mt-4 border border-gray-300 rounded-2xl p-8'>
                    <header>Key Insights</header>
                    <KeyInsightCard />
                </section>
                <section className='grid md:grid-cols-2 gap-4 mt-8'>
                    <button
                        className=
                        'flex flex-row justify-center gap-2 py-2 text-white rounded-2xl transition-colors bg-black hover:bg-black/50 cursor-pointer'
                    ><TrendingUp /> <Link to={'/hasil'}>Lihat Dashboard Terperinci</Link></button>
                    <button
                        className=
                        'w-full py-2 text-black rounded-2xl transition-colors bg-white border border-gray-300 hover:bg-black/10 cursor-pointer'
                    ><Link to={'/kalkulator'}>Hitung ulang dengan parameter yang berbeda</Link></button>
                </section>
            </section>
        </>
    )
}

export default ResultsPage;