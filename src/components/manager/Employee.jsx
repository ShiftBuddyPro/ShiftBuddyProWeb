import React, { Component } from "react";

export default class Employee extends Component {

  render() {
    return <div>{localStorage.getItem('employee_id')}hello world</div>;
  }
}
