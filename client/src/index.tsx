import React from "react";
import ReactDOM from "react-dom";
import "./app/ui/style/global.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import './infra/i18n/i18n-index';

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
