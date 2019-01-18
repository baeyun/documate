import React, { Component } from "react";
import { Container, Col } from "reactstrap";

const mkdoc = require(process.env.REACT_APP_DOCUMATE_CWD +
  "/documate/docs/introduction.md");

export default class Main extends Component {
  render() {
    return (
      <Container id="main-container" style={{ paddingTop: 53 }}>
        <Col
          id="main-content"
          style={{ paddingTop: 90 }}
          md="8"
          dangerouslySetInnerHTML={{ __html: mkdoc }}
        />
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
      </Container>
    );
  }
}
