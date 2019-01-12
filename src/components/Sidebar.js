import React, { Component } from "react";
import { Col } from "reactstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

import "./Sidebar.css";

export default class Main extends Component {
  render() {
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
          <AccordionItem>
            <AccordionItemTitle>
              <span href="#" className="acc-item-title">
                Introduction
              </span>
              <div className="accordion__arrow" role="presentation" />
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
              </ul>
            </AccordionItemBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemTitle>
              <span href="#" className="acc-item-title">
                What's New
              </span>
              <div className="accordion__arrow" role="presentation" />
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
              </ul>
            </AccordionItemBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemTitle>
              <span href="#" className="acc-item-title">
                Getting Started
              </span>
              <div className="accordion__arrow" role="presentation" />
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
              </ul>
            </AccordionItemBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemTitle>
              <span href="#" className="acc-item-title">
                Components
              </span>
              <div className="accordion__arrow" role="presentation" />
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
              </ul>
            </AccordionItemBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemTitle>
              <span href="#" className="acc-item-title">
                Contributing
              </span>
              <div className="accordion__arrow" role="presentation" />
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
                <li>
                  <a href="#">Accordion Item</a>
                </li>
              </ul>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </Col>
    );
  }
}
