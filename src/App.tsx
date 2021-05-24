import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import MainContainer from "./components/layout/MainContainer";
import UserContextProvider from "./context/UserContextProvider";


const App: FunctionComponent = () => {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <MainContainer />
      </Router>
    </UserContextProvider>
  );
};

export default App;
