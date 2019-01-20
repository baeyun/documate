import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <Container>
          <Col
            dangerouslySetInnerHTML={{
              __html: process.env.REACT_APP_DOCUMATE_FOOTERCONTENT
            }}
          />
        </Container>
      </footer>
    );
  }
}

export default Footer;
