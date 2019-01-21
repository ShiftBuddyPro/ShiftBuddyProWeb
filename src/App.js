import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Landing from "./components/public/Landing";
import Login from "./components/public/Login";
import Dashboard from "./components/manager/Dashboard";
import Employee from "./components/manager/Employee";
import axios from "axios";

class App extends Component {
  render() {
    (function() {
      const token = localStorage.getItem("auth_token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        /*if setting null does not remove `Authorization` header then try
          delete axios.defaults.headers.common['Authorization'];
        */
      }
    })();
    return (
      <Router>
        <div className="app">
          <Route path="/" exact component={Landing} />
          <Route path="/login/" component={Login} />
          <Route path="/dashboard/" component={Dashboard} />
          <Route path="/employee/" component={Employee} />
        </div>
      </Router>
    );
  }
}

export default App;
