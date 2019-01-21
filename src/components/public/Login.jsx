import React, { Component } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("/api/v1/managers/authenticate", this.state)
      .then(res => {
        const { auth_token } = res.data;
        localStorage.setItem("auth_token", auth_token);
        const { manager_id } = jwt_decode(auth_token);
        localStorage.setItem("manager_id", manager_id);
        this.props.history.push({ pathname: "/dashboard" });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email: <input type="text" name="email" onChange={this.handleChange} />
        </label>
        <label>
          Password:{" "}
          <input type="password" name="password" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Log in" />
      </form>
    );
  }
}
