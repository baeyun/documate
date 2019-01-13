import React, { Component, Suspense } from "react";
import { Container, Col } from "reactstrap";
import { EntypoHeart } from "react-entypo";
import Highlight from "react-highlight";

import "../../node_modules/highlight.js/styles/atom-one-dark.css";

const pathToSourceMap = JSON.parse(
  process.env.REACT_APP_DOCUMATE_PATHTOSOURCEMAP
);

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentWillMount() {
    console.log("mounting...")
    const {
      location: { pathname }
    } = this.props;
    let contentPath =
      (pathname !== "/" && "/partials/" + pathToSourceMap[pathname]) ||
      "/partials/" + pathToSourceMap[Object.keys(pathToSourceMap)[0]];

    console.log(contentPath);

    fetch(contentPath)
      .then(d => d.text())
      .then(t => {
        this.setState({ content: t })
        console.log(t)
      }).catch(e => console.error(e));
  }

  render() {
    return (
      <Container style={{ paddingTop: 53 }}>
        <Col
          id="main-content"
          style={{ paddingTop: 90 }}
          md="8"
          dangerouslySetInnerHTML={{ __html: this.state.content }}
        />
      </Container>
    );
  }
}
