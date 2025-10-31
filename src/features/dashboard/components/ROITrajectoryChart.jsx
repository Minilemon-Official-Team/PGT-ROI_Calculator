import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { data } from "../constants/data";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 16;
defaults.plugins.title.color = "black";

function ROITrajectoryChart() {
    const chartData = {
        labels: data.slice(0, 24).map((item) => item.month),
        datasets: [
            {
                label: "ROI",
                data: data.map((item) => item.roi),
                borderColor: "rgba(124, 58, 237, 0.6)",
                backgroundColor: "rgba(124, 58, 237, 0.15)",
                borderWidth: 1.5,
                pointRadius: 0,
                fill: true,
                tension: 0.3,
            },
        ],
    }

    const chartOptions = {
        plugins: {
            tooltip: {
                enabled: true,
                mode: "index",
                intersect: false,
                displayColors: false,
                borderColor: "#ccc",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                titleColor: "#000",
                titleFont: { weight: "bold", size: 14 },
                bodyColor: "#000",
                bodyFont: { size: 13 },
                labelColor: "#7C3AED",
                padding: 12,
                callbacks: {
                    title: function (context) {
                        return `Month ${context[0].label}`;
                    },
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.formattedValue;
                        return `${label}: ${value}`;
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "ROI Growth Trajectory",
                font: { size: 16, weight: "bold" },
                padding: {
                    top: 0,
                    bottom: 24
                }
            },
            datalabels: {
                display: false
            },
        },
        scales: {
            x: {
                ticks: {
                    callback: function (value) {
                        const label = this.getLabelForValue(value);
                        if (label === 1 || label === 3 || label % 6 === 0) {
                            return `Month ${label}`
                        }
                    }
                },
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                grid: { color: "#ddd" },
                ticks: { color: "#444" },
            },
        }
    }

    return (
        <Line
            data={chartData}
            options={chartOptions}
        />
    )
}

export default ROITrajectoryChart;