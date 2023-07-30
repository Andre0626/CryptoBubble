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
            acc.green.push(
                {
                    name: crt.token_id,
                    value: Number(parseFloat(crt.price_change_percentage).toFixed(2)),
                    z: scaledPercentage,
                    marker: {
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.6 },
                            stops: [
                                [0, 'hsla(0,100%,100%,0)'],
                                [0.6, 'hsla(0,100%,100%,0)'],
                                [1, 'hsl(0,100%,50%)']
                            ]
                        },
                        lineWidth: 1,
                        lineColor: 'hsl(0,100%,100%)'
                    }
                }
            )
        } else {
            acc.red.push(
                {
                    name: crt.token_id,
                    value: Math.abs(Number(parseFloat(crt.price_change_percentage).toFixed(2))),
                    z: scaledPercentage,
                    marker: {
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.6 },
                            stops: [
                                [0, 'hsla(120,90%,100%,0)'],
                                [0.6, 'hsla(120,90%,100%,0)'],
                                [1, 'hsl(120,90%,45%)']
                            ]
                        },
                        lineWidth: 1,
                        lineColor: 'hsl(120,90%,100%)'
                    },
                }
            )
        }

        return acc
    }, { red: [], green: [] });

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
