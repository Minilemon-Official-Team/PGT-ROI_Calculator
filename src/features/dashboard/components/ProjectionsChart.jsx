import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 16;
defaults.plugins.title.color = "black";

function ProjectionsChart({ data }) {
    const chartData = {
        labels: data.slice(0, 24).map((item) => item.month),
        datasets: [
            {
                label: "Cost",
                data: data.map((item) => item.cost),
                borderColor: "#82CA9D",
                backgroundColor: "#82CA9D",
                borderWidth: 1,
                pointRadius: 4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#82CA9D",
                pointHoverBackgroundColor: "#82CA9D",
                pointHoverBorderColor: "#4CAF50",
                borderHoverColor: "#4CAF50",
            },
            {
                label: "Profit",
                data: data.map((item) => item.profit),
                borderColor: "#FF7300",
                backgroundColor: "#FF7300",
                borderWidth: 1,
                pointRadius: 4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#FF7300",
                pointHoverBackgroundColor: "#FF7300",
                pointHoverBorderColor: "#FFB74D",
                borderHoverColor: "#FFB74D",
            },
            {
                label: "Revenue",
                data: data.map((item) => item.revenue),
                borderColor: "#8884D8",
                backgroundColor: "#8884D8",
                borderWidth: 1,
                pointRadius: 4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#8884D8",
                pointHoverBackgroundColor: "#8884D8",
                pointHoverBorderColor: "#B39DDB",
                borderHoverColor: "#B39DDB",
            },
        ],
    }

    const chartOptions = {
        interaction: {
            mode: "index",
            intersect: false,
        },
        onHover: (event, elements, chart) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                chart.setActiveElements(
                    chart.data.datasets.map((_, datasetIndex) => ({
                        datasetIndex,
                        index,
                    }))
                );
                chart.update();
            } else {
                chart.setActiveElements([]);
                chart.update();
            }
        },
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

                        if (label === 'Revenue') return `${label}: ${value}`;
                        if (label === 'Cost') return `${label}: ${value}`;
                        if (label === 'Profit') return `${label}: ${value}`;
                        return `${label}: ${value}`;
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

export default ProjectionsChart;