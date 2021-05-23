import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import MainContainer from "./components/layout/MainContainer";
import UserContextProvider from "./context/UserContextProvider";
require('dotenv').config();

const App: FunctionComponent = () => {
  return (
    <UserContextProvider>
      <Router>
      {process.env.REACT_APP_ENV === 'dev' && (
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
