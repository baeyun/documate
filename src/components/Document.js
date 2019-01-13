import React, { Component } from "react";
import { Col } from "reactstrap";
import { EntypoHeart } from "react-entypo";
import Highlight from "react-highlight";

import "../../node_modules/highlight.js/styles/atom-one-dark.css";

export default ({ path }) => {
  let docContent = require(path)
  
  console.log(path)

  return (
      <Col
        id="main-content"
        style={{ paddingTop: 90 }}
        md="8"
        dangerouslySetInnerHTML={{ __html: docContent }}
      />
  );
};
