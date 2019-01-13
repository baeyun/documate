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

import { pathToUri } from "../utils";

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
    let { nav: navItems } = this.props;

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
              {Object.keys(navItems).map((navitem, i) => (
                <NavItem key={"nav-item-" + i}>
                  <NavLink
                    href={pathToUri(navItems[navitem])}
                    children={navitem}
                  />
                </NavItem>
              ))}
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
