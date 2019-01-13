import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

import "./Sidebar.css";

function pathToUri(path) {
  let match = path.match(/[\.]?[\/]?(.*)\/\w+\.\w+$/);
  return match && match[1] ? "/" + match[1] : false;
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
        {Object.keys(nav).map(title => {
          let pathSlashSubs = nav[title];

          return (
            <AccordionItem>
              <AccordionItemTitle>
                {(pathSlashSubs.constructor == Object && (
                  <>
                    <span className="acc-item-title" children={title} />
                    <div className="accordion__arrow" role="presentation" />
                  </>
                )) || (
                  <Link
                    to={pathToUri(pathSlashSubs) || "/"}
                    className="acc-item-title"
                    children={title}
                  />
                )}
              </AccordionItemTitle>
              {pathSlashSubs.constructor == Object && (
                <AccordionItemBody>
                  <ul>
                    {Object.keys(pathSlashSubs).map(subTitle => (
                      <li>
                        <Link
                          to={pathToUri(pathSlashSubs[subTitle]) || "/"}
                          children={subTitle}
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionItemBody>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Col>
  );
};
