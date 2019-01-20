import React from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input
} from "reactstrap";

import SearchIcon from "./SearchIcon";
import { pathToUri } from "../utils";

export default class DocumateNavbar extends React.Component {
  state = {
    isSearchOpen: false
  };

  onSearchChange() {
    // Search...
  }

  toggleSearchbar() {
    if (!this.state.isSearchOpen === true) {
      document.querySelector("#navbar-search-icon path").style.fill = "#20232a";
    } else {
      document.querySelector("#navbar-search-icon path").style.fill = "#ffffff";
    }

    this.setState({
      isSearchOpen: !this.state.isSearchOpen
    });
  }

  render() {
    let { nav: navItems } = this.props;

    return (
      <Navbar
        style={{
          backgroundColor: "#20232a",
          position: "fixed"
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
                let uri =
                  pathToUri(navItems[navitem]) ||
                  navItems[navitem].replace(/^\./, "");

                return (
                  <NavItem key={"nav-item-" + i}>
                    <NavLink
                      className={
                        uri === window.location.pathname ||
                        (window.location.pathname.includes(uri) && uri !== "/")
                          ? "active"
                          : ""
                      }
                      href={uri}
                      children={navitem}
                    />
                  </NavItem>
                );
              })}
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
                  style={
                    (window.innerWidth < 860 && {
                      display: this.state.isSearchOpen ? "inline" : "none",
                      position: "absolute",
                      right: -53,
                      top: 1,
                      width: "100%",
                      backgroundColor: "#ffffff",
                      color: "#20232a",
                      paddingLeft: 20,
                      height: 40
                    }) || {
                      display: "inline",
                      width: "unset"
                    }
                  }
                  className={
                    window.innerWidth < 860
                      ? this.state.isSearchOpen
                        ? "active"
                        : ""
                      : "active"
                  }
                  type="search"
                  id="navbar-search"
                  placeholder="Search docs"
                  onChange={this.onSearchChange.bind(this)}
                />
                <SearchIcon onClick={this.toggleSearchbar.bind(this)} />
              </NavItem>
              <NavItem>
                <NavLink id="nav-link-version" href="#">
                  v2.0.0
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="nav-link-git" href="#">
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
