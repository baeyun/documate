import React, { Component } from "react";
import { Container, Col } from "reactstrap";

import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import Fab from "./Fab";
import "./mobile-menu.css";

const SidenavSourceMap = JSON.parse(
  process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP
);

// Get SIDENAV
const { SIDENAV } = require(process.env.REACT_APP_DOCUMATE_CWD +
  "/documate/nav.js");

function highlightCode() {
  eval("Prism.highlightAll();");
}

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
      .then(t => {
        this.setState({ content: t });
        highlightCode();
      })
      .catch(e => console.error(e));
  }

  componentDidMount() {
    highlightCode();
  }

  render() {
    highlightCode();

    return (
      <>
        <Container id="main-content-wrapper" style={{ paddingTop: 53 }}>
          <Col
            id="main-content"
            style={{ paddingTop: 90 }}
            md="8"
            dangerouslySetInnerHTML={{ __html: this.state.content }}
          />
        </Container>
        <Pagination />
        <Sidebar nav={SIDENAV} />
        <Fab />
      </>
    );
  }
}
