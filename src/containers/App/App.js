import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Document from "../../components/Document";
import Footer from "../../components/Footer";

import "./App.css";
import "./editor-theme.css";

// Get TOPNAV
const { TOPNAV } = require(process.env.REACT_APP_DOCUMATE_CWD +
  "/documate/nav.js");

let possibleTopnavPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_TOPNAVSOURCEMAP)
);

let possibleDocPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP)
);

let currentPath = window.location.pathname;
let previousPath = possibleDocPaths.indexOf(currentPath) - 1;
let nextPath = possibleDocPaths.indexOf(currentPath) + 1;

console.log(previousPath, nextPath);

let codeLangs = JSON.parse(process.env.REACT_APP_DOCUMATE_CODELANGS);

for (let i = 0; i < codeLangs.length; i++) {
  let lang = codeLangs[i];
  let script = document.createElement("script");

  script.type = "text/javascript";
  script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-${lang}.min.js`;
  document.head.appendChild(script);
}

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Navbar nav={TOPNAV} />

          {/* ROUTES */}
          <Route path="/" exact component={Page} />
          {possibleTopnavPaths.map((path, i) => (
            <Route key={"nav-paths-" + i} path={path} component={Page} />
          ))}
          <Route path="/docs" exact component={Document} />
          {possibleDocPaths.map((path, i) => (
            <Route key={"doc-paths-" + i} path={path} component={Document} />
          ))}

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
