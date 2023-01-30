import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
// import { AuthContexProvider } from "./context/userContext.js";
import { Provider } from "mobx-react";
import taskStore from "./store/TaskStore.js";
import schedules from "./store/Schedules.js";

// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={taskStore} schedules={schedules}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
