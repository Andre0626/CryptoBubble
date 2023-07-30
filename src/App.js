import logo from './logo.svg';
import './App.css';
import Bubble from "./components/Bubble";
import Chart from "./components/Highcharts";
import Data from "./mvxData.json";
function App() {

    const series = Data.reduce((acc, crt) => {
        if (Number(crt.price_change_percentage) > 0) {
            acc.green.push(
                {
                    name: crt.token_id,
                    value: Number(parseFloat(crt.price_change_percentage).toFixed(2)),
                    // marker: {
                    //     symbol: `url(https://media.elrond.com/tokens/asset/${crt.token_id}/logo.svg)`,
                    //     width: '',
                    //     radius: '50%',
                    //     height: '',
                    //     lineColor: 'rgb(17,255,0)',
                    //     lineWidth: 5,
                    //     clip: true,
                    //     fillColor: 'rgb(17,255,0)'
                    // }
                }
            )
        } else {
            acc.red.push(
                {
                    name: crt.token_id,
                    value: Number(parseFloat(crt.price_change_percentage).toFixed(2)),
                    // marker: {
                    //     symbol: `url(https://media.elrond.com/tokens/asset/${crt.token_id}/logo.svg)`,
                    //     width: 16,
                    //     radius: 50,
                    //     height: 16,
                    //     lineColor: 'rgb(149,58,59)',
                    //     lineWidth: 5,
                    //     clip: true,
                    // },
                    // marker: {
                    //     symbol: `url(https://media.elrond.com/tokens/asset/${crt.token_id}/logo.svg)`,
                    //     width: 16,
                    //     height: 16
                    // }
                }
            )
        }

        return acc
    }, {red: [], green: []});

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
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <Bubble/>
                    <Chart dataChart={dataChart}/>
            </header>
        </div>
    );
}

export default App;
