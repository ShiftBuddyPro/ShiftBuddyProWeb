import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SiteNavbar from "./components/utilities/SiteNavbar";
import Landing from "./components/public/Landing";
import Login from "./components/public/Login";
import Dashboard from "./components/manager/Dashboard";
import Employee from "./components/manager/Employee";
import Employees from "./components/manager/Employees";
import Shifts from "./components/manager/Shifts";
import EmployeesNew from "./components/manager/EmployeesNew";

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
      <div className="app">
        <Router>
          <div>
            <SiteNavbar />
            <Route path="/" exact component={Landing} />
            <Route path="/login/" component={Login} />
            <Route path="/dashboard/" component={Dashboard} />
            <Route path="/employees/" component={Employees} />
            <Route path="/shifts/" component={Shifts} />
            <Route path="/employee/" component={Employee} />
            <Route path="/employeesnew/" component={EmployeesNew} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
