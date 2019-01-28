import React, { Component } from "react";
import axios from "axios";
import { Col, Row, Container } from "reactstrap";

export default class Dashboard extends Component {
  state = {
    manager: {
      name: "",
      email: "",
      id: ""
    },
    activities: [],
    manager_id: ""
  };

  componentDidMount() {
    const manager_id = localStorage.getItem("manager_id");
    axios
      .get(`/api/v1/managers/${manager_id}`)
      .then(res => this.setState({ manager: res.data }))
      .catch(err => console.log(err));

    axios
      .get(`/api/v1/managers/${manager_id}/activity_logs`)
      .then(res => this.setState({ activities: res.data }))
      .catch(err => console.log(err));
  }

  activityLogView() {
    return this.state.activities.map(activity => {
      return <div key={activity} className="card p-1rem">{activity}</div>;
    });
  }

  render() {
    return (
      <Container>
        <h1 className="text-center mb-1rem">Activity Log </h1>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            {this.state.activities.length > 0 ? (
              this.activityLogView()
            ) : (
              <div className="text-center">There are no recent activities</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
