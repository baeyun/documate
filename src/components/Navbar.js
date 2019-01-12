import React from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input
} from "reactstrap";
import { EntypoLink, EntypoMagnifyingGlass } from "react-entypo";

export default class DocumateNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar
        fixed
        style={{
          backgroundColor: "#20232a"
        }}
        id="navbar"
        dark
        expand="md"
      >
        <Container>
          <NavbarBrand id="navbar-brand" href="/">
            Documate
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav id="navbar-links-left" navbar>
              <NavItem>
                <NavLink href="#">Docs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About</NavLink>
              </NavItem>
            </Nav>
            {/* Right */}
            <Nav className="ml-auto" navbar>
              <NavItem>
                {/* <EntypoMagnifyingGlass /> */}
                <Input
                  type="search"
                  id="navbar-search"
                  placeholder="Search docs"
                />
              </NavItem>
              <NavItem>
                <NavLink href="#">v2.0.0</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  GitHub <EntypoLink style={{ verticalAlign: -2 }} />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
