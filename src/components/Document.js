import React, { Component } from "react";
import { Container, Col } from "reactstrap";

import Sidebar from "./Sidebar";

const SidenavSourceMap = JSON.parse(
  process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP
);

// Get SIDENAV
const { SIDENAV } = require(process.env.REACT_APP_DOCUMATE_CWD +
  "/documate/nav.json");

export default class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentWillMount() {
    const {
      location: { pathname }
    } = this.props;
    let contentPath =
      pathname === "/docs/" || pathname === "/docs"
        ? SidenavSourceMap[Object.keys(SidenavSourceMap)[0]]
        : SidenavSourceMap[pathname];

    document.body.scrollIntoView();

    fetch(contentPath)
      .then(d => d.text())
      .then(t => this.setState({ content: t }))
      .catch(e => console.error(e));
  }

  render() {
    return (
      <>
        <Container style={{ paddingTop: 53 }}>
          <Col
            id="main-content"
            style={{ paddingTop: 90 }}
            md="8"
            dangerouslySetInnerHTML={{ __html: this.state.content }}
          />
        </Container>
        <Sidebar nav={SIDENAV} />
        <button
          onClick={() => {
            let sidebar = document.getElementById("sidebar");

            if (!Array.from(sidebar.classList).includes("active-mobile"))
              sidebar.classList.add("active-mobile");
            else sidebar.classList.remove("active-mobile");
          }}
          id="sidebar-fab"
        >
          S
        </button>
      </>
    );
  }
}
