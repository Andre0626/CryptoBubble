import './App.css';
import Bubble from "./components/Bubble";

function App() {

    const tokens = [
        {
            "token_id": "WEGLD-bd4d79",
            "price": "32.79933555309357",
            "price_change": "0.0447",
            "price_change_percentage": "0.1365",
            "volume": "17568.5836",
            "liquidity": "441508.1394"
        },
        {
            "token_id": "HTM-f51d55",
            "price": "0.41883054302564093",
            "price_change": "-0.0019",
            "price_change_percentage": "-0.4623",
            "volume": "468.3999",
            "liquidity": "426.8963"
        },
        {
            "token_id": "WBTC-5349b3",
            "price": "29307.401474330873",
            "price_change": "-12.9810",
            "price_change_percentage": "-0.0443",
            "volume": "35.1689",
            "liquidity": "11923.6846"
        },
        {
            "token_id": "WETH-b4ca29",
            "price": "1873.5899624943218",
            "price_change": "-1.6824",
            "price_change_percentage": "-0.0897",
            "volume": "0.0000",
            "liquidity": "5898.0739"
        },
        {
            "token_id": "USDT-f8c08c",
            "price": "1.0000838554710965",
            "price_change": "0.0001",
            "price_change_percentage": "0.0098",
            "volume": "0.0000",
            "liquidity": "27985.7557"
        },
        {
            "token_id": "XAPES-1d15a5",
            "price": "0.0023814747433991584",
            "price_change": "0.0000",
            "price_change_percentage": "0.0053",
            "volume": "0.0000",
            "liquidity": "2915.1770"
        },
        {
            "token_id": "LEGLD-d74da9",
            "price": "33.43530102710522",
            "price_change": "-0.0429",
            "price_change_percentage": "-0.1280",
            "volume": "254.8338",
            "liquidity": "85830.2632"
        },
        {
            "token_id": "ONE-f9954f",
            "price": "0.09675663584761168",
            "price_change": "0.0020",
            "price_change_percentage": "2.1544",
            "volume": "12781.0463",
            "liquidity": "246771.4317"
        },
        {
            "token_id": "MERMAID-9c388a",
            "price": "0.00025975944337399315",
            "price_change": "-0.0000",
            "price_change_percentage": "-0.2022",
            "volume": "0.2598",
            "liquidity": "34.9678"
        },
        {
            "token_id": "CPA-97530a",
            "price": "0.0004791223887893194",
            "price_change": "-0.0000",
            "price_change_percentage": "-0.3525",
            "volume": "0.0000",
            "liquidity": "383.3215"
        },
        {
            "token_id": "ESTAR-461bab",
            "price": "0.0006325721269640368",
            "price_change": "-0.0001",
            "price_change_percentage": "-14.0117",
            "volume": "29.3440",
            "liquidity": "434.1440"
        },
        {
            "token_id": "RARE-99e8b0",
            "price": "0.012853454974243266",
            "price_change": "-0.0000",
            "price_change_percentage": "-0.3063",
            "volume": "6.5802",
            "liquidity": "16246.8881"
        },
        {
            "token_id": "KRO-df97ec",
            "price": "0.0007989904757311604",
            "price_change": "0.0000",
            "price_change_percentage": "0.0325",
            "volume": "0.0000",
            "liquidity": "43988.9615"
        },
        {
            "token_id": "HYPE-619661",
            "price": "0.0000016849781397539624",
            "price_change": "-0.0000",
            "price_change_percentage": "-0.4416",
            "volume": "16.4399",
            "liquidity": "5588.6790"
        },
        {
            "token_id": "PLATA-9ba6c3",
            "price": "0.0003226359754840529",
            "price_change": "0.0000",
            "price_change_percentage": "0.7278",
            "volume": "6.5744",
            "liquidity": "3794.0959"
        },
        {
            "token_id": "EFOO-8fe2d4",
            "price": "0.00001538934056590301",
            "price_change": "-0.0000",
            "price_change_percentage": "-5.6013",
            "volume": "7.9595",
            "liquidity": "312.6340"
        },
        {
            "token_id": "XBIT-630969",
            "price": "0.000007003968862823588",
            "price_change": "0.0000",
            "price_change_percentage": "1.0107",
            "volume": "0.0000",
            "liquidity": "550.4874"
        },
        {
            "token_id": "USDC-c76f1f",
            "price": "1.0001361915753635",
            "price_change": "-0.0001",
            "price_change_percentage": "-0.0057",
            "volume": "1800.0109",
            "liquidity": "138733.0445"
        },
        {
            "token_id": "JEX-9040ca",
            "price": "0.001629000000",
            "price_change": "-0.0000",
            "price_change_percentage": "-2.2209",
            "volume": "352.2157",
            "liquidity": "24571.9703"
        },
        {
            "token_id": "XLH-8daa50",
            "price": "0.005918000000",
            "price_change": "0.0003",
            "price_change_percentage": "5.7163",
            "volume": "5858.0085",
            "liquidity": "47856.2511"
        },
        {
            "token_id": "GCC-3194ab",
            "price": "0.023750000000",
            "price_change": "-0.0000",
            "price_change_percentage": "-0.1430",
            "volume": "1.0083",
            "liquidity": "1246.9035"
        },
        {
            "token_id": "UPARK-982dd6",
            "price": "0.001474000000",
            "price_change": "0.0001",
            "price_change_percentage": "5.9669",
            "volume": "1217.1028",
            "liquidity": "3526.1965"
        },
        {
            "token_id": "CTP-298075",
            "price": "0.000567000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.0000",
            "volume": "32.3907",
            "liquidity": "9857.9520"
        },
        {
            "token_id": "XBONK-7cde03",
            "price": "0.000000000000",
            "price_change": "0.0000",
            "price_change_percentage": "0",
            "volume": "0.0000",
            "liquidity": "0.0000"
        },
        {
            "token_id": "REWARD-cf6eac",
            "price": "0.000357000000",
            "price_change": "-0.0000",
            "price_change_percentage": "-2.9891",
            "volume": "266.5143",
            "liquidity": "4133.1213"
        },
        {
            "token_id": "ECPX-5cbfeb",
            "price": "0.000857000000",
            "price_change": "-0.0000",
            "price_change_percentage": "-2.7242",
            "volume": "68.0229",
            "liquidity": "4616.2729"
        },
        {
            "token_id": "BFY-8344ff",
            "price": "0.345200000000",
            "price_change": "-0.0249",
            "price_change_percentage": "-6.7380",
            "volume": "1146.7742",
            "liquidity": "1046.6900"
        },
        {
            "token_id": "MPH-f8ea2b",
            "price": "0.047718000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.0000",
            "volume": "14.2677",
            "liquidity": "96.6290"
        },
        {
            "token_id": "EBUD-d29cce",
            "price": "0.000564000000",
            "price_change": "0.0000",
            "price_change_percentage": "5.8161",
            "volume": "1.9428",
            "liquidity": "582.1380"
        },
        {
            "token_id": "TCX-8d448d",
            "price": "0.050070000000",
            "price_change": "0.0132",
            "price_change_percentage": "35.8051",
            "volume": "45.6260",
            "liquidity": "275.3236"
        },
        {
            "token_id": "HODL-b8bd81",
            "price": "43.898540000000",
            "price_change": "-0.3437",
            "price_change_percentage": "-0.7770",
            "volume": "592.9595",
            "liquidity": "11116.9831"
        },
        {
            "token_id": "ORDER-f58c5b",
            "price": "2.777866000000",
            "price_change": "0.0064",
            "price_change_percentage": "0.2327",
            "volume": "0.0000",
            "liquidity": "150.0864"
        },
        {
            "token_id": "ANT-dada1a",
            "price": "0.000000000000",
            "price_change": "0.0000",
            "price_change_percentage": "0",
            "volume": "0.0000",
            "liquidity": "0.0000"
        },
        {
            "token_id": "MEME-2101aa",
            "price": "0.000002000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.0000",
            "volume": "0.0000",
            "liquidity": "1042.8784"
        },
        {
            "token_id": "WAGMI-3f803d",
            "price": "0.000015000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.0000",
            "volume": "0.0000",
            "liquidity": "104.8023"
        },
        {
            "token_id": "PEPE-8ef042",
            "price": "0.000000000000",
            "price_change": "0.0000",
            "price_change_percentage": "0",
            "volume": "0.0000",
            "liquidity": "0.0000"
        },
        {
            "token_id": "BEER-77650d",
            "price": "0.000000000000",
            "price_change": "0.0000",
            "price_change_percentage": "0",
            "volume": "0.0000",
            "liquidity": "0.0000"
        },
        {
            "token_id": "NEAT-811b8d",
            "price": "0.001767000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.2269",
            "volume": "0.0000",
            "liquidity": "170.0779"
        },
        {
            "token_id": "GROGU-b40e75",
            "price": "0.000000000000",
            "price_change": "0.0000",
            "price_change_percentage": "0",
            "volume": "0.0000",
            "liquidity": "0.0000"
        },
        {
            "token_id": "AAR-80c00b",
            "price": "0.000001000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.0000",
            "volume": "0.0000",
            "liquidity": "0.3949"
        },
        {
            "token_id": "INFRA-758365",
            "price": "0.000923000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.0000",
            "volume": "0.0000",
            "liquidity": "0.0001"
        },
        {
            "token_id": "ROF-c85ab7",
            "price": "0.000777000000",
            "price_change": "0.0000",
            "price_change_percentage": "0.0000",
            "volume": "0.0000",
            "liquidity": "13.4561"
        },
        {
            "token_id": "EDIA-60b86f",
            "price": "0.202160000000",
            "price_change": "-0.0016",
            "price_change_percentage": "-0.7828",
            "volume": "0.0000",
            "liquidity": "206.9962"
        }
    ];

    return (
        <div className="App">
            <header className="App-header">
                <Bubble tokens={tokens}/>
            </header>
        </div>
    );
}

export default App;
