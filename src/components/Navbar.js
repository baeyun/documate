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

import { pathToUri } from "../utils";

export default class DocumateNavbar extends React.Component {
  state = {
    revealMobileSearch: false
  };

  toggleMobileSearch() {
    if (!this.state.revealMobileSearch)
      this.setState({
        revealMobileSearch: true
      });
    else
      this.setState({
        revealMobileSearch: false
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
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png"
              width="40"
              alt=""
            />
            <span id="navbar-brand-title">Documate</span>
          </NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav id="navbar-links-left" navbar>
              {Object.keys(navItems).map((navitem, i) => {
                let path = pathToUri(navItems[navitem]);

                return (
                  <NavItem key={"nav-item-" + i}>
                    <NavLink
                      className={path === window.location.pathname && "active"}
                      href={path}
                      children={navitem}
                    />
                  </NavItem>
                );
              })}
              <NavItem
                id="navbar-mobile-search-item"
                style={{
                  position: "fixed",
                  right: 16,
                  zIndex: 1
                }}
              >
                <Input
                  className={this.state.revealMobileSearch ? "active" : ""}
                  type="search"
                  id="navbar-search-mobile"
                  placeholder="Search docs"
                />
                <span onClick={this.toggleMobileSearch.bind(this)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    alt="Search"
                    viewBox="0 0 16 16"
                    style={{
                      width: 17,
                      verticalAlign: -2
                    }}
                  >
                    <path
                      d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z"
                      fill="#ffffff"
                    />
                  </svg>
                </span>
              </NavItem>
            </Nav>
            {/* Right */}
            <Nav
              style={{
                alignItems: "center"
              }}
              className="ml-auto"
              navbar
            >
              <NavItem>
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
                  GitHub{" "}
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                    width="15"
                    height="15"
                    style={{
                      verticalAlign: -3,
                      marginLeft: 3
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="
                  M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,
                  0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z
                "
                    />
                    <polygon
                      fill="currentColor"
                      points="
                  45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,
                  14.9 62.8,22.9 71.5,22.9
                  "
                    />
                  </svg>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
