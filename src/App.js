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
                        // radius: 50,
                        lineColor: 'rgb(149,58,59)',
                        lineWidth: 5,
                        clip: true,
                        fillColor: 'rgb(149,58,59)'
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
                        // radius: 50,
                        lineColor: 'rgb(17,255,0)',
                        lineWidth: 5,
                        clip: true,
                        fillColor: 'rgb(17,255,0)'
                    },
                }
            )
        }

        return acc
    }, { red: [], green: [] });

    console.log(series);

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

    console.log("data chartL ", dataChart);

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
