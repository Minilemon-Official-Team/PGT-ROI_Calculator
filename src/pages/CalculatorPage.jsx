import FormCalculator from "../features/calculator/components/FormCalculator";
import { Calculator } from 'lucide-react';
import { useState } from 'react';

function CalculatorPage() {

    const [progress, setProgress] = useState(0);
    const percentageProgress = `${Math.round((progress / 6) * 100)}%`

    const styles = {
        container: {
            width: '100%',
            height: '20px',
            backgroundColor: '#CBCBCB',
            borderRadius: '10px'
        },
        filler: {
            width: `${percentageProgress}`,
            height: '100%',
            backgroundColor: '#000000',
            borderRadius: '10px',
            color: '#ffffff',
            paddingLeft: '20px'
        }
    }

    return (
        <div className="flex flex-col justify-center py-4">
            <div className="w-sm md:w-4xl m-auto px-8 py-4 rounded-2xl border border-gray-300 shadow">
                <div className="flex flex-row gap-2">
                    <Calculator /> <h2>ROI Kalkulator</h2>
                </div>
                <p className="text-black/60 mt-2">
                    Hitung persentase pengembalian investasi (ROI) bisnis Anda
                </p>
                <label htmlFor="" className="flex flex-row justify-between mt-2">
                    <span>Pengisian Formulir</span>
                    <span>{percentageProgress}</span>
                </label>
                <div className="progress-bar-container mt-2" style={styles.container}>
                    <div className="progress-bar-filler" style={styles.filler}>
                    </div>
                </div>
            </div>
            <FormCalculator totalProgress={(value) => setProgress(value)} />
        </div>
    )
}

export default CalculatorPage;