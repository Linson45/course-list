import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import { BrowserRouter } from "react-router-dom";
//Route Dictionary
import RouteManager from "./routes";
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const App = () => (
  <BrowserRouter>
    <RouteManager />
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
