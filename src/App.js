import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import ThemeContext from "./context/Context";
import Bubble from "./components/Bubble";

function App() {
    const [theme, setTheme] = useState();

    return (
        <div className="App">
            <header className="App-header">
                <ThemeContext.Provider value={theme}>
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <Bubble/>
                </ThemeContext.Provider>
            </header>
        </div>
    );
}

export default App;
