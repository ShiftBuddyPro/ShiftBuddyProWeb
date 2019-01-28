import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { withRouter } from "react-router";

class SiteNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  guestView() {}

  userView() {
    return (
      <>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/employees/">Employees</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/shifts/">Shifts</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    localStorage.removeItem("auth_token");
                    this.props.history.push("/");
                  }}
                >
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </>
    );
  }
  render() {
    return (
      <Navbar color="light" light expand="md" className="mb-10">
        <NavbarBrand
          href={localStorage.getItem("auth_token") ? "/dashboard" : "/"}
        >
          Shift Buddy Pro
        </NavbarBrand>
        {localStorage.getItem("auth_token") ? this.userView() : ""}
      </Navbar>
    );
  }
}

export default withRouter(SiteNavbar);
