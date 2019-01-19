import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom'

export default () => (
  <div
    id="pagination"
    style={{
      backgroundColor: "rgb(40, 44, 52)",
      marginTop: 150,
      padding: "50px 0"
    }}
  >
    <Container>
      <Col md="8">
        <Row>
          <Col className="page-previous" md="6" sm="6" xs="6">
            <span
              style={{
                color: "#61dafb",
                fontSize: 14
              }}
            >
              Previous Article
            </span>
            <br />
            <Link className="pagination-link" to="/docs/introduction">
              Introduction
            </Link>
          </Col>
          <Col className="page-next" style={{ textAlign: "right" }} md="6" sm="6" xs="6">
            <span
              style={{
                color: "#61dafb",
                fontSize: 14
              }}
            >
              Next Article
            </span>
            <br />
            <Link className="pagination-link" to="/docs/getting-started">
              Getting Started
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  </div>
);
