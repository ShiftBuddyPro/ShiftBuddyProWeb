import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import axios from "axios";

export default class Employees extends Component {
  state = {
    employees: []
  };

  componentWillMount() {
    axios
      .get(`/api/v1/managers/${localStorage.getItem("manager_id")}/employees`)
      .then(res => {
        this.setState({ employees: res.data });
      })
      .catch(err => console.log(err));
  }

  employeesView() {
    return this.state.employees.map(employee => {
      return (
        <div className="list-view-item" key={employee.id}>
          {employee.name}
          <button
            className="float-right basic-button shadow orange"
            onClick={() => {
              this.handleEmployeeClick(employee.id);
            }}
          >
            View
          </button>
        </div>
      );
    });
  }

  handleEmployeeClick(employee_id) {
    localStorage.setItem("employee_id", employee_id);
    this.props.history.push("/employee");
  }

  render() {
    return (
      <Container>
        <h1 className="text-center"> Employees <span  onClick={() => this.props.history.push('/employeesnew')} className="plus-button">+</span></h1>
        <Row>
          <Col className="card" md={{ size: 8, offset: 2 }}>
            {this.employeesView()}
          </Col>
        </Row>
      </Container>
    );
  }
}
