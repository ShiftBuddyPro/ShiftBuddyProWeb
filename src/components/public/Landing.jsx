import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div>
        Shift Buddy Pro
        <button href="/login">
          <Link to="/login" >
          Log in
          </Link>
        </button>
      </div>
    );
  }
}
