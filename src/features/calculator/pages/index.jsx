import FormCalculator from "../components/FormCalculator";

function Calculator() {

    const styles = {
        container: {
            width: '100%',
            height: '20px',
            backgroundColor: '#CBCBCB',
            borderRadius: '10px'
        },
        filler: {
            width: '5%',
            height: '100%',
            backgroundColor: '#000000',
            borderRadius: '10px',
            color: '#ffffff',
            paddingLeft: '20px'
        }
    }

    return (
        <div className="flex flex-col justify-center w-full py-4">
            <div className="w-5xl m-auto px-8 py-4 rounded-2xl border border-gray-300 shadow">
                <h2>ROI Calculator</h2>
                <p className="text-gray-700">Calculate return on investment </p>
                <label htmlFor="" className="flex flex-row justify-between">
                    <span>Form Completion</span>
                    <span>50%</span>
                </label>
                <div className="progress-bar-container mt-4" style={styles.container}>
                    <div className="progress-bar-filler" style={styles.filler}>
                    </div>
                </div>
            </div>
            <FormCalculator />
        </div>
    )
}

export default Calculator;