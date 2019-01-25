import React, { Component } from "react";
import { Container, Col } from "reactstrap";

import Loader from "./Loader";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import Fab from "./Fab";
import { titleCase } from "../utils";
import "./mobile-menu.css";

const SidenavSourceMap = JSON.parse(
  process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP
);
const SIDENAV = JSON.parse(process.env.REACT_APP_DOCUMATE_SIDENAV);

function highlightCode() {
  eval("Prism.highlightAll();");
}

export default class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      content: ""
    };
  }

  componentWillMount() {
    const {
      location: { pathname }
    } = this.props;
    let contentPath =
      pathname === "/docs/" || pathname === "/docs"
        ? SidenavSourceMap[Object.keys(SidenavSourceMap)[0]]
        : SidenavSourceMap[pathname];

    document.body.scrollIntoView();

    fetch(contentPath)
      .then(d => d.text())
      .then(t => {
        this.setState({ loading: false, content: t });

        document.title = `${
          process.env.REACT_APP_DOCUMATE_SITENAME
        } - ${titleCase(pathname.match(/[\w\-]+$/)[0])}`;

        highlightCode();

        let codeBlocks = Array.from(document.querySelectorAll("pre"));

        codeBlocks.map(block => {
          let copy = document.createElement("span");

          copy.className = "copy-button";
          copy.title = "Click to copy this code snippet";
          copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>`;
          block.appendChild(copy);
          block.addEventListener("mouseover", () => (copy.style.opacity = "1"));
          block.addEventListener("mouseout", () => (copy.style.opacity = ".5"));
          copy.addEventListener("click", () => {
            let temp = copy.innerHTML;

            navigator.clipboard.writeText(block.textContent).then(() => {
              copy.innerHTML = `Copied snippet!`;
              copy.classList.add("copied");

              setTimeout(() => {
                copy.innerHTML = temp;
                copy.classList.remove("copied");
              }, 1500);
            });
          });
        });
      })
      .catch(e => console.error(e));
  }

  componentDidMount() {
    highlightCode();
  }

  render() {
    highlightCode();

    return (
      <>
        <Container id="main-content-wrapper" style={{ paddingTop: 53 }}>
          {(!this.state.loading && (
            <Col
              id="main-content"
              style={{ paddingTop: 90 }}
              md="8"
              dangerouslySetInnerHTML={{ __html: this.state.content }}
            />
          )) || <Loader />}
        </Container>
        <Pagination />
        <Sidebar nav={SIDENAV} />
        <Fab />
      </>
    );
  }
}
