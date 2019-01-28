import React, { Component } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  Form
} from "reactstrap";

export default class EmployeesNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      password_confirmation: "",
      username: "",
      manager_id: localStorage.getItem("manager_id"),
      errors: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        `/api/v1/managers/${localStorage.getItem("manager_id")}/employees`,
        { employee: this.state }
      )
      .then(res => {
        this.props.history.push("/employees");
      })
      .catch(err => this.setState({ errors: true }));
  }

  renderErrorMessage() {
    return <p className="small-error-text">Error</p>;
  }

  render() {
    return (
      <Container className="mt-6">
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Form className="card p-1rem">
              <h3 className="ml-auto mr-auto">New Employee</h3>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input onChange={this.handleChange} type="text" name="name" />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password_confirmation">Password Confirmation</Label>
                <Input
                  onChange={this.handleChange}
                  type="password"
                  name="password_confirmation"
                />
              </FormGroup>
              {this.state.errors ? this.renderErrorMessage() : ""}
              <button
                className="basic-button shadow blue"
                onClick={this.handleSubmit}
              >
                Create
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
