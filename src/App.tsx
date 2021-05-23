import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import MainContainer from "./components/layout/MainContainer"


const App: FunctionComponent = () => {
  return (
    <Router>
      <Navbar />
      <MainContainer />
    </Router>
  );
};

export default App;
