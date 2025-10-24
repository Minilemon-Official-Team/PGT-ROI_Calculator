import FormCalculator from "../features/calculator/components/FormCalculator";
import ProgressBar from "../shared/components/ui/ProgressBar";
import { Calculator } from 'lucide-react';
import { useState } from 'react';

function CalculatorPage() {

    const [progress, setProgress] = useState(0);
    const percentageProgress = `${Math.round((progress / 6) * 100)}`

    return (
        <section className="flex flex-col py-4">
            <div className="w-sm md:w-4xl m-auto px-8 py-4 rounded-2xl border border-gray-300 shadow">
                <div className="flex flex-row gap-2">
                    <Calculator /> <h2>ROI Kalkulator</h2>
                </div>
                <p className="text-black/60 mt-2">
                    Hitung persentase pengembalian investasi (ROI) bisnis Anda
                </p>
                <ProgressBar title={"Pengisian Formulir"} percentageProgress={percentageProgress} />
            </div>
            <FormCalculator totalProgress={(value) => setProgress(value)} />
        </section>
    )
}

export default CalculatorPage;