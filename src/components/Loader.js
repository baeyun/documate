import React from "react";
import { Col } from "reactstrap";

export default () => (
  <Col
    id="main-content"
    style={{
      paddingTop: 90,
      display: "flex",
      justifyContent: "center"
    }}
    md="8"
  >
    <span children="Loading..." />
  </Col>
);
