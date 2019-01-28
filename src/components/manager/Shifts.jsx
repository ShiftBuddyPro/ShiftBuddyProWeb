import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import axios from "axios";

export default class Shifts extends Component {
  state = {
    shifts: []
  };

  componentWillMount() {
    axios
      .get(`/api/v1/managers/${localStorage.getItem("manager_id")}/shifts`)
      .then(res => {
        this.setState({ shifts: res.data.data });
      })
      .catch(err => console.log(err));
  }

  shiftsView() {
    return this.state.shifts.map(shift => {
      console.log(shift);
      return (
        <Row className="list-view-item" key={shift.id}>
          <Col>
            <div>{shift.attributes.employee_name}</div>
            <div>{shift.attributes.date}</div>
          </Col>

          <Col>
            <button
              className="float-right basic-button shadow orange mt-half"
              onClick={() => {
                this.handleShiftClick(shift.id);
              }}
            >
              View
            </button>
          </Col>
        </Row>
      );
    });
  }

  handleShiftClick(shift_id) {
    localStorage.setItem("shift_id", shift_id);
    this.props.history.push("/shift");
  }

  render() {
    return (
      <Container>
        <h1 className="text-center"> Shifts</h1>
        <Row>
          <Col className="card" md={{ size: 8, offset: 2 }}>
            {this.shiftsView()}
          </Col>
        </Row>
      </Container>
    );
  }
}
