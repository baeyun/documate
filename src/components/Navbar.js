import React from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import Search from "./Search";
import { pathToUri } from "../utils";

export default class DocumateNavbar extends React.Component {
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
          <NavbarBrand
            id="navbar-brand"
            href="/"
            style={{ margin: "0px 10px 0 0", border: "none" }}
          >
            {process.env.REACT_APP_DOCUMATE_LOGOSRC && (
              <img
                src={process.env.REACT_APP_DOCUMATE_LOGOSRC}
                style={{ marginRight: 7 }}
                width={32}
                height={32}
                alt="Logo"
              />
            )}
            <span
              id="navbar-brand-title"
              children={process.env.REACT_APP_DOCUMATE_SITENAME}
            />
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
              <NavItem id="search-container">
                <Search />
              </NavItem>
              {process.env.REACT_APP_DOCUMATE_PROJECTVERSION && (
                <NavItem>
                  <NavLink
                    id="nav-link-version"
                    href="javascript:void(0)"
                    children={
                      "v" + process.env.REACT_APP_DOCUMATE_PROJECTVERSION
                    }
                  />
                </NavItem>
              )}
              {process.env.REACT_APP_DOCUMATE_REPOURL && (
                <NavItem>
                  <NavLink
                    id="nav-link-git"
                    href={process.env.REACT_APP_DOCUMATE_REPOURL}
                    target="_blank"
                  >
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
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
