import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import MainContainer from "./components/layout/MainContainer";
import UserContextProvider from "./context/UserContextProvider";

/**
 * tsx-web-shop App
 * 
 * @visibleName Web Shop App
 * @version 1.0.0
 * @author [Dario Palminio](https://github.com/dariopalminio/tsx-web-shop.git)
 */
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
