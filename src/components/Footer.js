import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <Container>
          <Col md="9" style={{ paddingTop: 53 }}>
            <Row>
              <Col md="3">
                <a className="oss-logo" href="javascript:void(0)">
                  <img
                    src="https://facebook.github.io/create-react-app/img/oss_logo.png"
                    alt="Facebook Open Source"
                  />
                </a>
              </Col>
              <Col md="3">
                <span className="section-label">Guide</span>
                <ul>
                  <li>
                    <a href="javascript:void(0)">Tutorial</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Book</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Community</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Forum</a>
                  </li>
                </ul>
              </Col>
              <Col md="3">
                <span className="section-label">Docs</span>
                <ul>
                  <li>
                    <a href="javascript:void(0)">Link</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Link</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Link</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Link</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Link</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Footer;
