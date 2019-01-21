import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  state = {
    manager: {
      name: "",
      email: "",
      id: ""
    },
    employees: [],
    shifts: [],
    manager_id: ""
  };

  componentDidMount() {
    const manager_id = localStorage.getItem("manager_id");
    axios
      .get(`/api/v1/managers/${manager_id}`)
      .then(res => this.setState({ manager: res.data }))
      .catch(err => console.log(err));

    axios
      .get(`/api/v1/managers/${manager_id}/employees`)
      .then(res => {
        this.setState({ employees: res.data });
      })
      .catch(err => console.log(err));

    axios
      .get(`/api/v1/managers/${manager_id}/shifts`)
      .then(res => {
        this.setState({ shifts: res.data.data });
      })
      .catch(err => console.log(err));
  }

  handleEmployeeClick(id) {
    localStorage.setItem("employee_id", id);
    this.props.history.push("/employee");
  }

  employeesView() {
    return this.state.employees.map(employee => {
      return (
        <div className="list-view-item" key={employee.id}>
          {employee.name} {employee.id}{" "}
          <button
            className="float-right"
            onClick={() => this.handleEmployeeClick(employee.id)}
          >
            View
          </button>
        </div>
      );
    });
  }

  handleShiftClick(id) {
    localStorage.setItem("shift_id", id);
    console.log("shift");
  }

  shiftsView() {
    return this.state.shifts.map(shift => {
      return (
        <div className="list-view-item" key={shift.id}>
          {shift.id}
          <button
            className="float-right"
            onClick={() => {
              this.handleShiftClick(shift.id);
            }}
          >
            View
          </button>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.state.name}</h1>
        <div className="card">
          <h1>Employees</h1>
          {this.employeesView()}
        </div>
        <div className="card">
          <h1>Shifts</h1>
          {this.shiftsView()}
        </div>
      </div>
    );
  }
}
