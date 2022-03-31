import "./App.css";
import { Header, Footer } from "components";
import {AllRoutes} from "./AllRoutes";

function App() {
  return (
    <div className="App bg-primary">
      <Header/>
      <AllRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
