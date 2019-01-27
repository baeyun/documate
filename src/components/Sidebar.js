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
  if (nav.constructor == Object) {
    return (
      <>
        {(accord && (
          <AccordionItemTitle>
            <span
              className="acc-item-title"
              style={{
                marginLeft: 6
              }}
              children={title}
            />
            <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
        )) || <span className="acc-item-title" children={title} />}
        <AccordionItemBody>
          <ul>
            {Object.keys(nav).map((subNavTitle, i) => {
              let path = pathToUri(nav[subNavTitle]);

              return (
                (nav[subNavTitle].constructor == Object &&
                  navWalker(subNavTitle, nav[subNavTitle], false)) || (
                  <li key={"subnav-item-" + i}>
                    <Link
                      to={path}
                      className={
                        path === window.location.pathname ? "active" : ""
                      }
                      children={subNavTitle}
                    />
                  </li>
                )
              );
            })}
          </ul>
        </AccordionItemBody>
      </>
    );
  } else {
    let path = pathToUri(nav);

    return (
      <Link
        to={path}
        className={
          path === window.location.pathname
            ? "acc-item-title active"
            : "acc-item-title"
        }
        children={title}
      />
    );
  }
}

export default ({ nav }) => {
  let pathname = window.location.pathname;

  return (
    <Col
      style={{
        height: "100vh",
        position: "fixed",
        right: 0,
        bottom: 0,
        float: "right",
        background: "#f7f7f7",
        padding: "148px 0 60px 30px",
        borderLeft: "1px solid rgb(236, 236, 236)",
        overflowY: "auto"
      }}
      id="sidebar"
      md="4"
    >
      <Accordion accordion={false}>
        {Object.keys(nav).map((title, i) => {
          let expanded = false;
          let navItem = nav[title];

          if (navItem.constructor === Object) {
            for (let k in navItem) {
              if (pathToUri(navItem[k]) === pathname) {
                expanded = true;
                break;
              }
            }
          }

          return (
            <AccordionItem
              key={`navitem-${i}`}
              children={navWalker(title, navItem)}
              expanded={expanded}
            />
          );
        })}
      </Accordion>
    </Col>
  );
};
