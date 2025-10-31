function ProgressBar({ title, percentageProgress, value }) {

    const styles = {
        container: {
            width: '100%',
            height: '12px',
            backgroundColor: '#CBCBCB',
            borderRadius: '10px'
        },
        filler: {
            width: `${percentageProgress}%`,
            height: '100%',
            backgroundColor: '#000000',
            borderRadius: '10px',
            color: '#ffffff',
            paddingLeft: '20px'
        }
    }

    return (
        <div>
            <label htmlFor="" className="flex flex-row justify-between mt-2">
                <span>{title}</span>
                <span>{value ? `Rp${value}` : `${percentageProgress}%`}</span>
            </label>
            <div className="progress-bar-container mt-2" style={styles.container}>
                <div className="progress-bar-filler" style={styles.filler}>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;