import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./root/index";
import { DataProvider } from "./context/DataProvider";

function App() {
    return (
      <div className="App">
          <DataProvider>
              <BrowserRouter>
                  <Root/>
              </BrowserRouter>
          </DataProvider>
      </div>
    );
}

export default App;