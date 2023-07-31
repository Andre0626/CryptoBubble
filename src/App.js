import './App.css';
import Bubble from "./components/Bubble";
import Chart from "./components/Highcharts";
import Data from "./mvxData.json";

function App() {

    const minPercentage = Math.min(...Data.map(d => Math.abs(d.price_change_percentage)));
    const maxPercentage = Math.max(...Data.map(d => Math.abs(d.price_change_percentage)));

    const series = Data.reduce((acc, crt) => {
        const scaledPercentage = (Math.abs(crt.price_change_percentage) - minPercentage) / (maxPercentage - minPercentage);

        if (Number(crt.price_change_percentage) > 0) {
            acc.green.push({
                name: crt.token_id,
                value: Number(parseFloat(crt.price_change_percentage).toFixed(2)),
                z: scaledPercentage,
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
                        stops: [
                            [0.5, 'rgba(255, 255, 255, 0)'],
                            [0.8, 'rgba(0, 255, 0, 0.3)'],
                            [0.9, 'rgba(0, 255, 0, 0.6)'],
                            [1, 'rgba(0, 255, 0, 1)']
                        ]
                    },
                    lineWidth: 1,
                    lineColor: 'rgba(0, 255, 0, .5)'
                }
            });
        } else if (Number(crt.price_change_percentage) < 0) {
            acc.red.push({
                name: crt.token_id,
                value: Math.abs(Number(parseFloat(crt.price_change_percentage).toFixed(2))),
                z: scaledPercentage,
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
                        stops: [
                            [0.5, 'rgba(255, 0, 0, 0)'],
                            [0.8, 'rgba(255, 0, 0, 0.3)'],
                            [0.9, 'rgba(255, 0, 0, 0.6)'],
                            [1, 'rgba(255, 0, 0, 1)']
                        ]
                    },
                    lineWidth: 1,
                    lineColor: 'rgba(255, 0, 0, 0.3)'
                }
            });
        }

        return acc;
    }, { green: [], red: [] });


    const dataChart = [
        {
            name: "Worse Rank",
            data: series.red,
            color: "rgb(149,58,59)",
        },
        {
            name: "Green",
            data: series.green,
            color: "rgb(23,85,63)",
        },
    ]

    return (
        <div className="App">
            <header className="App-header">
                <Bubble />
                <Chart dataChart={dataChart} />
            </header>
        </div>
    );
}

export default App;
