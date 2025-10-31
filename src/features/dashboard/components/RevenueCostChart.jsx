import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { data } from "../constants/data";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 16;
defaults.plugins.title.color = "black";

function RevenueCostChart() {
    const chartData = {
        labels: data.slice(0, 24).map((item) => item.month),
        datasets: [
            {
                type: "line",
                label: "Profit",
                data: data.map((item) => item.profit),
                borderColor: "orange",
                backgroundColor: "orange",
                borderWidth: 1,
                pointRadius: 4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "orange",
            },
            {
                type: "bar",
                label: "Revenue",
                data: data.map((item) => item.revenue),
                backgroundColor: "#8884D8"
            },
            {
                type: "bar",
                label: "Cost",
                data: data.map((item) => item.cost),
                backgroundColor: "#82CA9D"
            }
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
                padding: 12,
                callbacks: {
                    title: function (context) {
                        return `Month ${context[0].label}`;
                    },
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.formattedValue;

                        if (label === 'Revenue') return `${label}: Rp${value}`;
                        if (label === 'Cost') return `${label}: Rp${value}`;
                        if (label === 'Profit') return `${label}: Rp${value}`;
                        return `${label}: $${value}`;
                    }
                }
            },
            legend: {
                position: "bottom",
                labels: { color: "#333", font: { size: 13 } },
            },
            datalabels: {
                display: false
            },
            title: {
                display: true,
                text: "Revenue vs Costs Over Time",
                font: { size: 16, weight: "bold" },
                padding: {
                    top: 0,
                    bottom: 24
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    callback: function (value) {
                        const label = this.getLabelForValue(value);
                        if (label === 1 | label % 6 === 0) {
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
        <Bar
            data={chartData}
            options={chartOptions}
        />
    )
}

export default RevenueCostChart;