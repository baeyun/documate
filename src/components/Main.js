import React, { Component } from "react";
import { Container, Col } from "reactstrap";
import { EntypoHeart } from "react-entypo";
import Highlight from "react-highlight";

import "../../node_modules/highlight.js/styles/atom-one-dark.css";

const mkdoc = require(
  process.env.REACT_APP_DOCUMATE_CWD + "/documate/docs/introduction.md"
);

export default class Main extends Component {
  render() {
    return (
      <Container style={{ paddingTop: 53 }}>
        <Col
          id="main-content"
          style={{ paddingTop: 90 }}
          md="8"
          dangerouslySetInnerHTML={{ __html: mkdoc }}
        />
      </Container>
    );
  }
}
