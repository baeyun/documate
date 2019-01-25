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
    isSearchOpen: false,
    isSearchResultsOpen: false
  };

  componentDidMount() {
    document.getElementById("search-container").style.position = "unset";
    document.body.addEventListener("click", e => {
      if (!e.target.id || e.target.id != "search-results") {
        document.getElementById("search-results").style.display = "none";
      }
    });
  }

  onSearchChange() {
    let searchListContainer = document.getElementById("search-results");
    let inputVal = document.getElementById("navbar-search").value;

    // if (inputVal.length < 3)
    //   return
    document.getElementById("search-results").style.display = "block";

    searchListContainer.innerHTML = `
      <span id='search-list-header'>
        Search Results
      </span>`;

    // if (!inputVal)
    //   searchListContainer.style.display = 'none'
    // else
    //   searchListContainer.style.display = 'inline-block'

    let matches = Object.keys(window.searchables)
      .map(pageUrl => {
        let searchableList = window.searchables[pageUrl];

        return searchableList.filter(searchableObj => {
          if (
            searchableObj.title.toLowerCase().indexOf(inputVal.toLowerCase()) >
            -1
          ) {
            searchableObj.pageUrl = pageUrl;

            return searchableObj;
          }
        });
      })
      .filter(arr => arr.length);

    let listHTML = "";

    matches.map(arr => {
      let pageTitle =
        arr[0] && window.searchables[arr[0].pageUrl]
          ? window.searchables[arr[0].pageUrl][0].title
          : null;
      listHTML +=
        pageTitle &&
        `<div class="search-result"><span class="page-title">${pageTitle}</span></div>`;

      // matches
      for (let i = 0; i < arr.length; i++) {
        let m = arr[i];
        let title = m.title;
        let re = new RegExp(inputVal, "gi");
        let toBold = title.match(re)[0];
        let boldenTitle = title.replace(toBold, `<b>${toBold}</b>`);

        listHTML += `<div class="search-result">
          <a href="${window.location.origin +
            m.pageUrl}"><span>${boldenTitle}</span></a></div>`;
      }
    });

    if (listHTML) {
      searchListContainer.innerHTML += listHTML;
    } else {
      searchListContainer.innerHTML += `
        <div id="not-found">
          <svg id="search-not-found-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" version="1.1">
            <g id="surface1">
              <path style=" " d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.398438 9.851563 17.597656 11.265625 19.324219 L 3.292969 27.292969 L 4.707031 28.707031 L 12.675781 20.734375 C 14.402344 22.148438 16.601563 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 16 10 C 15.449219 10 15 10.449219 15 11 C 15 11.550781 15.449219 12 16 12 C 16.550781 12 17 11.550781 17 11 C 17 10.449219 16.550781 10 16 10 Z M 22 10 C 21.449219 10 21 10.449219 21 11 C 21 11.550781 21.449219 12 22 12 C 22.550781 12 23 11.550781 23 11 C 23 10.449219 22.550781 10 22 10 Z M 19 14 C 16.792969 14 15.34375 15.246094 15.34375 15.246094 C 15.0625 15.472656 14.929688 15.839844 14.996094 16.199219 C 15.058594 16.554688 15.316406 16.851563 15.660156 16.964844 C 16.003906 17.082031 16.386719 17 16.65625 16.753906 C 16.65625 16.753906 17.515625 16 19 16 C 20.484375 16 21.34375 16.753906 21.34375 16.753906 C 21.613281 17 21.996094 17.082031 22.339844 16.964844 C 22.683594 16.851563 22.941406 16.554688 23.003906 16.199219 C 23.070313 15.839844 22.9375 15.472656 22.65625 15.246094 C 22.65625 15.246094 21.207031 14 19 14 Z "></path>
            </g>
          </svg> Nothing found.
        </div>`;
    }
  }

  toggleSearchbar() {
    if (!this.state.isSearchOpen === true) {
      document.getElementById("search-container").style.position = "fixed";
      // document.getElementById("search-container").style.display = "block";
      document.querySelector("#navbar-search-icon path").style.fill = "#20232a";
      document.querySelector(".collapse.show.navbar-collapse").style.overflow =
        "hidden";
      document.getElementById("navbar-search").focus();
      document.body.style.overflow = "hidden";
      this.setState({
        isSearchResultsOpen: true
      });
    } else {
      document.getElementById("search-container").style.position = "unset";
      document.getElementById("search-results").style.display = "none";
      document.querySelector("#navbar-search-icon path").style.fill = "#ffffff";
      document.querySelector(".collapse.show.navbar-collapse").style.overflow =
        "auto";
      document.body.style.overflow = "auto";
      this.setState({
        isSearchResultsOpen: false
      });
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
                <Input
                  maxLength={40}
                  style={
                    (window.innerWidth < 860 && {
                      display: this.state.isSearchOpen ? "block" : "none",
                      position: "fixed",
                      right: 0,
                      top: 0,
                      left: 0,
                      width: "100%",
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(32, 35, 42)",
                      height: 40,
                      zIndex: 1,
                      borderRadius: 0,
                      borderBottom: "1px solid #d0d2d7"
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
                  autoComplete="off"
                  type="text"
                  id="navbar-search"
                  placeholder="Search docs"
                  onChange={this.onSearchChange.bind(this)}
                />
                <SearchIcon onClick={this.toggleSearchbar.bind(this)} />
                <div
                  style={
                    (this.state.isSearchResultsOpen == true && {
                      position: "absolute",
                      top: 40,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "#31363f",
                      borderRadius: 0,
                      overflow: "auto",
                      boxShadow: "-1px 1px 20px 0px rgba(0,0,0,.3)",
                      display: "block"
                    }) || {
                      position: "absolute",
                      top: 43,
                      left: -4,
                      backgroundColor: "#31363f",
                      borderRadius: "0px 0px 5px 5px",
                      maxHeight: 350,
                      width: 500,
                      overflow: "auto",
                      boxShadow: "-1px 1px 20px 0px rgba(0,0,0,.3)"
                    }
                  }
                  id="search-results"
                />
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
