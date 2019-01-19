import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

import { pathToUri } from "../utils";

import "./Sidebar.css";

function navWalker(title, nav, accord = true) {
  return nav.constructor == Object ? (
    <>
      {(accord && (
        <AccordionItemTitle>
          <span className="acc-item-title" style={{
            marginLeft: 6
          }} children={title} />
          <div className="accordion__arrow" role="presentation" />
        </AccordionItemTitle>
      )) || <span className="acc-item-title" children={title} />}
      <AccordionItemBody>
        <ul>
          {Object.keys(nav).map(
            subNavTitle =>
              (nav[subNavTitle].constructor == Object &&
                navWalker(subNavTitle, nav[subNavTitle], false)) || (
                <li>
                  <Link
                    to={pathToUri(nav[subNavTitle])}
                    children={subNavTitle}
                  />
                </li>
              )
          )}
        </ul>
      </AccordionItemBody>
    </>
  ) : (
    <Link to={pathToUri(nav)} className="acc-item-title" children={title} />
  );
}

export default ({ nav }) => {
  return (
    <Col
      style={{
        height: "100vh",
        position: "fixed",
        right: 0,
        bottom: 0,
        float: "right",
        background: "#f7f7f7",
        paddingTop: 148,
        borderLeft: "1px solid rgb(236, 236, 236)"
      }}
      id="sidebar"
      md="4"
    >
      <Accordion>
        {Object.keys(nav).map((title, i) => {
          return (
            <AccordionItem
              key={`navitem-${i}`}
              children={navWalker(title, nav[title])}
            />
          );
        })}
      </Accordion>
    </Col>
  );
};
