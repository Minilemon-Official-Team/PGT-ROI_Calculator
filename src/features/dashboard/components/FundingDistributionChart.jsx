import { fundingSources } from "../constants/data";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(ChartDataLabels);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 16;
defaults.plugins.title.color = "black";

function FundingDistributionChart() {

    const chartData = {
        labels: fundingSources.map((item) => item.label),
        datasets: [
            {
                label: fundingSources.map((item) => item.label),
                data: fundingSources.map((item) => item.value),
                backgroundColor: [
                    "#8884D8",
                    "#00FF00",
                    "#FF7300",
                    "#FFC658",
                    "#82CA9D"
                ],
            },
        ],
    };

    const chartOptions = {
        layout: {
            padding: 100
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
                    label: function (context) {
                        const value = context.formattedValue;
                        return value;
                    }
                }
            },
            legend: { display: false },
            datalabels: {
                formatter: (value, context) => {
                    const dataArr = context.chart.data.datasets[0].data;
                    const total = dataArr.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(0);
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${percent}%`;
                },
                color: (ctx) => ctx.dataset.backgroundColor[ctx.dataIndex],
                font: {
                    weight: "bold",
                },
                align: "end",
                anchor: "end",
            },
        },
    };


    return (<Pie data={chartData} options={chartOptions} />)
}

export default FundingDistributionChart;