import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import MainContainer from "./components/layout/MainContainer";
import UserContextProvider from "./context/UserContextProvider";
import * as GlobalConfig from './config/GlobalConfig'; 

const App: FunctionComponent = () => {
  return (
    <UserContextProvider>
      <Router>
      {GlobalConfig.environment === 'dev' && (
          <>
           Corriendo en ambiente dev
          </>
        )}
        <Navbar />
        <MainContainer />
      </Router>
    </UserContextProvider>
  );
};

export default App;
