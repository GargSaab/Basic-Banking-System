import React from "react";
import ReactDom from "react-dom";
import HomePage from "./components/HomePage.js";
import TransferMoney from "./components/TransferMoney.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewCustomer from "./components/NewCustomer.js";
import "./assests/styles.css";

ReactDom.render(
  <Router>
    <Route exact path="/" component={HomePage} />
    <Route path="/newcustomer" component={NewCustomer} />
    <Route path="/transfer" component={TransferMoney} />
  </Router>,
  document.getElementById("root")
);
